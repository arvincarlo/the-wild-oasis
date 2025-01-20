import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateCurrentUser } from "../../services/apiAuth";

export function useUpdateUser() {
    // Hook to get the query client
    const queryClient = useQueryClient();

    const { mutate: updateUser, isLoading: isUpdating } = useMutation({
        mutationFn: updateCurrentUser,

        onSuccess: ({user}) => {
            toast.success("User account successfully updated.");

            // update the data manually in the cache using queryClient
            queryClient.setQueryData('user', user)

            queryClient.invalidateQueries({
                queryKey: ['user']
            });
        },
        // Catch the errors thrown inside this function
        onError: (error) => toast.error(error.message)
    });

    return { updateUser, isUpdating }
}