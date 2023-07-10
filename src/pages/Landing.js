import React from "react";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <div>
      <h3>Landing</h3>

      <Link to="/login">Login</Link>
      <Link to="/register">SIgn Up</Link>
    </div>
  );
}

export default Landing;
