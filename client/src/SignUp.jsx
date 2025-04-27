import { useState } from "react";
import axios from "axios";
import { USER_API } from "./url";
import { useNavigate } from "react-router-dom";
import "./LoginSignUp.css";
const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${USER_API}/signup`, {
        username,
        password,
      });
      console.log(res.data);
      navigate('/card');
    } catch (err) {
      alert(err.response?.data?.msg || "Signup failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Sign Up</h2>
        <input placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
        <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
        <button onClick={signup}>Sign Up</button>
      </div>
    </div>
  );
};

export default SignUp;
