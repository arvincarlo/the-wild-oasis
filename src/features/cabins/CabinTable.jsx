import Spinner from "../../ui/Spinner";
import CabinRow from './CabinRow';
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

// const Table = styled.div`
//   border: 1px solid var(--color-grey-200);

//   font-size: 1.4rem;
//   background-color: var(--color-grey-0);
//   border-radius: 7px;
//   overflow: hidden;
// `;

// const TableHeader = styled.header`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;

//   background-color: var(--color-grey-50);
//   border-bottom: 1px solid var(--color-grey-100);
//   text-transform: uppercase;
//   letter-spacing: 0.4px;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   padding: 1.6rem 2.4rem;
// `;

function CabinTable() {
  // Get cabins data from useCabins hook
  const { cabins, isLoading, error } = useCabins();
  const [searchParams] = useSearchParams();

  if(isLoading) return <Spinner></Spinner>

  if (!cabins.length) return <Empty resourceName="cabins"></Empty>

  const filterValue = searchParams.get("discount") || "all";

  // 1. Filter
  let filteredCabins;
  switch(filterValue) {
    case "all":
      filteredCabins = cabins;
    break;

    case "no-discount":
      filteredCabins = cabins.filter(cabin => cabin.discount === 0);
    break;

    case "with-discount":
      filteredCabins = cabins.filter(cabin => cabin.discount > 0);
    break;
    
    default: filteredCabins = cabins;
  }

  // 2. Sort
  const sortBy = searchParams.get("sortBy") || "startDate-asc";
  // const [field, direction] = sortBy.split('-');
  // const modifier = direction === 'asc' ? 1 : -1;
  // const sortedCabins = filteredCabins?.sort((a, b) => (a[field] - b[field]) * modifier);
  // console.log(sortedCabins, field);

  let sortedCabins;

  switch(sortBy) {
    case "name-asc":
      sortedCabins = filteredCabins?.sort((a, b) => a.name.localeCompare(b.name));
    break;
    case "name-desc":
      sortedCabins = filteredCabins?.sort((a, b) => b.name.localeCompare(a.name));
    break;
    case "regularPrice-asc":
      sortedCabins = filteredCabins?.sort((a, b) => a.regularPrice - b.regularPrice);
    break;
    case "regularPrice-desc":
      sortedCabins = filteredCabins?.sort((a, b) => b.regularPrice - a.regularPrice);
    break;
    case "maxCapacity-asc":
      sortedCabins = filteredCabins?.sort((a, b) => a.maxCapacity - b.maxCapacity);
    break;
    case "maxCapacity-desc":
      sortedCabins = filteredCabins?.sort((a, b) => b.maxCapacity - a.maxCapacity);
    break;
    default: sortedCabins = filteredCabins;
  }


  if(error) return 'An error has occurred: ' + error.message

  return (
    <Menus>
      <Table columns='0.6fr 1.8fr 2.2fr 1fr 1fr 1fr'>
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body data={sortedCabins} render={(cabin, index) => <CabinRow key={index} cabin={cabin}></CabinRow>}/>
      </Table>
    </Menus>
  )
}

export default CabinTable

