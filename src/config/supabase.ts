import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ekdphhlrubjsauuwiepb.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVrZHBoaGxydWJqc2F1dXdpZXBiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkyMDk2MTMsImV4cCI6MjA2NDc4NTYxM30.rt4qZqSNaWn4WAFO-y6ZnnP3NTUcD1z14hoIs-60rdE";
export const supabase = createClient(supabaseUrl, supabaseKey);
