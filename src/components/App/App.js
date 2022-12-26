// import { Component } from 'react';
import { Filter } from 'components/Filter/Filter';
import { ContactList } from 'components/ContactList/ContactList';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { nanoid } from 'nanoid';
import { Contacts, Layout, Title } from './App..styled';
import { useState, useEffect } from 'react';

const LK_CONTACTS = 'contact_list';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    const curentContacts = JSON.parse(localStorage.getItem(LK_CONTACTS));
    if (curentContacts !== null) {
      return curentContacts;
    }
    return [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem(LK_CONTACTS, JSON.stringify(contacts));
  }, [contacts]);

  const addContact = values => {
    const newContact = {
      id: nanoid(),
      name: values.name,
      number: values.number,
    };

    if (
      contacts.find(
        contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
      )
    ) {
      return alert(`${newContact.name} is already in contacts`);
    }

    setContacts(prevContacts => [...prevContacts, newContact]);
  };

  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };
  const filterChange = evt => {
    setFilter(evt.target.value);
  };

  const getFilteredContacts = () => {
    const normalize = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalize)
    );
  };

  const filterContacts = getFilteredContacts();
  return (
    <Layout>
      <Title>Phonebook</Title>
      <ContactForm onFormSubmit={addContact} />
      <Contacts>Contacts</Contacts>

      {filterContacts.length > 0 && (
        <>
          <Filter value={filter} onChange={filterChange} />
          <ContactList filters={filterContacts} onDelete={deleteContact} />
        </>
      )}
    </Layout>
  );
};
