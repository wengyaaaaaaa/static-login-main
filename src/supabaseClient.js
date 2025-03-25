import { createClient } from "@supabase/supabase-js";

// 替換成你的 Supabase URL 和 anon key
const supabaseUrl = "https://xhaljbfgahowivybtozx.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhoYWxqYmZnYWhvd2l2eWJ0b3p4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5MDExMjIsImV4cCI6MjA1ODQ3NzEyMn0.4JEt6JHQCimdes2pLcxf82tWpiYNskh1k71o2nyf9_I";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
