import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";

export default function Home() {
  const [search, setSearch] = useState(""); // State for search query
  const [foodCat, setFoodCat] = useState([]); // State for food categories
  const [foodItem, setFoodItem] = useState([]); // State for food items

  // Function to load data from API
  const loadData = async () => {
    try {
      let response = await fetch("http://localhost:5000/api/foodData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      response = await response.json();
      setFoodItem(response[0]); // Set food items from API response
      setFoodCat(response[1]); // Set food categories from API response
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    loadData(); // Load data from API when component mounts
  }, []);

  // Function to filter food items based on search query
  const filteredFoodItems = foodItem.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Navbar /> {/* Render Navbar component */}
      {/* Carousel with images and search bar */}
      <div
        id="carouselExampleCaptions"
        className="carousel slide"
        data-bs-ride="carousel"
        style={{ objectFit: "contain !important" }}
      >
        {/* Carousel indicators */}
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        {/* Carousel items */}
        <div className="carousel-inner">
          {/* Carousel item 1 */}
          <div className="carousel-item active">
            <img
              src="https://res.cloudinary.com/djdff8w5b/image/upload/v1719471854/aloo-tikki-burgerburger-with-a-crispy-potato-patty-onions-and-special-sauce-create-this-photo-h_nbob3w.jpg"
              className="d-block w-100"
              alt="Burger"
              style={{ maxHeight: 600 }}
            />
            {/* Search bar inside the carousel caption */}
            <div
              className="carousel-caption d-none d-md-block"
              style={{ color: "white" }}
            >
              <input
                type="text"
                className="form-control"
                placeholder="Search for food..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          {/* Carousel item 2 */}
          <div className="carousel-item">
            <img
              src="https://res.cloudinary.com/djdff8w5b/image/upload/v1719472018/veg-manchurianfried-vegetable-balls-in-a-spicy-flavorful-gravy-perfect-for-indo-chinese-dish-cr_aykzrg.jpg"
              className="d-block w-100"
              alt="Veg Manchurian"
              style={{ maxHeight: 600 }}
            />
            {/* Search bar inside the carousel caption */}
            <div
              className="carousel-caption d-none d-md-block"
              style={{ color: "white" }}
            >
              <input
                type="text"
                className="form-control"
                placeholder="Search for food..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          {/* Carousel item 3 */}
          <div className="carousel-item">
            <img
              src="https://res.cloudinary.com/djdff8w5b/image/upload/v1719472018/vegetarian-supreme-pizzaloaded-with-assorted-vegetables-like-bell-peppers-olives-and-mushrooms-_r7ml1z.jpg"
              className="d-block w-100"
              alt="Pizza"
              style={{ maxHeight: 600 }}
            />
            {/* Search bar inside the carousel caption */}
            <div
              className="carousel-caption d-none d-md-block"
              style={{ color: "white" }}
            >
              <input
                type="text"
                className="form-control"
                placeholder="Search for food..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>
        {/* Carousel control buttons */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      {/* Container to display food categories and filtered food items */}
      <div className="container">
        {/* Render food categories and filtered food items */}
        {foodCat.length > 0
          ? foodCat.map((data) => {
              return (
                <div key={data._id} className="row mb-3">
                  <div className="fs-3 m-3"> {data.CategoryName}</div>
                  <hr />
                  {/* Display filtered food items based on category */}
                  {filteredFoodItems.length > 0 ? (
                    filteredFoodItems
                      .filter((item) => item.CategoryName === data.CategoryName)
                      .map((filterItems) => {
                        return (
                          <div
                            key={filterItems._id}
                            className="col-12 col-mb-6 col-lg-3"
                          >
                            {/* Render Card component for each filtered item */}
                            <Card
                              foodItem={filterItems}
                              options={filterItems.options[0]}
                            ></Card>
                          </div>
                        );
                      })
                  ) : (
                    <div>No Data Found</div>
                  )}
                </div>
              );
            })
          : ""}
      </div>
      <Footer /> {/* Render Footer component */}
    </div>
  );
}
