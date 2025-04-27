import { useState } from "react";
import axios from "axios";
import { USER_API } from "./url.js";
import { Link, useNavigate } from "react-router-dom";
import "./LoginSignUp.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${USER_API}/login`, {
        username,
        password,
      });
      localStorage.setItem("token", res.data.token);

      await axios.post(`${USER_API}/initcards`, {}, {
        headers: {
          Authorization: `Bearer ${res.data.token}`,
        }
      });
      navigate('/card');
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>
        <input placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
        <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
        <button onClick={login}>Login</button>
        <Link to="/signup">New to SM2? Sign Up</Link>
      </div>
    </div>
  );
};

export default Login;
