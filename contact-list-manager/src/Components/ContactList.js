import React from "react";
import ContactCard from "./ContactCard";

const ContactList = (props) => {
    const deleteConactHandler = (id) => {props.getContactId(id)}
    const renderContactList = props.contact.map((contact) =>{
    return (
        <ContactCard contact ={contact} clickHandler = {deleteConactHandler} key={contact.id}/>
    )})
    return(
        <div> { renderContactList } </div>
    )
}

export default ContactList;