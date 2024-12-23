import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseAnonKey = process.env.SUPABASEKEY as string;

console.log(supabaseUrl, supabaseAnonKey);

export const supabase = createClient(
    "https://ecfiguypcgdhwpilwfvy.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVjZmlndXlwY2dkaHdwaWx3ZnZ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ5NzA2NjgsImV4cCI6MjA1MDU0NjY2OH0.TC3hy9oZZrLrts_qBwdx9x_7wpafJPhly90NAtybIgI"
);
