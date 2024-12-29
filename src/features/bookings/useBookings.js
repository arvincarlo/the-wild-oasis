import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings"
import { useSearchParams } from "react-router-dom";

export function useBookings() {
    const [searchParams] = useSearchParams();

    // FILTER
    const filteredValue = searchParams.get("status");
    const filterDetails = [
        { method: "eq", field: "status", value: filteredValue }
    ];
    const filter = !filteredValue || filteredValue === 'all' ? null : filterDetails;

    // SORT
    const sortByRaw = searchParams.get('sortBy') || "startDate-desc";
    const [ field, direction ] = sortByRaw.split('-');
    const sortBy = { field, direction };

    const { data: bookings, isLoading, error } = useQuery({
        queryKey: ["bookings", filter, sortBy],
        queryFn: () => getBookings({filter, sortBy})
    });

    return { bookings, isLoading, error}
}
