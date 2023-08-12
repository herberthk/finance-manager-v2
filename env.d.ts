declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ACCESS_TOKEN: string;
      DIRECT_URL: string;
      DATABASE_URL: string;
      PROJECT_ID: string;
      NEXT_PUBLIC_SUPABASE_URL: string;
      NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
      SUPABASE_SERVICE_ROLE_KEY: string;
    }
  }
}

export {};
