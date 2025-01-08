import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingApi  } from "../../services/apiBookings";
import toast from "react-hot-toast";

function useDeleteBooking() {
    // Special Hook to get the query client
    const queryClient = useQueryClient();

    const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
        mutationFn: deleteBookingApi,

        // Invalidate the cache once the mutation is successful
        onSuccess: () => {
            toast.success("Booking successfully deleted.")

            queryClient.invalidateQueries({
                queryKey: ['bookings']
            })
        },
        // Receives the error thrown inside this function
        onError: (error) => toast.error(error.message)
    });

    return { isDeleting, deleteBooking }
}

export default useDeleteBooking
