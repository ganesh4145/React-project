import React, { Component } from "react";

class AddContact extends Component{
    state ={
        name: "",
        mail: ""
    }
    add = (e) => {
        e.preventDefault();
        if (this.state.name === "" || this.state.mail ===""){
            alert("All fields are mandatory")
            return;
        }
        this.props.addContatctList(this.state);
        this.setState({name:"",mail:""})
        
    }
    render(){
        return(
            <div>
                <form onSubmit= {this.add}>
                    <div>
                        <label>Name</label>
                        <input type="text" name="name" placeholder="Name" value = {this.state.name} onChange= { (e) => this.setState({name: e.target.value})}/>
                    </div>
                    <div>
                        <label>Email</label>
                        <input type="text" name="email" placeholder="Email-ID" value = {this.state.mail} onChange= { (e) => this.setState({mail: e.target.value})}/>
                    </div>
                    <button>Add</button>
                </form>
            </div>
        )
    }
}

export default AddContact;