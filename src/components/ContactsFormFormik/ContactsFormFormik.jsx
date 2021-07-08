import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import 'yup-phone';
import {
  FormContainer,
  Button,
  Label,
  ValidationMessage,
} from 'components/ContactsFormFormik/ContactsFormFormik.styled';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  number: Yup.string().phone('+38', true, 'Valid number type +380*********'),
});

class ContactsFormFormik extends Component {
  render() {
    let nameInputId = nanoid(3);
    let phoneInputId = nanoid(3);

    return (
      <Formik
        initialValues={{ name: '', number: '' }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          const { name, number } = values;
          this.props.onSubmit({ id: nanoid(3), name, number });
          resetForm();
        }}
      >
        <FormContainer>
          <Label htmlFor={`id-${nameInputId}`}>Name</Label>
          <Field
            name="name"
            type="text"
            id={`id-${nameInputId}`}
            placeholder="Name"
          />
          <ErrorMessage name="name" component={ValidationMessage} />

          <Label htmlFor={`id-${phoneInputId}`}>Number</Label>
          <Field
            name="number"
            type="tel"
            id={`id-${phoneInputId}`}
            placeholder="+380*********"
          />
          <ErrorMessage name="number" component={ValidationMessage} />

          <Button type="submit">Add contact</Button>
        </FormContainer>
      </Formik>
    );
  }
}

export default ContactsFormFormik;
