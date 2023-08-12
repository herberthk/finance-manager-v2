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
          amount: number | null;
          code: string | null;
          company_id: string;
          createdat: string | null;
          details: string | null;
          id: string;
          type: Database["public"]["Enums"]["transaction_type"];
          updatedat: string | null;
          updatedby: string | null;
        };
        Insert: {
          amount?: number | null;
          code?: string | null;
          company_id: string;
          createdat?: string | null;
          details?: string | null;
          id?: string;
          type?: Database["public"]["Enums"]["transaction_type"];
          updatedat?: string | null;
          updatedby?: string | null;
        };
        Update: {
          amount?: number | null;
          code?: string | null;
          company_id?: string;
          createdat?: string | null;
          details?: string | null;
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
          amount: number | null;
          code: string | null;
          company_id: string;
          createdat: string | null;
          details: string | null;
          id: string;
          type: Database["public"]["Enums"]["transaction_type"];
          updatedat: string | null;
          updatedby: string | null;
        };
        Insert: {
          amount?: number | null;
          code?: string | null;
          company_id: string;
          createdat?: string | null;
          details?: string | null;
          id?: string;
          type?: Database["public"]["Enums"]["transaction_type"];
          updatedat?: string | null;
          updatedby?: string | null;
        };
        Update: {
          amount?: number | null;
          code?: string | null;
          company_id?: string;
          createdat?: string | null;
          details?: string | null;
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
          amount: number | null;
          code: string | null;
          company_id: string;
          createdat: string | null;
          details: string | null;
          id: string;
          type: Database["public"]["Enums"]["transaction_type"];
          updatedat: string | null;
          updatedby: string | null;
        };
        Insert: {
          amount?: number | null;
          code?: string | null;
          company_id: string;
          createdat?: string | null;
          details?: string | null;
          id?: string;
          type?: Database["public"]["Enums"]["transaction_type"];
          updatedat?: string | null;
          updatedby?: string | null;
        };
        Update: {
          amount?: number | null;
          code?: string | null;
          company_id?: string;
          createdat?: string | null;
          details?: string | null;
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
          code: string | null;
          company_id: string;
          createdat: string | null;
          details: string | null;
          id: string;
          type: Database["public"]["Enums"]["transaction_type"];
          updatedat: string | null;
          updatedby: string | null;
        };
        Insert: {
          bank?: number | null;
          cash?: number | null;
          code?: string | null;
          company_id: string;
          createdat?: string | null;
          details?: string | null;
          id?: string;
          type?: Database["public"]["Enums"]["transaction_type"];
          updatedat?: string | null;
          updatedby?: string | null;
        };
        Update: {
          bank?: number | null;
          cash?: number | null;
          code?: string | null;
          company_id?: string;
          createdat?: string | null;
          details?: string | null;
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
          assets: string[] | null;
          createdat: string | null;
          description: string | null;
          email: string | null;
          employee_ids: string[] | null;
          id: string;
          location: string | null;
          log: string | null;
          name: string | null;
          phone: string | null;
          status: Database["public"]["Enums"]["account_status"];
          updatedat: string | null;
          updatedby: string | null;
        };
        Insert: {
          account_number?: string | null;
          assets?: string[] | null;
          createdat?: string | null;
          description?: string | null;
          email?: string | null;
          employee_ids?: string[] | null;
          id?: string;
          location?: string | null;
          log?: string | null;
          name?: string | null;
          phone?: string | null;
          status?: Database["public"]["Enums"]["account_status"];
          updatedat?: string | null;
          updatedby?: string | null;
        };
        Update: {
          account_number?: string | null;
          assets?: string[] | null;
          createdat?: string | null;
          description?: string | null;
          email?: string | null;
          employee_ids?: string[] | null;
          id?: string;
          location?: string | null;
          log?: string | null;
          name?: string | null;
          phone?: string | null;
          status?: Database["public"]["Enums"]["account_status"];
          updatedat?: string | null;
          updatedby?: string | null;
        };
        Relationships: [];
      };
      expense: {
        Row: {
          amount: number | null;
          code: string | null;
          company_id: string;
          createdat: string | null;
          details: string | null;
          id: string;
          type: Database["public"]["Enums"]["transaction_type"];
          updatedat: string | null;
          updatedby: string | null;
        };
        Insert: {
          amount?: number | null;
          code?: string | null;
          company_id: string;
          createdat?: string | null;
          details?: string | null;
          id?: string;
          type?: Database["public"]["Enums"]["transaction_type"];
          updatedat?: string | null;
          updatedby?: string | null;
        };
        Update: {
          amount?: number | null;
          code?: string | null;
          company_id?: string;
          createdat?: string | null;
          details?: string | null;
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
          amount: number | null;
          code: string | null;
          company_id: string;
          createdat: string | null;
          details: string | null;
          id: string;
          type: Database["public"]["Enums"]["transaction_type"];
          updatedat: string | null;
          updatedby: string | null;
        };
        Insert: {
          amount?: number | null;
          code?: string | null;
          company_id: string;
          createdat?: string | null;
          details?: string | null;
          id?: string;
          type?: Database["public"]["Enums"]["transaction_type"];
          updatedat?: string | null;
          updatedby?: string | null;
        };
        Update: {
          amount?: number | null;
          code?: string | null;
          company_id?: string;
          createdat?: string | null;
          details?: string | null;
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
          amount: number | null;
          code: string | null;
          company_id: string;
          createdat: string | null;
          details: string | null;
          id: string;
          sold: boolean | null;
          type: Database["public"]["Enums"]["transaction_type"];
          updatedat: string | null;
          updatedby: string | null;
        };
        Insert: {
          amount?: number | null;
          code?: string | null;
          company_id: string;
          createdat?: string | null;
          details?: string | null;
          id?: string;
          sold?: boolean | null;
          type?: Database["public"]["Enums"]["transaction_type"];
          updatedat?: string | null;
          updatedby?: string | null;
        };
        Update: {
          amount?: number | null;
          code?: string | null;
          company_id?: string;
          createdat?: string | null;
          details?: string | null;
          id?: string;
          sold?: boolean | null;
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
          amount: number | null;
          code: string | null;
          company_id: string;
          createdat: string | null;
          details: string | null;
          id: string;
          sold: boolean | null;
          type: Database["public"]["Enums"]["transaction_type"];
          updatedat: string | null;
          updatedby: string | null;
        };
        Insert: {
          amount?: number | null;
          code?: string | null;
          company_id: string;
          createdat?: string | null;
          details?: string | null;
          id?: string;
          sold?: boolean | null;
          type?: Database["public"]["Enums"]["transaction_type"];
          updatedat?: string | null;
          updatedby?: string | null;
        };
        Update: {
          amount?: number | null;
          code?: string | null;
          company_id?: string;
          createdat?: string | null;
          details?: string | null;
          id?: string;
          sold?: boolean | null;
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
          amount: number | null;
          code: string | null;
          company_id: string;
          createdat: string | null;
          details: string | null;
          id: string;
          type: Database["public"]["Enums"]["transaction_type"];
          updatedat: string | null;
          updatedby: string | null;
        };
        Insert: {
          amount?: number | null;
          code?: string | null;
          company_id: string;
          createdat?: string | null;
          details?: string | null;
          id?: string;
          type?: Database["public"]["Enums"]["transaction_type"];
          updatedat?: string | null;
          updatedby?: string | null;
        };
        Update: {
          amount?: number | null;
          code?: string | null;
          company_id?: string;
          createdat?: string | null;
          details?: string | null;
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
      social: {
        Row: {
          company_id: string;
          createdat: string | null;
          id: string;
          name: string | null;
          updatedat: string | null;
          updatedby: string | null;
        };
        Insert: {
          company_id: string;
          createdat?: string | null;
          id?: string;
          name?: string | null;
          updatedat?: string | null;
          updatedby?: string | null;
        };
        Update: {
          company_id?: string;
          createdat?: string | null;
          id?: string;
          name?: string | null;
          updatedat?: string | null;
          updatedby?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "social_company_id_fkey";
            columns: ["company_id"];
            referencedRelation: "company";
            referencedColumns: ["id"];
          },
        ];
      };
      stock: {
        Row: {
          code: string | null;
          company_id: string;
          createdat: string | null;
          id: string;
          item: string | null;
          price: number | null;
          quantity: number | null;
          quantity_sold: number | null;
          selling_price: number | null;
          updatedat: string | null;
          updatedby: string | null;
        };
        Insert: {
          code?: string | null;
          company_id: string;
          createdat?: string | null;
          id?: string;
          item?: string | null;
          price?: number | null;
          quantity?: number | null;
          quantity_sold?: number | null;
          selling_price?: number | null;
          updatedat?: string | null;
          updatedby?: string | null;
        };
        Update: {
          code?: string | null;
          company_id?: string;
          createdat?: string | null;
          id?: string;
          item?: string | null;
          price?: number | null;
          quantity?: number | null;
          quantity_sold?: number | null;
          selling_price?: number | null;
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
          amount: number | null;
          code: string | null;
          company_id: string;
          createdat: string | null;
          details: string | null;
          id: string;
          sold: boolean | null;
          type: Database["public"]["Enums"]["transaction_type"];
          updatedat: string | null;
          updatedby: string | null;
        };
        Insert: {
          amount?: number | null;
          code?: string | null;
          company_id: string;
          createdat?: string | null;
          details?: string | null;
          id?: string;
          sold?: boolean | null;
          type?: Database["public"]["Enums"]["transaction_type"];
          updatedat?: string | null;
          updatedby?: string | null;
        };
        Update: {
          amount?: number | null;
          code?: string | null;
          company_id?: string;
          createdat?: string | null;
          details?: string | null;
          id?: string;
          sold?: boolean | null;
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
      [_ in never]: never;
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
