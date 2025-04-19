import React, { useState } from "react";
import "./style.css";

const AuthForm = () => {
  const [showSignUp, setShowSignUp] = useState(false);
  const [formData, setFormData] = useState({
    fName: "",
    lName: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("action", "signUp");
    data.append("fName", formData.fName);
    data.append("lName", formData.lName);
    data.append("email", formData.email);
    data.append("password", formData.password);

    const res = await fetch("http://localhost/shopping_ai/backend/register.php", {
      method: "POST",
      body: data,
    });

    const result = await res.json();
    setMessage(result.message);

    if (result.status === "success") {
      // 清空数据并切换到登录界面
      setFormData({ fName: "", lName: "", email: "", password: "" });
      setShowSignUp(false); // 自动跳转到登录页
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("action", "signIn");
    data.append("email", formData.email);
    data.append("password", formData.password);

    const res = await fetch("http://localhost/shopping_ai/backend/register.php", {
      method: "POST",
      body: data,
      credentials: "include", // 确保跨域时 cookie 被带上
    });

    const text = await res.text();
    console.log("Raw response from PHP:", text);

    try {
      const result = JSON.parse(text); // ✅ 解析 JSON
      setMessage(result.message);
    
      if (result.status === "success") {
        // 成功逻辑
        window.location.href = "http://localhost/shopping_ai/backend/homepage.php";
      }
    } catch (err) {
      console.error("❌ JSON 解析失败:", err.message);
      setMessage("Invalid server response.");
    }

    // const result = await res.json();
    // setMessage(result.message);

    // if (result.status === "success") {
    //   // 登录成功跳转到 homepage.php
    //   window.location.href = "http://localhost/shopping_ai/backend/homepage.php";
    // }
  };

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
      />

      {showSignUp ? (
        <div className="container" id="signup">
          <h1 className="form-title">Register</h1>
          <form onSubmit={handleRegister}>
            <div className="input-group">
              <i className="fas fa-user"></i>
              <input
                type="text"
                name="fName"
                placeholder="First Name"
                required
                value={formData.fName}
                onChange={handleChange}
              />
              <label htmlFor="fName">First Name</label>
            </div>
            <div className="input-group">
              <i className="fas fa-user"></i>
              <input
                type="text"
                name="lName"
                placeholder="Last Name"
                required
                value={formData.lName}
                onChange={handleChange}
              />
              <label htmlFor="lName">Last Name</label>
            </div>
            <div className="input-group">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                value={formData.email}
                onChange={handleChange}
              />
              <label htmlFor="email">Email</label>
            </div>
            <div className="input-group">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                value={formData.password}
                onChange={handleChange}
              />
              <label htmlFor="password">Password</label>
            </div>
            <input type="submit" className="btn" value="Sign Up" />
          </form>
          <p className="or">----------or-----------</p>
          <div className="links">
            <p>Already Have Account ?</p>
            <button onClick={() => setShowSignUp(false)}>Sign In</button>
          </div>
        </div>
      ) : (
        <div className="container" id="signin">
          <h1 className="form-title">Sign In</h1>
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                value={formData.email}
                onChange={handleChange}
              />
              <label htmlFor="email">Email</label>
            </div>
            <div className="input-group">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                value={formData.password}
                onChange={handleChange}
              />
              <label htmlFor="password">Password</label>
            </div>
            <input type="submit" className="btn" value="Sign In" />
          </form>
          <p className="or">----------or-----------</p>
          <div className="links">
            <p>Don't Have Account ?</p>
            <button onClick={() => setShowSignUp(true)}>Sign Up</button>
          </div>
        </div>
      )}

      {/* 提示信息 */}
      {message && (
        <div className="message-box" style={{ textAlign: "center", marginTop: "1rem", color: "crimson" }}>
          {message}
        </div>
      )}
    </>
  );
};

export default AuthForm;
