import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import Header from './Components/Header';
import AddContact from './Components/AddContact';
import ContactList from './Components/ContactList';

function App() {
  const LOCAL_STORAGE_KEY = 'contact';
  const [contact, setContact] = useState([]);

  const addContatctList = (contacts) => {
    console.log(contacts);
    setContact([...contact, { id: uuid(), ...contacts }]);
  };

  const removeContactHandler = (id) => {
    const newContactList = contact.filter((contacts) => {
      return contacts.id !== id;
    })
    setContact(newContactList)
  };

  return (
    <div>
      <Header />
      <AddContact addContatctList={addContatctList} />
      <hr />
      <ContactList contact={contact} getContactId ={ removeContactHandler } />  
    </div>
  );
}

export default App;