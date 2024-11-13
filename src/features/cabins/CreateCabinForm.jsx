import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({cabinToEdit = {}}) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);
  const { createCabin, isCreating } = useCreateCabin();
  const { editCabin, isEditing } = useEditCabin();
  const isWorking = isCreating || isEditing;

  // useForm to get the data from submission
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {}
  });
  const { errors } = formState;

  function onSubmit(data) {

    const image = typeof data.image === 'string' ? data.image : data.image[0];

    if (isEditSession) {
      // Update the data to mutate
      editCabin({newCabinData: {...data, image}, id: editId}, {
        onSuccess: () => {
          reset();
        }
      })
    } else {
      // Insert the data to mutate
      createCabin({...data, image}, {
        onSuccess: () => {
          reset()
        }
      });
    }
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Cabin name" error={errors?.name?.message} disabled={isWorking}>
        <Input type="text" id="name" {...register("name", {
          required: "This field is required"
        })}/>
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message} disabled={isWorking}>
        <Input type="number" id="maxCapacity" {...register("maxCapacity", {
          required: "This field is required",
          min: {
            value: 1,
            message: "Capacity should be at least 1"
          }
        })}/>
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message} disabled={isWorking}>
        <Input type="number" id="regularPrice" {...register("regularPrice", {
          required: "This field is required"
        })}/>
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message} disabled={isWorking}>
        <Input type="number" id="discount" min="0" defaultValue={0} {...register("discount", {
          required: "This field is required",
          validate: (discount) => discount <= getValues().regularPrice || "Discount should be less than the regular price"
        })}/>
      </FormRow>

      <FormRow label="Description for website" error={errors?.description?.message}>
        <Textarea type="number" id="description" defaultValue="" {...register("description", {
          required: "This field is required"
        })}/>
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.image?.message}>
        <FileInput id="image" accept="image/*" {...register("image", {
          required: isEditSession ? false :"This field is required"
        })}/>
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isWorking}>{isEditSession ? "Update cabin": "Create new cabin"}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
