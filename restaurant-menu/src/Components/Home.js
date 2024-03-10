import React, { useState } from "react";

const Home = (props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const filteredMenuList = props.menuList
    .filter((menu) =>
      menu.item.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((menu) =>
      selectedCategory ? menu.categoty === selectedCategory : true
    );

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
  };

  console.log(props);
  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand">GK Restaurant</a>
          <form className="d-flex">
            <input
              type="text"
              className="form-control me-2"
              placeholder="Search items..."
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <button
                  className="nav-link btn "
                  onClick={() => handleCategoryFilter("")}
                >
                  All
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link btn"
                  onClick={() => handleCategoryFilter("Starter")}
                >
                  Starter
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link btn"
                  onClick={() => handleCategoryFilter("Main Course")}
                >
                  Main Course
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link btn"
                  onClick={() => handleCategoryFilter("Snack")}
                >
                  Snack
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="row mb-3">
        {filteredMenuList.map((menu) => (
          <div key={menu.id} className="col-sm-12 col-md-6 col-lg-4 mb-3">
            <div className="card" style={{ width: "100%" }}>
              <img
                className="card-img-top"
                src={menu.imagesrc}
                alt={`Image for ${menu.item}`}
                style={{ height: "180px" }}
              />
              <div className="card-body">
                <h5 className="card-title">{menu.item}</h5>
                <p className="card-text">{menu.description}</p>
                <p>Category: {menu.categoty}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
