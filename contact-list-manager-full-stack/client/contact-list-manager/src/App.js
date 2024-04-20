import { React, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Header from "./Components/Header";
import AddContact from "./Components/AddContact";
import GetContactList from "./Components/GetContactList";
import DeleteContact from "./Components/DeleteContact";
import UpdateConatct from "./Components/UpdateConatct";
import ConfigPage from "./Components/ConfigPage";

function App() {
  const [selectedFields, setSelectedFields] = useState([]);

  const handleFieldSelection = (fields) => {
    setSelectedFields(fields);
  };

  return (
    <Router>
      <div>
        <Header />
        <hr />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/add"
            element={<AddContact selectedFields={selectedFields} />}
          />
          <Route
            path="/get"
            element={<GetContactList selectedFields={selectedFields} />}
          />
          <Route
            path="/delete"
            element={<DeleteContact selectedFields={selectedFields} />}
          />
          <Route path="/update" element={<UpdateConatct />} />
          <Route
            path="/configpage"
            element={<ConfigPage onSelectFields={handleFieldSelection} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="d-flex flex-column">
        <div className="row mb-3">
          <div className="col">
            <Link to="/add">
              <button className="btn btn-primary btn-lg btn-block">
                Add Contact
              </button>
            </Link>
          </div>
          <div className="col">
            <Link to="/delete">
              <button className="btn btn-primary btn-lg btn-block">
                Delete Contact
              </button>
            </Link>
          </div>
          <div className="col">
            <Link to="/get">
              <button className="btn btn-primary btn-lg btn-block">
                Get Contact List
              </button>
            </Link>
          </div>
          <div className="col">
            <Link to="/update">
              <button className="btn btn-primary btn-lg btn-block">
                Update Contact List
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
