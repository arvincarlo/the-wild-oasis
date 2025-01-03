import supabase, { supabaseUrl } from "./supabase"

export async function getCabins() {
    // return supabase.from("cabins").select("*").order("created_at", { ascending: false });

    const { data, error } = await supabase
    .from('cabins')
    .select('*')

    if (error) {
        throw new Error('Cabins could not be loaded');
    }

    return data;
}

export async function deleteCabin(id) {
    const { data, error } = await supabase
    .from('cabins')
    .delete()
    .eq('id', id)

    if (error) {
        throw new Error('Cabins could not be deleted')
    }

    return data;
}

export async function createEditCabin(newCabin, id) {
    const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
    // https://faszoicjvndehdqpwugm.supabase.co/storage/v1/object/public/cabin-images/cabin-001/2.jpg

    const imageName = `${Math.random()}-${newCabin.image?.name}`.replaceAll("/", "");
    const imagePath = hasImagePath ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

    // 1. Create/Edit a Cabin
    let query = supabase.from('cabins')

    // A) CREATE
    if (!id) {
        query = query.insert([{...newCabin, image: imagePath}])
    }

    // B) EDIT
    if (id) {
        query = query.update({...newCabin, image: imagePath})
        .eq('id', id)
    }

    const { data, error } = await query.select().single();

    if (error) {
        throw new Error('Cabins could not be created')
    }

    // 2. Upload image once successful
    if (hasImagePath) return data;
    const { error: storageError } = await supabase.storage.from('cabin-images').upload(imageName, newCabin.image);

    // 3. Delete the cabin if there was an error on uploding in uploading image
    if (storageError) {
        await supabase
        .from('cabins')
        .delete()
        .eq('id', data.id);
        console.error(storageError);
        throw new Error('Cabins image could not be uploaded and the cabin was not created.')
    }

    return data;

}