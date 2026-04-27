/**
 * Database Types for Neon Postgres
 * Generated from schema definition
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          price: number;
          file_path: string | null;
          stripe_price_id: string | null;
          stripe_product_id: string | null;
          is_subscription: boolean;
          subscription_interval: 'month' | 'year' | null;
          active: boolean;
          download_limit: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          name: string;
          description?: string | null;
          price: number;
          file_path?: string | null;
          stripe_price_id?: string | null;
          stripe_product_id?: string | null;
          is_subscription?: boolean;
          subscription_interval?: 'month' | 'year' | null;
          active?: boolean;
          download_limit?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          price?: number;
          file_path?: string | null;
          stripe_price_id?: string | null;
          stripe_product_id?: string | null;
          is_subscription?: boolean;
          subscription_interval?: 'month' | 'year' | null;
          active?: boolean;
          download_limit?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      product_metadata: {
        Row: {
          product_id: string;
          key: string;
          value: string;
        };
        Insert: {
          product_id: string;
          key: string;
          value: string;
        };
        Update: {
          product_id?: string;
          key?: string;
          value?: string;
        };
      };
      customers: {
        Row: {
          id: string;
          email: string;
          stripe_customer_id: string | null;
          first_name: string | null;
          last_name: string | null;
          marketing_consent: boolean;
          sac_code_used: string | null;
          total_orders: number;
          total_spent: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          stripe_customer_id?: string | null;
          first_name?: string | null;
          last_name?: string | null;
          marketing_consent?: boolean;
          sac_code_used?: string | null;
          total_orders?: number;
          total_spent?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          stripe_customer_id?: string | null;
          first_name?: string | null;
          last_name?: string | null;
          marketing_consent?: boolean;
          sac_code_used?: string | null;
          total_orders?: number;
          total_spent?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      orders: {
        Row: {
          id: string;
          customer_id: string | null;
          stripe_checkout_session_id: string | null;
          stripe_payment_intent_id: string | null;
          product_id: string;
          quantity: number;
          amount_total: number;
          currency: string;
          status: 'pending' | 'paid' | 'fulfilled' | 'failed' | 'refunded' | 'disputed';
          download_url: string | null;
          download_token: string | null;
          download_expires_at: string | null;
          download_count: number;
          download_limit: number;
          subscription_id: string | null;
          current_period_start: string | null;
          current_period_end: string | null;
          ip_address: string | null;
          user_agent: string | null;
          referrer: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          customer_id?: string | null;
          stripe_checkout_session_id?: string | null;
          stripe_payment_intent_id?: string | null;
          product_id: string;
          quantity?: number;
          amount_total: number;
          currency?: string;
          status?: 'pending' | 'paid' | 'fulfilled' | 'failed' | 'refunded' | 'disputed';
          download_url?: string | null;
          download_token?: string | null;
          download_expires_at?: string | null;
          download_count?: number;
          download_limit?: number;
          subscription_id?: string | null;
          current_period_start?: string | null;
          current_period_end?: string | null;
          ip_address?: string | null;
          user_agent?: string | null;
          referrer?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          customer_id?: string | null;
          stripe_checkout_session_id?: string | null;
          stripe_payment_intent_id?: string | null;
          product_id?: string;
          quantity?: number;
          amount_total?: number;
          currency?: string;
          status?: 'pending' | 'paid' | 'fulfilled' | 'failed' | 'refunded' | 'disputed';
          download_url?: string | null;
          download_token?: string | null;
          download_expires_at?: string | null;
          download_count?: number;
          download_limit?: number;
          subscription_id?: string | null;
          current_period_start?: string | null;
          current_period_end?: string | null;
          ip_address?: string | null;
          user_agent?: string | null;
          referrer?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      download_logs: {
        Row: {
          id: string;
          order_id: string;
          ip_address: string | null;
          user_agent: string | null;
          downloaded_at: string;
          success: boolean;
        };
        Insert: {
          id?: string;
          order_id: string;
          ip_address?: string | null;
          user_agent?: string | null;
          downloaded_at?: string;
          success?: boolean;
        };
        Update: {
          id?: string;
          order_id?: string;
          ip_address?: string | null;
          user_agent?: string | null;
          downloaded_at?: string;
          success?: boolean;
        };
      };
      email_logs: {
        Row: {
          id: string;
          order_id: string;
          email_type: 'order_confirmation' | 'download_reminder' | 'expiry_warning' | 'subscription_renewal' | 'failed_payment';
          recipient_email: string;
          subject: string;
          status: 'queued' | 'sent' | 'delivered' | 'bounced' | 'failed';
          provider_message_id: string | null;
          opened_at: string | null;
          clicked_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          order_id: string;
          email_type: 'order_confirmation' | 'download_reminder' | 'expiry_warning' | 'subscription_renewal' | 'failed_payment';
          recipient_email: string;
          subject: string;
          status?: 'queued' | 'sent' | 'delivered' | 'bounced' | 'failed';
          provider_message_id?: string | null;
          opened_at?: string | null;
          clicked_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          order_id?: string;
          email_type?: 'order_confirmation' | 'download_reminder' | 'expiry_warning' | 'subscription_renewal' | 'failed_payment';
          recipient_email?: string;
          subject?: string;
          status?: 'queued' | 'sent' | 'delivered' | 'bounced' | 'failed';
          provider_message_id?: string | null;
          opened_at?: string | null;
          clicked_at?: string | null;
          created_at?: string;
        };
      };
      subscriptions: {
        Row: {
          id: string;
          customer_id: string;
          order_id: string;
          product_id: string;
          status: 'active' | 'canceled' | 'incomplete' | 'past_due' | 'unpaid';
          current_period_start: string;
          current_period_end: string;
          cancel_at_period_end: boolean;
          canceled_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          customer_id: string;
          order_id: string;
          product_id: string;
          status?: 'active' | 'canceled' | 'incomplete' | 'past_due' | 'unpaid';
          current_period_start: string;
          current_period_end: string;
          cancel_at_period_end?: boolean;
          canceled_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          customer_id?: string;
          order_id?: string;
          product_id?: string;
          status?: 'active' | 'canceled' | 'incomplete' | 'past_due' | 'unpaid';
          current_period_start?: string;
          current_period_end?: string;
          cancel_at_period_end?: boolean;
          canceled_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      daily_sales: {
        Row: {
          date: string | null;
          total_orders: number | null;
          successful_orders: number | null;
          revenue_cents: number | null;
          currency: string | null;
        };
      };
      product_sales: {
        Row: {
          id: string | null;
          name: string | null;
          price: number | null;
          total_sales: number | null;
          total_revenue: number | null;
          avg_downloads: number | null;
        };
      };
    };
    Functions: {
      increment_customer_stats: {
        Args: {
          customer_id: string;
          order_amount: number;
        };
        Returns: undefined;
      };
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

// Helper types
export type Tables<T extends keyof Database['public']['Tables']> = 
  Database['public']['Tables'][T]['Row'];

export type InsertTables<T extends keyof Database['public']['Tables']> = 
  Database['public']['Tables'][T]['Insert'];

export type UpdateTables<T extends keyof Database['public']['Tables']> = 
  Database['public']['Tables'][T]['Update'];

export type Views<T extends keyof Database['public']['Views']> = 
  Database['public']['Views'][T]['Row'];
