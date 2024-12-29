import TableOperations from '../../ui/TableOperations';
import Filter from '../../ui/Filter';
import SortBy from '../../ui/SortBy';

function CabinTableOperations() {
    
    // Options for the filter
    const filterOptions = [
        {value: 'all', label: "All"},
        {value: 'no-discount', label: "No discount"},
        {value: 'with-discount', label: "With discount"},
    ];

    // Options for the sort
    const sortOptions = [
        {value: "name-asc", label: "Sort by name (A to Z)"},
        {value: "name-desc", label: "Sort by name (Z to A)"},
        {value: "regularPrice-asc", label: "Sort by price (Low to High)"},
        {value: "regularPrice-desc", label: "Sort by price (High to Low)"},
        {value: "maxCapacity-asc", label: "Sort by capacity (Low to High)"},
        {value: "maxCapacity-desc", label: "Sort by capacity (High to Low)"},
    ]

    return (
        <TableOperations>
            <Filter filterField="discount" options={filterOptions}></Filter>
            <SortBy options={sortOptions}>
            </SortBy>
        </TableOperations>
    )
}

export default CabinTableOperations
