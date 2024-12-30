import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings"
import { useSearchParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
    const [searchParams] = useSearchParams();
    const queryClient = useQueryClient();

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
    const pageValue = searchParams.get('page');
    const page = (!pageValue || pageValue < 1) ? 1 : Number(searchParams.get("page"));

    const { data: { data: bookings, count} = {}, isLoading, error } = useQuery({
        queryKey: ["bookings", filter, sortBy, page],
        queryFn: () => getBookings({filter, sortBy, page})
    });

    // Pre-fetching
    const pageCount = Math.ceil(count / PAGE_SIZE);

    if (page < pageCount) {
        queryClient.prefetchQuery({
            queryKey: ["bookings", filter, sortBy, page + 1],
            queryFn: () => getBookings({filter, sortBy, page: page + 1})
        })
    }

    if (page > 1) {
        queryClient.prefetchQuery({
            queryKey: ["bookings", filter, sortBy, page - 1],
            queryFn: () => getBookings({filter, sortBy, page: page - 1})
        })
    }

    return { bookings, isLoading, error, count }
}
