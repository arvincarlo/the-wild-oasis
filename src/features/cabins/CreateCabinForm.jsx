import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import { createEditCabin } from "../../services/apiCabins";

function CreateCabinForm({cabinToEdit = {}}) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  // Define query client
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {}
  });
  const { errors } = formState;

  // Query Mutation
  // A: Insert
  const {mutate: createCabin, isLoading: isCreating} = useMutation({
    // mutationFn: (newCabin) => createEditCabin(newCabin)
    mutationFn: createEditCabin,

    // Invalidate the cache once the mutation is successful
    onSuccess: () => {
      toast.success("Cabin successfully created.");
      queryClient.invalidateQueries({
        queryKey: ['cabins']
      });

      // Reset the form
      reset();
    },

    // Catch the errors thrown inside this function
    onError: (error) => toast.error(error.message)
  });

  // B: Update
  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({newCabinData, id}) => createEditCabin(newCabinData, id),

    onSuccess: () => {
      toast.success("Cabin successfully updated.");
      queryClient.invalidateQueries({
        queryKey: ['cabins']
      });

      // Reset the form (edit)
      reset();
    },
    // Catch the errors thrown inside this function
    onError: (error) => toast.error(error.message)
  });

  const isWorking = isCreating || isEditing;

  function onSubmit(data) {
    const image = typeof data.image === 'string' ? data.image : data.image[0];
    if (isEditSession) {
      // Update the data to mutate
      editCabin({newCabinData: {...data, image}, id: editId})
    } else {
      // Insert the data to mutate
      createCabin({...data, image});
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

      <FormRow label="Description for website" error={errors?.description?.message} disabled={isWorking}>
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
