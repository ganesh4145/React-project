import React, { useState, useEffect } from "react";
import axios from "axios";

function GetContactList() {
  const [contactList, setContactList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await axios.get("http://localhost:5000/getcontact");
        setContactList(response.data.getContact);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };
    fetchContact();
  }, []);

  const filteredContacts = contactList.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Contact List</h2>
      <div>
        <label htmlFor="search">Search:</label>
        <input
          type="text"
          id="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <ul>
        {filteredContacts.map((contact) => (
          <li key={contact.id}>
            <strong>Name:</strong> {contact.name}, <strong>Email:</strong>{" "}
            {contact.mail}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GetContactList;
