import { Component } from 'react';
import ContactForm from './ContactForm/contactForm';
import ContactList from './ContactList/contactList';
import Filter from './Filter/filter';
import {Container, Title, Subtitle} from './App.styled';
import { nanoid } from 'nanoid';

class App extends Component {

  state = {
    contacts: [
    {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],
    filter: '',
  }  

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({contacts: parsedContacts});
    }
  }

  componentDidUpdate(_, prevState) {
    if (this.state.contacts.length !== prevState.contacts.length) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContacts = ({ name, number }) => {
    const normalizedName = name.toLowerCase();

    const isName = this.state.contacts.find(
      contact => contact.name.toLowerCase() === normalizedName
    );

    if (isName) {
      return alert(`${name} is already in contacts.`);
    }

    const contact = {
      id: nanoid(6),
      name,
      number,
    };

    this.setState(({ contacts }) => ({
      contacts: [...contacts, contact],
    }));
  };
  
  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getContact = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

render () {
  
  const { filter } = this.state;
  const visibleContact = this.getContact();

  return (
 <Container>
 <Title>Phonebook</Title>
 <ContactForm 
      onSubmit={this.addContacts} 
      />
 <Subtitle>Contacts</Subtitle>
 <Filter
      value={filter} 
      onChange={this.changeFilter} 
      />
 <ContactList
      contacts={visibleContact}
      onDeleteContact={this.deleteContact}
        />
</Container>
  )
  
}
}
export default App;