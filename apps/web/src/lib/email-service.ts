/**
 * Email Service - Resend Integration
 * Automated email delivery for digital products
 */

import { Resend } from 'resend';
import { getDb } from './db-client';

// Environment variables
const resendApiKey = process.env.RESEND_API_KEY;
const fromEmail = process.env.FROM_EMAIL || 'orders@fortnitenexus.space';
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
      <p><strong>💙 Support the Community</strong></p>
      <p>Nutze Code <strong>NEXUS</strong> im Fortnite Item Shop!<br>
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
💙 Support the Community
Nutze Code NEXUS im Fortnite Item Shop!

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

  welcomeEmail: (data: WelcomeEmailData) => ({
    subject: `Willkommen bei Fortnite Nexus! 🎮`,
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Willkommen bei Fortnite Nexus</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #ff6b00 0%, #8b5cf6 100%); color: white; padding: 40px 30px; text-align: center; border-radius: 12px 12px 0 0; }
    .content { background: #f9fafb; padding: 30px; border-radius: 0 0 12px 12px; }
    .feature { background: white; padding: 20px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #ff6b00; }
    .button { display: inline-block; background: linear-gradient(135deg, #ff6b00 0%, #ff8c00 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
    .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
  </style>
</head>
<body>
  <div class="header">
    <h1 style="font-size: 32px; margin: 0;">🎮 Willkommen bei Fortnite Nexus!</h1>
    <p style="font-size: 18px; margin-top: 10px;">Deine Nr. 1 Pro-Tool-Suite für Fortnite</p>
  </div>
  
  <div class="content">
    <p>Hey ${data.firstName || 'Gamer'},</p>
    
    <p>Willkommen in der Community! Du bist jetzt Teil von Fortnite Nexus - der besten Tool-Suite für deutschsprachige Fortnite-Spieler.</p>
    
    <div class="feature">
      <h3 style="margin-top: 0;">🚀 Was dich erwartet:</h3>
      <ul>
        <li><strong>8 Pro Tools:</strong> Sensitivity Converter, Loadout Optimizer, Stats Dashboard & mehr</li>
        <li><strong>Echte Daten:</strong> Fortnite-API Integration für präzise Stats</li>
        <li><strong>AI Coaching:</strong> Personalisierte Tipps via Claude AI</li>
        <li><strong>Meta Alerts:</strong> Immer informiert über Patch-Änderungen</li>
      </ul>
    </div>
    
    <div style="text-align: center;">
      <a href="${data.dashboardUrl}" class="button">🎯 ZUM DASHBOARD</a>
    </div>
    
    <div class="feature" style="border-left-color: #10b981;">
      <h3 style="margin-top: 0;">💡 Dein erster Schritt:</h3>
      <p>Checke den <strong>Sensitivity Converter</strong> und finde deine perfekte Sensitivity!</p>
    </div>
    
    <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
    
    <div style="text-align: center;">
      <p><strong>💙 Support the Community</strong></p>
      <p>Nutze Code <strong>NEXUS</strong> im Fortnite Item Shop!<br>
      Kostet dich nichts, hilft uns neue Tools zu erstellen.</p>
    </div>
  </div>
  
  <div class="footer">
    <p>© 2026 Fortnite Nexus. Alle Rechte vorbehalten.</p>
    <p>Du bekommst diese E-Mail weil du dich bei fortnitenexus.space registriert hast.</p>
    <p><a href="${data.unsubscribeUrl}">Abmelden</a></p>
  </div>
</body>
</html>
    `,
    text: `
Hey ${data.firstName || 'Gamer'},

Willkommen bei Fortnite Nexus! 🎮

Du bist jetzt Teil der besten Tool-Suite für deutschsprachige Fortnite-Spieler.

Was dich erwartet:
- 8 Pro Tools: Sensitivity Converter, Loadout Optimizer, Stats Dashboard & mehr
- Echte Daten: Fortnite-API Integration für präzise Stats
- AI Coaching: Personalisierte Tipps via Claude AI
- Meta Alerts: Immer informiert über Patch-Änderungen

🎯 ZUM DASHBOARD: ${data.dashboardUrl}

💙 Support the Community
Nutze Code NEXUS im Fortnite Item Shop!

© 2026 Fortnite Nexus
Abmelden: ${data.unsubscribeUrl}
    `,
  }),

  metaAlert: (data: MetaAlertData) => ({
    subject: `🚨 META ALERT: ${data.alertTitle}`,
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Meta Alert</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #ef4444; color: white; padding: 30px; text-align: center; border-radius: 12px 12px 0 0; }
    .content { background: #f9fafb; padding: 30px; border-radius: 0 0 12px 12px; }
    .alert { background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b; }
    .change { background: white; padding: 15px; border-radius: 6px; margin: 10px 0; border-left: 3px solid #3b82f6; }
    .button { display: inline-block; background: #ff6b00; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 15px 0; }
    .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
  </style>
</head>
<body>
  <div class="header">
    <h1 style="font-size: 28px; margin: 0;">🚨 META ALERT</h1>
    <p style="font-size: 16px; margin-top: 10px;">${data.alertTitle}</p>
  </div>
  
  <div class="content">
    <p>Hey ${data.firstName || 'Gamer'},</p>
    
    <div class="alert">
      <h3 style="margin-top: 0;">⚡ Wichtige Meta-Änderung:</h3>
      <p>${data.summary}</p>
    </div>
    
    <h3>📋 betroffene Waffen:</h3>
    ${data.affectedWeapons.map(w => `
      <div class="change">
        <strong>${w.name}</strong>
        <p style="margin: 5px 0 0 0;">${w.change}</p>
      </div>
    `).join('')}
    
    <div style="text-align: center;">
      <a href="${data.toolsUrl}" class="button">🎯 LOADOUT OPTIMIZER AKTUALISIEREN</a>
    </div>
    
    <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
    
    <div style="text-align: center;">
      <p><strong>💡 Pro-Tipp:</strong></p>
      <p>${data.proTip}</p>
    </div>
  </div>
  
  <div class="footer">
    <p>© 2026 Fortnite Nexus. Alle Rechte vorbehalten.</p>
    <p>Du bekommst diese E-Mail weil du Meta-Alerts aktiviert hast.</p>
    <p><a href="${data.unsubscribeUrl}">Meta-Alerts deaktivieren</a></p>
  </div>
</body>
</html>
    `,
    text: `
🚨 META ALERT: ${data.alertTitle}

Hey ${data.firstName || 'Gamer'},

⚡ Wichtige Meta-Änderung:
${data.summary}

📋 Betroffene Waffen:
${data.affectedWeapons.map(w => `- ${w.name}: ${w.change}`).join('\n')}

🎯 LOADOUT OPTIMIZER: ${data.toolsUrl}

💡 Pro-Tipp:
${data.proTip}

© 2026 Fortnite Nexus
Meta-Alerts deaktivieren: ${data.unsubscribeUrl}
    `,
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

interface WelcomeEmailData {
  firstName?: string;
  dashboardUrl: string;
  unsubscribeUrl: string;
}

interface MetaAlertData {
  firstName?: string;
  alertTitle: string;
  summary: string;
  affectedWeapons: Array<{ name: string; change: string }>;
  toolsUrl: string;
  proTip: string;
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
      supportUrl: 'https://fortnitenexus.space/support',
      dashboardUrl: `https://fortnitenexus.space/dashboard/orders/${params.orderId}`,
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

/**
 * Send welcome email to new users
 */
export async function sendWelcomeEmail(params: {
  to: string;
  userId: string;
}): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    if (!resend) {
      throw new Error('Resend not configured');
    }

    const data: WelcomeEmailData = {
      firstName: params.to.split('@')[0],
      dashboardUrl: 'https://fortnitenexus.space/dashboard',
      unsubscribeUrl: 'https://fortnitenexus.space/unsubscribe',
    };

    const template = templates.welcomeEmail(data);

    const { data: emailData, error } = await resend.emails.send({
      from: `${fromName} <${fromEmail}>`,
      to: params.to,
      subject: template.subject,
      html: template.html,
      text: template.text,
      tags: [
        { name: 'user_id', value: params.userId },
        { name: 'email_type', value: 'welcome' },
      ],
    });

    if (error) throw error;

    return { success: true, messageId: emailData?.id };
  } catch (err) {
    console.error('Error sending welcome email:', err);
    return { success: false, error: err instanceof Error ? err.message : 'Unknown error' };
  }
}

/**
 * Send meta alert email to subscribers
 */
export async function sendMetaAlert(params: {
  to: string;
  userId: string;
  alertTitle: string;
  summary: string;
  affectedWeapons: Array<{ name: string; change: string }>;
  proTip: string;
}): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    if (!resend) {
      throw new Error('Resend not configured');
    }

    const data: MetaAlertData = {
      firstName: params.to.split('@')[0],
      alertTitle: params.alertTitle,
      summary: params.summary,
      affectedWeapons: params.affectedWeapons,
      toolsUrl: 'https://fortnitenexus.space/tools/loadout-optimizer',
      proTip: params.proTip,
      unsubscribeUrl: 'https://fortnitenexus.space/unsubscribe',
    };

    const template = templates.metaAlert(data);

    const { data: emailData, error } = await resend.emails.send({
      from: `${fromName} <${fromEmail}>`,
      to: params.to,
      subject: template.subject,
      html: template.html,
      text: template.text,
      tags: [
        { name: 'user_id', value: params.userId },
        { name: 'email_type', value: 'meta_alert' },
      ],
    });

    if (error) throw error;

    return { success: true, messageId: emailData?.id };
  } catch (err) {
    console.error('Error sending meta alert:', err);
    return { success: false, error: err instanceof Error ? err.message : 'Unknown error' };
  }
}

export default {
  sendOrderConfirmation,
  sendSubscriptionContent,
  sendWelcomeEmail,
  sendMetaAlert,
  isEmailConfigured,
};
