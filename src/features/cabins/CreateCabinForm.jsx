import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { createCabin } from "../../services/apiCabins";
import FormRow from "../../ui/FormRow";

function CreateCabinForm() {
  // Define query client
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { errors } = formState;
  console.log(errors);

  // Query Mutation
  const {mutate, isLoading: isCreating} = useMutation({
    // mutationFn: (newCabin) => createCabin(newCabin)
    mutationFn: createCabin,

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


  function onSubmit(data) {
    // Insert the data to mutate
    mutate(data);
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Cabin name" error={errors?.name?.message} disabled={isCreating}>
        <Input type="text" id="name" {...register("name", {
          required: "This field is required"
        })}/>
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message} disabled={isCreating}>
        <Input type="number" id="maxCapacity" {...register("maxCapacity", {
          required: "This field is required",
          min: {
            value: 1,
            message: "Capacity should be at least 1"
          }
        })}/>
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message} disabled={isCreating}>
        <Input type="number" id="regularPrice" {...register("regularPrice", {
          required: "This field is required"
        })}/>
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message} disabled={isCreating}>
        <Input type="number" id="discount" min="0" defaultValue={0} {...register("discount", {
          required: "This field is required",
          validate: (discount) => discount <= getValues().regularPrice || "Discount should be less than the regular price"
        })}/>
      </FormRow>

      <FormRow label="Description for website" error={errors?.description?.message} disabled={isCreating}>
        <Textarea type="number" id="description" defaultValue="" {...register("description", {
          required: "This field is required"
        })}/>
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.image?.message}>
        <FileInput id="image" accept="image/*" />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>{isCreating ? "Creating...": "Create Cabin"}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
