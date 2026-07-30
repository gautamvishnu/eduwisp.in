import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "Supabase env vars missing. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env",
  );
}

export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder-anon-key",
);

export interface RegisterPayload {
  name: string;
  email: string;
  mobile: string;
  password: string;
}

/** Create a Supabase auth user and store profile fields in user metadata */
export async function registerWithSupabase(payload: RegisterPayload) {
  const { data, error } = await supabase.auth.signUp({
    email: payload.email,
    password: payload.password,
    options: {
      data: {
        name: payload.name,
        mobile: payload.mobile,
        full_name: payload.name,
      },
    },
  });

  if (error) {
    throw error;
  }

  return data;
}
