import React, { useState, useEffect } from "react";
import Delete from "@mui/icons-material/Delete";
import { useCart, useDispatchCart } from "../components/ContextReducer";
import { Modal, Button, Form, Alert } from "react-bootstrap";

export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    cityName: "",
    orderCompletionDate: "",
  });
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userEmail = localStorage.getItem("userEmail");
      if (userEmail) {
        try {
          const response = await fetch("http://localhost:5000/api/getUserInfo", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: userEmail }),
          });
          if (response.ok) {
            const userData = await response.json();
            if (userData) {
              setFormData({
                firstName: userData.firstName || "",
                lastName: userData.lastName || "",
                cityName: userData.cityName || "",
                orderCompletionDate: "",
              });
            }
          } else {
            console.error("Failed to fetch user info");
          }
        } catch (error) {
          console.error("Error fetching user info:", error);
        }
      }
    };

    fetchUserInfo();
  }, []);

  if (data.length === 0) {
    return (
      <div>
        <div className="m-5 w-100 text-center fs-3">The Cart is Empty!</div>
      </div>
    );
  }

  const handleCheckOut = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setError("Please fill out all required fields.");
      setValidated(true);
      return;
    }
    setValidated(true);

    let userEmail = localStorage.getItem("userEmail");
    let response = await fetch("http://localhost:5000/api/orderData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString(),
        user_info: formData,
      }),
    });
    console.log("Order Response: ", response);
    if (response.status === 200) {
      dispatch({ type: "DROP" });
      setShowModal(false);
    }
  };

  let totalPrice = data.reduce((total, food) => total + food.price, 0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <div className="container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md">
        <table className="table table-hover">
          <thead className="text-success fs-4">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Option</th>
              <th scope="col">Amount</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td>
                  <button type="button" className="btn p-0">
                    <Delete
                      onClick={() => {
                        dispatch({ type: "REMOVE", index: index });
                      }}
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <h1 className="fs-2">Total Price: {totalPrice}/-</h1>
        </div>
        <div>
          <Button
            className="btn bg-success mt-5"
            onClick={() => setShowModal(true)}
          >
            Check Out
          </Button>
        </div>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Checkout Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form noValidate validated={validated} onSubmit={handleCheckOut}>
            <Form.Group className="mb-3" controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter first name"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a first name.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter last name"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a last name.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formCityName">
              <Form.Label>City Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter city name"
                name="cityName"
                value={formData.cityName}
                onChange={handleInputChange}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a city name.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formOrderCompletionDate">
              <Form.Label>Order Completion Date</Form.Label>
              <Form.Control
                required
                type="date"
                name="orderCompletionDate"
                value={formData.orderCompletionDate}
                onChange={handleInputChange}
              />
              <Form.Control.Feedback type="invalid">
                Please provide an order completion date.
              </Form.Control.Feedback>
            </Form.Group>
            <div>
              <h5>Order Summary</h5>
              <ul>
                {data.map((food, index) => (
                  <li key={index}>
                    {food.name} - {food.qty} x {food.size} - ₹{food.price}
                  </li>
                ))}
              </ul>
              <h5>Total Price: {totalPrice}/-</h5>
            </div>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Place Order
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
