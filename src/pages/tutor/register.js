import React, { useState } from "react";
import axios from "axios";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send the form data to the server using Axios POST request
      await axios.post("http://localhost:8000/videocontent", formData);
      // Handle success or show a success message to the user
      console.log("Form data submitted successfully!");
    } catch (error) {
      // Handle error or show an error message to the user
      console.error("Error sending data:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </label>
      <br />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;
