"use client";

import { useState } from "react";

export default function BookPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    problem: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    alert("Appointment submitted!");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Book Appointment</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Your Name"
          onChange={handleChange}
        />
        <br /><br />

        <input
          name="phone"
          placeholder="Phone Number"
          onChange={handleChange}
        />
        <br /><br />

        <textarea
          name="problem"
          placeholder="Your Problem"
          onChange={handleChange}
        />
        <br /><br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}