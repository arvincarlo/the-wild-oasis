
import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = 'https://faszoicjvndehdqpwugm.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZhc3pvaWNqdm5kZWhkcXB3dWdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEwMzY3MjUsImV4cCI6MjA0NjYxMjcyNX0.9-T4ylpvNR5C9fp6itNaZmy2MTdx0gXMAawNePu6FP0";
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;