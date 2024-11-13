import { useQueryClient, useMutation } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import { toast } from "react-hot-toast";

export function useCreateCabin() {

    // Special Hook to get the query client
    const queryClient = useQueryClient();

    const { mutate: createCabin, isLoading: isCreating } = useMutation({
        // mutationFn: (newCabin) => createEditCabin(newCabin)
        mutationFn: createEditCabin,

        // Invalidate the cache once the mutation is successful
        onSuccess: () => {
            toast.success("Cabin successfully created.");
            queryClient.invalidateQueries({
                queryKey: ['cabins']
            });
        },

        // Catch the errors thrown inside this function
        onError: (error) => toast.error(error.message)
    });

    return { createCabin, isCreating };
}