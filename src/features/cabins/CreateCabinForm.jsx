import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { createCabin } from "../../services/apiCabins";
import { toast } from "react-hot-toast";

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CreateCabinForm() {
  // Define query client
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm();

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

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <Label htmlFor="name">Cabin name</Label>
        <Input type="text" id="name" {...register("name")}/>
      </FormRow>

      <FormRow>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
        <Input type="number" id="maxCapacity" min="1" {...register("maxCapacity")}/>
      </FormRow>

      <FormRow>
        <Label htmlFor="regularPrice">Regular price</Label>
        <Input type="number" id="regularPrice" {...register("regularPrice")}/>
      </FormRow>

      <FormRow>
        <Label htmlFor="discount">Discount</Label>
        <Input type="number" id="discount" min="0" defaultValue={0} {...register("discount")}/>
      </FormRow>

      <FormRow>
        <Label htmlFor="description">Description for website</Label>
        <Textarea type="number" id="description" defaultValue="" {...register("description")}/>
      </FormRow>

      <FormRow>
        <Label htmlFor="image">Cabin photo</Label>
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
