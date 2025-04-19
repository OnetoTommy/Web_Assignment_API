import React, { useState } from 'react';

const SignUpIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isSignUp, setIsSignUp] = useState(false); // 控制注册与登录的切换
  const [errorMessage, setErrorMessage] = useState(""); 
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // 创建FormData对象来处理表单数据
    const formData = new FormData();
    formData.append("username", username);
    formData.append("pwd", password);
    if (isSignUp) {
      formData.append("email", email); // 如果是注册，需要包含email
    }

    // 根据是登录还是注册，选择合适的URL
    const url = isSignUp
      ? "includes/signup.inc.php"  // 发送请求到signup.inc.php
      : "includes/login.inc.php";  // 发送请求到login.inc.php

    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();  // 解析返回的JSON结果

      if (result.status === "success") {
        setSuccessMessage(result.message);  // 显示成功信息
        setErrorMessage("");  // 清除错误信息
      } else {
        setErrorMessage(result.message);  // 显示错误信息
        setSuccessMessage("");  // 清除成功信息
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An error occurred. Please try again.");
      setSuccessMessage("");
    }
  };

  return (
    <div>
      {/* 登录部分 */}
      <div id="login" style={{ display: isSignUp ? "none" : "block" }}>
        <h3>Login</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            name="pwd"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
        {errorMessage && <p>{errorMessage}</p>}
        {successMessage && <p>{successMessage}</p>}
        <button onClick={() => setIsSignUp(true)}>Create Account</button>
      </div>

      {/* 注册部分 */}
      <div id="signup" style={{ display: isSignUp ? "block" : "none" }}>
        <h3>Signup</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            name="pwd"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">Sign Up</button>
        </form>
        {errorMessage && <p>{errorMessage}</p>}
        {successMessage && <p>{successMessage}</p>}
        <button onClick={() => setIsSignUp(false)}>Already have an account? Login</button>
      </div>
    </div>
  );
};

export default SignUpIn;
