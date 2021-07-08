import { Component } from 'react';
import { nanoid } from 'nanoid';
import {
  Form,
  Button,
  Label,
  Input,
} from 'components/ContactsForm/ContactsForm.styled';

const INITIAL_STATE = {
  name: '',
  number: '',
};

class ContactsForm extends Component {
  state = {
    ...INITIAL_STATE,
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { name, number } = this.state;
    this.props.onSubmit({ id: nanoid(3), name, number });
    this.formReset();
  };

  formReset = () => {
    this.setState({ ...INITIAL_STATE });
  };

  render() {
    let nameInputId = nanoid(3);
    let phoneInputId = nanoid(3);
    const { handleSubmit, handleChange } = this;
    const { name, number } = this.state;

    return (
      <Form onSubmit={handleSubmit}>
        <Label htmlFor={`id-${nameInputId}`}>Name</Label>
        <Input
          id={`id-${nameInputId}`}
          type="text"
          name="name"
          debounceTimeout={700}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          placeholder="Name"
          title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
          onChange={handleChange}
          value={name}
          required
        />

        <Label htmlFor={`id-${phoneInputId}`}>Number</Label>
        <Input
          id={`id-${phoneInputId}`}
          type="tel"
          name="number"
          debounceTimeout={700}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          placeholder="+38 (000) 000-00-00"
          title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
          value={number}
          onChange={handleChange}
          required
        />
        <Button type="submit">Add contact</Button>
      </Form>
    );
  }
}

export default ContactsForm;
