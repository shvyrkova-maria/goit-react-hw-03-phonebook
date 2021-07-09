import { Component } from 'react';
import Section from 'components/Section/Section';
import ContactsForm from 'components/ContactsForm/ContactsForm';
import ContactsList from 'components/ContactsList/ContactsList';
import Filter from 'components/Filter/Filter';
import { Container } from 'components/App/App.styled';

export default class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const savedContacts = localStorage.getItem('contacts');
    const parsedSavedContacts = JSON.parse(savedContacts);

    if (parsedSavedContacts) {
      this.setState({ contacts: parsedSavedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const prevContacts = prevState.contacts;
    const updateContacts = this.state.contacts;
    if (prevContacts !== updateContacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContact = newContact => {
    this.state.contacts.some(({ name }) => name === newContact.name)
      ? alert(`Contact ${newContact.name} already exists`)
      : this.setState(({ contacts }) => ({
          contacts: [newContact, ...contacts],
        }));
  };

  deleteContact = contactId => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== contactId),
    }));
  };

  getFilterValue = event => {
    this.setState({
      filter: event.target.value,
    });
  };

  filteredContacts = () => {
    const { contacts, filter } = this.state;
    const normalizeFilter = filter.toLowerCase();

    return contacts.filter(
      contact =>
        contact.name.toLowerCase().includes(normalizeFilter) ||
        contact.number.includes(normalizeFilter),
    );
  };

  render() {
    const { addContact, deleteContact, getFilterValue, filteredContacts } =
      this;
    const filtered = filteredContacts();
    return (
      <Container>
        <Section title="Phonebook">
          <ContactsForm onSubmit={addContact} />
        </Section>
        <Section title="Contacts">
          <Filter filter={this.state.filter} onChange={getFilterValue} />
          <ContactsList contacts={filtered} onDeleteClick={deleteContact} />
        </Section>
      </Container>
    );
  }
}
