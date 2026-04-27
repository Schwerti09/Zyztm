/**
 * Email Service - Resend Integration
 * Automated email delivery for digital products
 */

import { Resend } from 'resend';
import { getDb } from './db-client';

// Environment variables
const resendApiKey = process.env.RESEND_API_KEY;
const fromEmail = process.env.FROM_EMAIL || 'orders@fortnitenexus.com';
const fromName = process.env.FROM_NAME || 'Fortnite Nexus';

/**
 * Resend instance (server-side only)
 */
const resend = resendApiKey ? new Resend(resendApiKey) : null;

/**
 * Check if email service is configured
 */
export function isEmailConfigured(): boolean {
  return Boolean(resend && fromEmail);
}

/**
 * Email Templates
 */
const templates = {
  orderConfirmation: (data: OrderEmailData) => ({
    subject: `Dein ${data.productName} ist bereit! ⚡`,
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dein Download ist bereit</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #6366f1; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
    .button { display: inline-block; background: #6366f1; color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 20px 0; }
    .info-box { background: white; padding: 20px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #6366f1; }
    .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
    .support { background: #fef3c7; padding: 15px; border-radius: 6px; margin: 20px 0; }
  </style>
</head>
<body>
  <div class="header">
    <h1>🎮 Vielen Dank für deinen Kauf!</h1>
    <p>Dein ${data.productName} ist bereit zum Download</p>
  </div>
  
  <div class="content">
    <p>Hey ${data.firstName || 'Gamer'},</p>
    
    <p>Danke für deinen Kauf! Dein Download ist jetzt verfügbar.</p>
    
    <div style="text-align: center;">
      <a href="${data.downloadUrl}" class="button">⬇️ JETZT DOWNLOADEN</a>
    </div>
    
    <div class="info-box">
      <h3>📦 Was du bekommst:</h3>
      <ul>
        ${data.deliverables.map(item => `<li>${item}</li>`).join('')}
      </ul>
    </div>
    
    <div class="support">
      <strong>⏰ Wichtig:</strong> Der Download-Link ist <strong>72 Stunden</strong> gültig und kann bis zu <strong>${data.downloadLimit}x</strong> verwendet werden.
    </div>
    
    <p>Link funktioniert nicht? <a href="${data.supportUrl}">Kontaktiere uns hier</a>.</p>
    
    <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
    
    <div style="text-align: center;">
      <p><strong>💙 Support the Creator</strong></p>
      <p>Nutze Code <strong>ZYZTM</strong> im Fortnite Item Shop!<br>
      Kostet dich nichts, hilft uns neue Guides zu erstellen.</p>
    </div>
  </div>
  
  <div class="footer">
    <p>© 2026 Fortnite Nexus. Alle Rechte vorbehalten.</p>
    <p>Bestellung #${data.orderId}</p>
    <p><a href="${data.dashboardUrl}">Zu deinem Kundenkonto</a></p>
  </div>
</body>
</html>
    `,
    text: `
Hey ${data.firstName || 'Gamer'},

Danke für deinen Kauf! Dein ${data.productName} ist bereit.

⬇️ DOWNLOAD: ${data.downloadUrl}
(Dieser Link ist 72 Stunden gültig und kann ${data.downloadLimit}x verwendet werden)

Was du bekommst:
${data.deliverables.map(item => `- ${item}`).join('\n')}

Probleme? Kontaktiere uns: ${data.supportUrl}

---
💙 Support the Creator
Nutze Code ZYZTM im Fortnite Item Shop!

© 2026 Fortnite Nexus
Bestellung #${data.orderId}
    `,
  }),

  downloadReminder: (data: OrderEmailData) => ({
    subject: `⏰ Dein Download läuft in 24h ab`,
    html: `...`,
    text: `...`,
  }),

  subscriptionRenewal: (data: SubscriptionEmailData) => ({
    subject: `Dein Weekly Meta Report ist da! 📊`,
    html: `...`,
    text: `...`,
  }),
};

interface OrderEmailData {
  firstName?: string;
  productName: string;
  downloadUrl: string;
  deliverables: string[];
  downloadLimit: number;
  orderId: string;
  supportUrl: string;
  dashboardUrl: string;
}

interface SubscriptionEmailData {
  firstName?: string;
  productName: string;
  content: string;
  unsubscribeUrl: string;
}

/**
 * Send order confirmation email with download link
 */
export async function sendOrderConfirmation(params: {
  to: string;
  orderId: string;
  productId: string;
  productName: string;
  downloadUrl: string;
  deliverables: string[];
  downloadLimit?: number;
}): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    if (!resend) {
      throw new Error('Resend not configured');
    }

    const data: OrderEmailData = {
      firstName: params.to.split('@')[0], // Simple fallback
      productName: params.productName,
      downloadUrl: params.downloadUrl,
      deliverables: params.deliverables,
      downloadLimit: params.downloadLimit || 3,
      orderId: params.orderId,
      supportUrl: 'https://fortnitenexus.com/support',
      dashboardUrl: `https://fortnitenexus.com/dashboard/orders/${params.orderId}`,
    };

    const template = templates.orderConfirmation(data);

    const { data: emailData, error } = await resend.emails.send({
      from: `${fromName} <${fromEmail}>`,
      to: params.to,
      subject: template.subject,
      html: template.html,
      text: template.text,
      tags: [
        { name: 'order_id', value: params.orderId },
        { name: 'product_id', value: params.productId },
        { name: 'email_type', value: 'order_confirmation' },
      ],
    });

    if (error) throw error;

    // Log email to database
    await logEmail({
      orderId: params.orderId,
      emailType: 'order_confirmation',
      recipientEmail: params.to,
      subject: template.subject,
      providerMessageId: emailData?.id,
      status: 'sent',
    });

    return { success: true, messageId: emailData?.id };
  } catch (err) {
    console.error('Error sending order confirmation:', err);
    
    // Log failed email
    await logEmail({
      orderId: params.orderId,
      emailType: 'order_confirmation',
      recipientEmail: params.to,
      subject: 'Order Confirmation',
      status: 'failed',
    });

    return { success: false, error: err instanceof Error ? err.message : 'Unknown error' };
  }
}

/**
 * Log email to database
 */
async function logEmail(params: {
  orderId: string;
  emailType: string;
  recipientEmail: string;
  subject: string;
  providerMessageId?: string;
  status: 'queued' | 'sent' | 'delivered' | 'bounced' | 'failed';
}): Promise<void> {
  try {
    const sql = getDb();
    await sql`
      INSERT INTO email_logs (order_id, email_type, recipient_email, subject, provider_message_id, status)
      VALUES (${params.orderId}, ${params.emailType}, ${params.recipientEmail}, ${params.subject}, ${params.providerMessageId ?? null}, ${params.status})
    `;
  } catch (err) {
    console.error('Error logging email:', err);
    // Non-critical, don't throw
  }
}

/**
 * Send subscription content (for weekly reports, etc.)
 */
export async function sendSubscriptionContent(params: {
  to: string;
  productName: string;
  content: string; // HTML content
  subscriptionId: string;
}): Promise<{ success: boolean; error?: string }> {
  try {
    if (!resend) {
      throw new Error('Resend not configured');
    }

    const { data, error } = await resend.emails.send({
      from: `${fromName} <${fromEmail}>`,
      to: params.to,
      subject: `Dein ${params.productName} ist da!`,
      html: params.content,
      tags: [
        { name: 'subscription_id', value: params.subscriptionId },
        { name: 'email_type', value: 'subscription_content' },
      ],
    });

    if (error) throw error;

    return { success: true };
  } catch (err) {
    console.error('Error sending subscription content:', err);
    return { success: false, error: err instanceof Error ? err.message : 'Unknown error' };
  }
}

export default {
  sendOrderConfirmation,
  sendSubscriptionContent,
  isEmailConfigured,
};
