import OpanAI from "openai"
import { createClient } from "@supabase/supabase-js"

/* OpenAI config */
export const openai = new OpanAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
})

/* Supabase config */
const privateKey = process.env.REACT_APP_SUPABASE_API_KEY
const url = process.env.REACT_APP_SUPABASE_URL
export const supabase = createClient(url, privateKey)