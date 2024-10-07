// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// export default function Signup() {
//   const [credentials, setCredentials] = useState({
//     name: "",
//     email: "",
//     password: "",
//     geolocation: "",
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("http://localhost:5000/api/createuser", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           name: credentials.name,
//           email: credentials.email,
//           password: credentials.password,
//           location: credentials.geolocation,
//         }),
//       });

//       const json = await response.json();
//       console.log(json);

//       if (!json.success) {
//         alert("Enter valid credentials");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   const onChange = (event) => {
//     setCredentials({
//       ...credentials,
//       [event.target.name]: event.target.value,
//     });
//   };

//   return (
//     <div style={styles.signupContainer}>
//       <div style={styles.formContainer}>
//         <form onSubmit={handleSubmit} style={styles.signupForm}>
//           <h2 style={styles.formTitle}>
//             Create an Account{" "}
//             <span role="img" aria-label="sparkles emoji">
//               ✨
//             </span>
//           </h2>
//           <div style={styles.formGroup}>
//             <label htmlFor="exampleInputName">Name</label>
//             <input
//               type="text"
//               id="exampleInputName"
//               className="form-control"
//               placeholder="Enter Name"
//               name="name"
//               value={credentials.name}
//               onChange={onChange}
//               style={styles.inputField}
//             />
//           </div>
//           <div style={styles.formGroup}>
//             <label htmlFor="exampleInputEmail1">Email address</label>
//             <input
//               type="email"
//               className="form-control"
//               id="exampleInputEmail1"
//               aria-describedby="emailHelp"
//               placeholder="Enter email"
//               name="email"
//               value={credentials.email}
//               onChange={onChange}
//               style={styles.inputField}
//             />
//             <small id="emailHelp" className="form-text text-muted">
//               We'll never share your email with anyone else.
//             </small>
//           </div>
//           <div style={styles.formGroup}>
//             <label htmlFor="exampleInputPassword1">Password</label>
//             <input
//               type="password"
//               className="form-control"
//               id="exampleInputPassword1"
//               placeholder="Password"
//               name="password"
//               value={credentials.password}
//               onChange={onChange}
//               style={styles.inputField}
//             />
//           </div>
//           <div style={styles.formGroup}>
//             <label htmlFor="exampleInputAddress">Address</label>
//             <input
//               type="text"
//               className="form-control"
//               id="exampleInputAddress"
//               placeholder="Address"
//               name="geolocation"
//               value={credentials.geolocation}
//               onChange={onChange}
//               style={styles.inputField}
//             />
//           </div>
//           <button type="submit" style={styles.submitButton}>
//             Sign Up
//           </button>
//           <Link to="/login" style={styles.existingUserButton}>
//             Already have an account? Login{" "}
//             <span role="img" aria-label="key emoji">
//               🔑
//             </span>
//           </Link>
//         </form>
//       </div>
//     </div>
//   );
// }

// const styles = {
//   signupContainer: {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     minHeight: "100vh",
//     backgroundImage: `url("https://res.cloudinary.com/djdff8w5b/image/upload/v1720199122/image-for-the-veg-fast-food-web-sign-up-page-background-_kmwwmp.jpg")`,
//     backgroundSize: "cover",
//     backgroundPosition: "center",
//     fontFamily: "Arial, sans-serif",
//   },
//   formContainer: {
//     background: "#181616",
//     padding: "2rem",
//     borderRadius: "8px",
//     boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
//     animation: "fadeIn 1s ease-in-out",
//     width: "400px",
//     maxWidth: "90%",
//   },
//   formTitle: {
//     textAlign: "center",
//     marginBottom: "1rem",
//     fontSize: "2rem",
//     color: "white",
//   },
//   formGroup: {
//     marginBottom: "1.5rem",
//   },
//   inputField: {
//     width: "100%",
//     padding: "0.75rem",
//     border: "1px solid #ddd",
//     borderRadius: "4px",
//     transition: "border-color 0.3s",
//   },
//   submitButton: {
//     width: "100%",
//     padding: "0.75rem",
//     border: "none",
//     borderRadius: "4px",
//     backgroundColor: "#007bff",
//     color: "#fff",
//     fontSize: "1rem",
//     cursor: "pointer",
//     transition: "background 0.3s",
//   },
//   existingUserButton: {
//     display: "block",
//     width: "100%",
//     marginTop: "1rem",
//     padding: "0.75rem",
//     border: "none",
//     borderRadius: "4px",
//     backgroundColor: "#dc3545",
//     color: "#fff",
//     textAlign: "center",
//     fontSize: "1rem",
//     cursor: "pointer",
//     transition: "background 0.3s",
//   },
//   "@keyframes fadeIn": {
//     from: {
//       opacity: 0,
//       transform: "translateY(-20px)",
//     },
//     to: {
//       opacity: 1,
//       transform: "translateY(0)",
//     },
//   },
// };



import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/createuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
          location: credentials.geolocation,
        }),
      });

      const json = await response.json();
      console.log(json);

      if (!json.success) {
        alert("Enter valid credentials");
      } else {
        alert("Account created successfully!");
        resetForm(); // Clear the form after successful signup
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

  const resetForm = () => {
    setCredentials({
      name: "",
      email: "",
      password: "",
      geolocation: "",
    });
  };

  return (
    <div style={styles.signupContainer}>
      <div style={styles.formContainer}>
        <form onSubmit={handleSubmit} style={styles.signupForm}>
          <h2 style={styles.formTitle}>
            Create an Account{" "}
            <span role="img" aria-label="sparkles emoji">
              ✨
            </span>
          </h2>
          <div style={styles.formGroup}>
            <label htmlFor="exampleInputName">Name</label>
            <input
              type="text"
              id="exampleInputName"
              className="form-control"
              placeholder="Enter Name"
              name="name"
              value={credentials.name}
              onChange={onChange}
              style={styles.inputField}
            />
          </div>
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
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
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
          <div style={styles.formGroup}>
            <label htmlFor="exampleInputAddress">Address</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputAddress"
              placeholder="Address"
              name="geolocation"
              value={credentials.geolocation}
              onChange={onChange}
              style={styles.inputField}
            />
          </div>
          <button type="submit" style={styles.submitButton}>
            Sign Up
          </button>
          <Link to="/login" style={styles.existingUserButton}>
            Already have an account? Login{" "}
            <span role="img" aria-label="key emoji">
              🔑
            </span>
          </Link>
        </form>
      </div>
    </div>
  );
}

const styles = {
  signupContainer: {
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
    backgroundColor: "#007bff",
    color: "#fff",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "background 0.3s",
  },
  existingUserButton: {
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
