import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";
import { toast } from "react-hot-toast";

export function useDeleteCabin() {
    // Special Hook to get the query client
    const queryClient = useQueryClient();

    const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
        mutationFn: deleteCabinApi,
        // Invalidate the cache once the mutation is successful
        onSuccess: () => {
            toast.success("Cabin successfully deleted.")
    
            queryClient.invalidateQueries({
                queryKey: ['cabins']
            })
        },
        // Receives the error thrown inside this function
        onError: (error) => toast.error(error.message)
    });

    return { isDeleting, deleteCabin };
}