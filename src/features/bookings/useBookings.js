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

    // Getting the current page
    // const page = !searchParams.get('page') ? 1 : Number(searchParams.get("page")) < pageCount ? Number(searchParams.get("page")) : pageCount;

    const page = !searchParams.get('page') ? 1 : Number(searchParams.get("page"));

    const { data: { data: bookings, count} = {}, isLoading, error } = useQuery({
        queryKey: ["bookings", filter, sortBy, page],
        queryFn: () => getBookings({filter, sortBy, page})
    });

    return { bookings, isLoading, error, count }
}
