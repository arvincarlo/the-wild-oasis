import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import { useSettings } from './useSettings';
import Spinner from '../../ui/Spinner';

function UpdateSettingsForm() {
  const {isLoading, 
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGeustsPerBooking,
      breakfastPrice
    } = {}
  } = useSettings();

  if (isLoading) return <Spinner/>

  return (
    <Form>
      <FormRow label='Minimum nights/booking'>
        <Input type='number' id='min-nights' defaultValue={1}/>
      </FormRow>
      <FormRow label='Maximum nights/booking'>
        <Input type='number' id='max-nights' defaultValue={1}/>
      </FormRow>
      <FormRow label='Maximum guests/booking'>
        <Input type='number' id='max-guests' defaultValue={1}/>
      </FormRow>
      <FormRow label='Breakfast price'>
        <Input type='number' id='breakfast-price' defaultValue={1}/>
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
