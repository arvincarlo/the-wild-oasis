import TableOperations from '../../ui/TableOperations';
import Filter from '../../ui/Filter';

function CabinTableOperations() {
    
    // Options for the filter
    const options = [
        {value: 'all', label: "All"},
        {value: 'no-discount', label: "No discount"},
        {value: 'with-discount', label: "With discount"},
    ];

    return (
        <TableOperations>
            <Filter filterField="discount" options={options}></Filter>
        </TableOperations>
    )
}

export default CabinTableOperations
