import PropTypes from 'prop-types';
import { Container, Item } from './contactList.styled';

const ContactList = ({contacts, onDeleteContact}) => {
return (
    <Container>
        <ul>
        {contacts.map(({ id, name, number }) => (
          <Item key={id}>
            {name}: {number}
            <button type="button" onClick={() => onDeleteContact(id)}>
              Delete
            </button>
          </Item>
        ))}
        </ul>
    </Container>
);
};

ContactList.propTypes = {
    contacts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
      }).isRequired
    ).isRequired,
    onDeleteContact: PropTypes.func.isRequired,
  };
  
export default ContactList;