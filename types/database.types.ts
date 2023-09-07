/* eslint-disable max-lines */
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
      bank: {
        Row: {
          amount: number;
          code: string;
          company_id: string;
          createdat: string;
          details: string;
          id: string;
          type: Database["public"]["Enums"]["transaction_type"];
          updatedat: string | null;
          updatedby: string | null;
        };
        Insert: {
          amount: number;
          code: string;
          company_id: string;
          createdat?: string;
          details: string;
          id?: string;
          type?: Database["public"]["Enums"]["transaction_type"];
          updatedat?: string | null;
          updatedby?: string | null;
        };
        Update: {
          amount?: number;
          code?: string;
          company_id?: string;
          createdat?: string;
          details?: string;
          id?: string;
          type?: Database["public"]["Enums"]["transaction_type"];
          updatedat?: string | null;
          updatedby?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "bank_company_id_fkey";
            columns: ["company_id"];
            referencedRelation: "company";
            referencedColumns: ["id"];
          },
        ];
      };
      capital: {
        Row: {
          amount: number;
          code: string;
          company_id: string;
          createdat: string;
          details: string;
          id: string;
          type: Database["public"]["Enums"]["transaction_type"];
          updatedat: string | null;
          updatedby: string | null;
        };
        Insert: {
          amount: number;
          code: string;
          company_id: string;
          createdat?: string;
          details: string;
          id?: string;
          type?: Database["public"]["Enums"]["transaction_type"];
          updatedat?: string | null;
          updatedby?: string | null;
        };
        Update: {
          amount?: number;
          code?: string;
          company_id?: string;
          createdat?: string;
          details?: string;
          id?: string;
          type?: Database["public"]["Enums"]["transaction_type"];
          updatedat?: string | null;
          updatedby?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "capital_company_id_fkey";
            columns: ["company_id"];
            referencedRelation: "company";
            referencedColumns: ["id"];
          },
        ];
      };
      cash: {
        Row: {
          amount: number;
          code: string;
          company_id: string;
          createdat: string;
          details: string;
          id: string;
          type: Database["public"]["Enums"]["transaction_type"];
          updatedat: string | null;
          updatedby: string | null;
        };
        Insert: {
          amount: number;
          code: string;
          company_id: string;
          createdat?: string;
          details: string;
          id?: string;
          type?: Database["public"]["Enums"]["transaction_type"];
          updatedat?: string | null;
          updatedby?: string | null;
        };
        Update: {
          amount?: number;
          code?: string;
          company_id?: string;
          createdat?: string;
          details?: string;
          id?: string;
          type?: Database["public"]["Enums"]["transaction_type"];
          updatedat?: string | null;
          updatedby?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "cash_company_id_fkey";
            columns: ["company_id"];
            referencedRelation: "company";
            referencedColumns: ["id"];
          },
        ];
      };
      cashbook: {
        Row: {
          bank: number | null;
          cash: number | null;
          code: string;
          company_id: string;
          createdat: string;
          details: string;
          id: string;
          type: Database["public"]["Enums"]["transaction_type"];
          updatedat: string | null;
          updatedby: string | null;
        };
        Insert: {
          bank?: number | null;
          cash?: number | null;
          code: string;
          company_id: string;
          createdat?: string;
          details: string;
          id?: string;
          type?: Database["public"]["Enums"]["transaction_type"];
          updatedat?: string | null;
          updatedby?: string | null;
        };
        Update: {
          bank?: number | null;
          cash?: number | null;
          code?: string;
          company_id?: string;
          createdat?: string;
          details?: string;
          id?: string;
          type?: Database["public"]["Enums"]["transaction_type"];
          updatedat?: string | null;
          updatedby?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "cashbook_company_id_fkey";
            columns: ["company_id"];
            referencedRelation: "company";
            referencedColumns: ["id"];
          },
        ];
      };
      company: {
        Row: {
          account_number: string | null;
          assets: string[];
          createdat: string;
          description: string;
          email: string | null;
          employee_ids: string[];
          id: string;
          location: string | null;
          log: string | null;
          name: string;
          phone: string | null;
          social_links: Json;
          status: Database["public"]["Enums"]["account_status"];
          updatedat: string | null;
          updatedby: string | null;
        };
        Insert: {
          account_number?: string | null;
          assets?: string[];
          createdat?: string;
          description: string;
          email?: string | null;
          employee_ids?: string[];
          id?: string;
          location?: string | null;
          log?: string | null;
          name: string;
          phone?: string | null;
          social_links: Json;
          status?: Database["public"]["Enums"]["account_status"];
          updatedat?: string | null;
          updatedby?: string | null;
        };
        Update: {
          account_number?: string | null;
          assets?: string[];
          createdat?: string;
          description?: string;
          email?: string | null;
          employee_ids?: string[];
          id?: string;
          location?: string | null;
          log?: string | null;
          name?: string;
          phone?: string | null;
          social_links?: Json;
          status?: Database["public"]["Enums"]["account_status"];
          updatedat?: string | null;
          updatedby?: string | null;
        };
        Relationships: [];
      };
      expense: {
        Row: {
          amount: number;
          code: string;
          company_id: string;
          createdat: string;
          details: string;
          id: string;
          type: Database["public"]["Enums"]["transaction_type"];
          updatedat: string | null;
          updatedby: string | null;
        };
        Insert: {
          amount: number;
          code: string;
          company_id: string;
          createdat?: string;
          details: string;
          id?: string;
          type?: Database["public"]["Enums"]["transaction_type"];
          updatedat?: string | null;
          updatedby?: string | null;
        };
        Update: {
          amount?: number;
          code?: string;
          company_id?: string;
          createdat?: string;
          details?: string;
          id?: string;
          type?: Database["public"]["Enums"]["transaction_type"];
          updatedat?: string | null;
          updatedby?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "expense_company_id_fkey";
            columns: ["company_id"];
            referencedRelation: "company";
            referencedColumns: ["id"];
          },
        ];
      };
      journal: {
        Row: {
          amount: number;
          code: string;
          company_id: string;
          createdat: string;
          details: string;
          id: string;
          type: Database["public"]["Enums"]["transaction_type"];
          updatedat: string | null;
          updatedby: string | null;
        };
        Insert: {
          amount: number;
          code: string;
          company_id: string;
          createdat?: string;
          details: string;
          id?: string;
          type?: Database["public"]["Enums"]["transaction_type"];
          updatedat?: string | null;
          updatedby?: string | null;
        };
        Update: {
          amount?: number;
          code?: string;
          company_id?: string;
          createdat?: string;
          details?: string;
          id?: string;
          type?: Database["public"]["Enums"]["transaction_type"];
          updatedat?: string | null;
          updatedby?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "journal_company_id_fkey";
            columns: ["company_id"];
            referencedRelation: "company";
            referencedColumns: ["id"];
          },
        ];
      };
      land: {
        Row: {
          amount: number;
          code: string;
          company_id: string;
          createdat: string;
          details: string;
          id: string;
          sold: boolean;
          type: Database["public"]["Enums"]["transaction_type"];
          updatedat: string | null;
          updatedby: string | null;
        };
        Insert: {
          amount: number;
          code: string;
          company_id: string;
          createdat?: string;
          details: string;
          id?: string;
          sold?: boolean;
          type?: Database["public"]["Enums"]["transaction_type"];
          updatedat?: string | null;
          updatedby?: string | null;
        };
        Update: {
          amount?: number;
          code?: string;
          company_id?: string;
          createdat?: string;
          details?: string;
          id?: string;
          sold?: boolean;
          type?: Database["public"]["Enums"]["transaction_type"];
          updatedat?: string | null;
          updatedby?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "land_company_id_fkey";
            columns: ["company_id"];
            referencedRelation: "company";
            referencedColumns: ["id"];
          },
        ];
      };
      machine: {
        Row: {
          amount: number;
          code: string;
          company_id: string;
          createdat: string;
          details: string;
          id: string;
          sold: boolean;
          type: Database["public"]["Enums"]["transaction_type"];
          updatedat: string | null;
          updatedby: string | null;
        };
        Insert: {
          amount: number;
          code: string;
          company_id: string;
          createdat?: string;
          details: string;
          id?: string;
          sold?: boolean;
          type?: Database["public"]["Enums"]["transaction_type"];
          updatedat?: string | null;
          updatedby?: string | null;
        };
        Update: {
          amount?: number;
          code?: string;
          company_id?: string;
          createdat?: string;
          details?: string;
          id?: string;
          sold?: boolean;
          type?: Database["public"]["Enums"]["transaction_type"];
          updatedat?: string | null;
          updatedby?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "machine_company_id_fkey";
            columns: ["company_id"];
            referencedRelation: "company";
            referencedColumns: ["id"];
          },
        ];
      };
      sales: {
        Row: {
          amount: number;
          code: string;
          company_id: string;
          createdat: string;
          details: string;
          id: string;
          type: Database["public"]["Enums"]["transaction_type"];
          updatedat: string | null;
          updatedby: string | null;
        };
        Insert: {
          amount: number;
          code: string;
          company_id: string;
          createdat?: string;
          details: string;
          id?: string;
          type?: Database["public"]["Enums"]["transaction_type"];
          updatedat?: string | null;
          updatedby?: string | null;
        };
        Update: {
          amount?: number;
          code?: string;
          company_id?: string;
          createdat?: string;
          details?: string;
          id?: string;
          type?: Database["public"]["Enums"]["transaction_type"];
          updatedat?: string | null;
          updatedby?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "sales_company_id_fkey";
            columns: ["company_id"];
            referencedRelation: "company";
            referencedColumns: ["id"];
          },
        ];
      };
      stock: {
        Row: {
          code: string;
          company_id: string;
          createdat: string;
          id: string;
          item: string;
          price: number;
          quantity: number;
          quantity_sold: number | null;
          selling_price: number;
          updatedat: string | null;
          updatedby: string | null;
        };
        Insert: {
          code: string;
          company_id: string;
          createdat?: string;
          id?: string;
          item: string;
          price: number;
          quantity: number;
          quantity_sold?: number | null;
          selling_price: number;
          updatedat?: string | null;
          updatedby?: string | null;
        };
        Update: {
          code?: string;
          company_id?: string;
          createdat?: string;
          id?: string;
          item?: string;
          price?: number;
          quantity?: number;
          quantity_sold?: number | null;
          selling_price?: number;
          updatedat?: string | null;
          updatedby?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "stock_company_id_fkey";
            columns: ["company_id"];
            referencedRelation: "company";
            referencedColumns: ["id"];
          },
        ];
      };
      users: {
        Row: {
          admin: boolean | null;
          createdat: string | null;
          id: string;
          last_login: string | null;
          moderator: boolean | null;
          name: string | null;
          status: Database["public"]["Enums"]["account_status"];
          super_admin: boolean | null;
          user_id: string;
        };
        Insert: {
          admin?: boolean | null;
          createdat?: string | null;
          id?: string;
          last_login?: string | null;
          moderator?: boolean | null;
          name?: string | null;
          status?: Database["public"]["Enums"]["account_status"];
          super_admin?: boolean | null;
          user_id: string;
        };
        Update: {
          admin?: boolean | null;
          createdat?: string | null;
          id?: string;
          last_login?: string | null;
          moderator?: boolean | null;
          name?: string | null;
          status?: Database["public"]["Enums"]["account_status"];
          super_admin?: boolean | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "users_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      vehicle: {
        Row: {
          amount: number;
          code: string;
          company_id: string;
          createdat: string;
          details: string;
          id: string;
          sold: boolean;
          type: Database["public"]["Enums"]["transaction_type"];
          updatedat: string | null;
          updatedby: string | null;
        };
        Insert: {
          amount: number;
          code: string;
          company_id: string;
          createdat?: string;
          details: string;
          id?: string;
          sold?: boolean;
          type?: Database["public"]["Enums"]["transaction_type"];
          updatedat?: string | null;
          updatedby?: string | null;
        };
        Update: {
          amount?: number;
          code?: string;
          company_id?: string;
          createdat?: string;
          details?: string;
          id?: string;
          sold?: boolean;
          type?: Database["public"]["Enums"]["transaction_type"];
          updatedat?: string | null;
          updatedby?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "vehicle_company_id_fkey";
            columns: ["company_id"];
            referencedRelation: "company";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      increment_sold_stock: {
        Args: {
          quantity: number;
          company_id: string;
          item: string;
        };
        Returns: undefined;
      };
    };
    Enums: {
      account_status: "active" | "suspended" | "deleted";
      transaction_type: "dr" | "cr";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
