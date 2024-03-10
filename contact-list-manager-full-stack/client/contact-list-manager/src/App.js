import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import AddContact from "./Components/AddContact";
import GetContactList from "./Components/GetContactList";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <hr />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddContact />} />
          <Route path="/get" element={<GetContactList />} />
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

export default App;
