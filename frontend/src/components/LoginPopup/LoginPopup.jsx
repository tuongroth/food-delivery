import React, { useState, useContext } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";

const LoginPopup = ({ setShowLogin }) => {
  const { setUser, setToken } = useContext(StoreContext); // không dùng url nữa
  const [currState, setCurrState] = useState("Login"); // "Login" hoặc "Sign Up"
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  // handle input change
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    setMessage("");
  };

  // handle submit
  const onSubmit = async (e) => {
    e.preventDefault();

    // validation
    if (!data.email || !data.password || (currState === "Sign Up" && !data.name)) {
      setMessage("Please fill all required fields.");
      return;
    }

    try {
      // request tới backend port 4000 trực tiếp
      const endpoint = currState === "Login" ? "/api/users/login" : "/api/users/register";
      const res = await fetch(`http://localhost:4000${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      console.log("Backend response:", result);

      if (result.success) {
        setUser(result.user);        // lưu user vào context
        setToken(result.token || ""); // lưu token nếu có
        setMessage(`${currState} successful!`);
        setTimeout(() => setShowLogin(false), 1200);
      } else {
        setMessage(result.message || `${currState} failed`);
      }
    } catch (err) {
      console.error(err);
      setMessage("Server error, try again later");
    }
  };

  return (
    <div className="login-popup">
      <div className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="Close" />
        </div>

        <form onSubmit={onSubmit} className="login-popup-form">
          {currState === "Sign Up" && (
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={data.name}
              onChange={onChangeHandler}
              required
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={data.email}
            onChange={onChangeHandler}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={data.password}
            onChange={onChangeHandler}
            required
          />

          {message && (
            <p className={message.toLowerCase().includes("successful") ? "login-success" : "login-error"}>
              {message}
            </p>
          )}

          <button type="submit">{currState === "Sign Up" ? "Create Account" : "Login"}</button>
        </form>

        <div className="login-popup-toggle">
          {currState === "Login" ? (
            <p>
              Don't have an account?{" "}
              <span onClick={() => setCurrState("Sign Up")}>Sign Up</span>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <span onClick={() => setCurrState("Login")}>Login</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPopup;
