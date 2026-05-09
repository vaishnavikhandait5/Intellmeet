import { useState } from "react";
import axios from "axios";

function App() {

  const [isLogin, setIsLogin] =
    useState(true);

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [confirmPassword,
    setConfirmPassword] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [isError, setIsError] =
    useState(false);

  // Signup
  const handleSignup = async () => {

    // Password match check
    if (password !== confirmPassword) {

      setMessage("Passwords do not match");

      setIsError(true);

      return;
    }

    try {

      const res = await axios.post(

        "http://localhost:5000/signup",

        {
          name,
          email,
          password
        }

      );

      setMessage(res.data.message);

      setIsError(false);

    } catch (error) {

      setMessage("Signup failed");

      setIsError(true);

    }

  };

  // Login
  const handleLogin = async () => {

    try {

      const res = await axios.post(

        "http://localhost:5000/login",

        {
          email,
          password
        }

      );

      setMessage(res.data.message);

      setIsError(false);

    } catch (error) {

      setMessage("Login failed");

      setIsError(true);

    }

  };

  return (

    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#111827"
      }}
    >

      <div
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "12px",
          width: "350px",
          textAlign: "center"
        }}
      >

        <h1>🚀 IntellMeet</h1>

        <h2>
          {isLogin ? "Login" : "Signup"}
        </h2>

        {/* Signup Name */}
        {
          !isLogin && (

            <input
              type="text"
              placeholder="Name"
              onChange={(e) =>
                setName(e.target.value)
              }

              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px"
              }}
            />

          )
        }

        {/* Email */}
        <input
          type="email"
          placeholder="Email"

          onChange={(e) =>
            setEmail(e.target.value)
          }

          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px"
          }}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"

          onChange={(e) =>
            setPassword(e.target.value)
          }

          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px"
          }}
        />

        {/* Confirm Password */}
        {
          !isLogin && (

            <input
              type="password"

              placeholder="Re-enter Password"

              onChange={(e) =>
                setConfirmPassword(
                  e.target.value
                )
              }

              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px"
              }}
            />

          )
        }

        {/* Button */}
        {
          isLogin ? (

            <button
              onClick={handleLogin}

              style={{
                width: "100%",
                padding: "12px",
                background: "#2563eb",
                color: "white",
                border: "none",
                borderRadius: "6px"
              }}
            >
              Login
            </button>

          ) : (

            <button
              onClick={handleSignup}

              style={{
                width: "100%",
                padding: "12px",
                background: "#16a34a",
                color: "white",
                border: "none",
                borderRadius: "6px"
              }}
            >
              Signup
            </button>

          )
        }

        {/* Message */}
        {
          message && (

            <p
              style={{
                marginTop: "15px",
                color: isError
                  ? "red"
                  : "green",
                fontWeight: "bold"
              }}
            >
              {message}
            </p>

          )
        }

        {/* Toggle */}
        <p
          style={{
            marginTop: "20px",
            cursor: "pointer",
            color: "#2563eb"
          }}

          onClick={() => {

            setIsLogin(!isLogin);

            setMessage("");

          }}
        >

          {
            isLogin
            ? "Create account"
            : "Already have account?"
          }

        </p>

      </div>

    </div>

  );
}

export default App;