import Button from "../../ui/Button"
import Modal from "../../ui/Modal";
import CreateCabinForm from './CreateCabinForm'
import CabinTable from "./CabinTable";

function AddCabin() {
    return (
        <Modal>
            <Modal.Open opens="cabin-form">
                <Button>Add new Cabin</Button>
            </Modal.Open>
            <Modal.Window name="cabin-form">
                <CreateCabinForm></CreateCabinForm>
            </Modal.Window>


            <Modal.Open opens="table">
                <Button>Show table</Button>
            </Modal.Open>
            <Modal.Window name="table">
                <CabinTable></CabinTable>
            </Modal.Window>
        </Modal>
    )
}

export default AddCabin
