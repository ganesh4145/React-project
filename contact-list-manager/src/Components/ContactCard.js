import React from 'react'

const ContactCard = (props) => {
    const {id,name,mail} = props.contact
  return (
        <div key = {id}>
            <div>{name}</div>
            <div>{mail}</div>
            <button onClick = { () => props.clickHandler(id)}>Delete</button>
            <hr />
        </div>
  )
}

export default ContactCard