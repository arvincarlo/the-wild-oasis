import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";

export function useEditCabin() {
    // Hook to get the query client
    const queryClient = useQueryClient();

    const { mutate: editCabin, isLoading: isEditing } = useMutation({
        mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),

        onSuccess: () => {
            toast.success("Cabin successfully updated.");
            queryClient.invalidateQueries({
                queryKey: ['cabins']
            });
        },
        // Catch the errors thrown inside this function
        onError: (error) => toast.error(error.message)
    });

    return { editCabin, isEditing }
}