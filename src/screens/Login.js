import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/loginuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      const json = await response.json();

      if (!json.success) {
        alert("Invalid credentials. Please try again.");
      }
      if (json.success) {
        localStorage.setItem("userEmail", credentials.email);
        localStorage.setItem("authToken", json.authToken);
        navigate("/");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const onChange = (event) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div style={styles.loginContainer}>
      <div style={styles.formContainer}>
        <form onSubmit={handleSubmit} style={styles.loginForm}>
          <h2 style={styles.formTitle}>
            Welcome back
          </h2>
          <div style={styles.formGroup}>
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              name="email"
              value={credentials.email}
              onChange={onChange}
              style={styles.inputField}
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              name="password"
              value={credentials.password}
              onChange={onChange}
              style={styles.inputField}
            />
          </div>
          <button type="submit" style={styles.submitButton}>
            Login
          </button>
          <Link to="/createuser" style={styles.newUserButton}>
            New User? Sign up!
          </Link>
        </form>
      </div>
    </div>
  );
}

const styles = {
  loginContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundImage: `url("https://res.cloudinary.com/djdff8w5b/image/upload/v1720199122/image-for-the-veg-fast-food-web-sign-up-page-background-_kmwwmp.jpg")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    fontFamily: "Arial, sans-serif",
  },
  formContainer: {
    background: "#181616",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    animation: "fadeIn 1s ease-in-out",
    width: "400px",
    maxWidth: "90%",
  },
  formTitle: {
    textAlign: "center",
    marginBottom: "1rem",
    fontSize: "2rem",
    color: "white",
  },
  formGroup: {
    marginBottom: "1.5rem",
  },
  inputField: {
    width: "100%",
    padding: "0.75rem",
    border: "1px solid #ddd",
    borderRadius: "4px",
    transition: "border-color 0.3s",
  },
  submitButton: {
    width: "100%",
    padding: "0.75rem",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#28a745",
    color: "#fff",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "background 0.3s",
  },
  newUserButton: {
    display: "block",
    width: "100%",
    marginTop: "1rem",
    padding: "0.75rem",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#dc3545",
    color: "#fff",
    textAlign: "center",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "background 0.3s",
  },
  "@keyframes fadeIn": {
    from: {
      opacity: 0,
      transform: "translateY(-20px)",
    },
    to: {
      opacity: 1,
      transform: "translateY(0)",
    },
  },
};
