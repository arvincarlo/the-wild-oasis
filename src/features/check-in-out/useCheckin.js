import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

function useCheckin() {
    const queryClient = useQueryClient();

    const { mutate: checkIn, isLoading: isCheckingIn } = useMutation({
        mutationFn: ({bookingId, breakfast}) => updateBooking(bookingId, {
                status: "checked-in",
                isPaid: true,
                ...breakfast
            }
        ),
        onSuccess: (data) => {
            toast.success(`Booking #${data.id} successfully checked in`);
            queryClient.invalidateQueries({active: true})
        },
        onError: () => toast.error("There was an error while checking in")
    })

    return { checkIn, isCheckingIn }
}

export default useCheckin
