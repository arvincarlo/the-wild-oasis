import supabase from "./supabase"

export async function getCabins() {
    // return supabase.from("cabins").select("*").order("created_at", { ascending: false });

    const { data, error } = await supabase
    .from('cabins')
    .select('*')

    if (error) {
        console.error(error);
        throw new Error('Cabins could not be loaded');
    }

    return data;
}