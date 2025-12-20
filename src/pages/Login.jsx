import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

const Login = () => {
  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 relative">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 border border-gray-300 p-6 rounded shadow w-80 z-10"
      >
        <h2 className="text-xl font-bold mb-4 text-white">Admin Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="w-full bg-red-600 text-white py-2">Login</button>
      </form>
      <img
        src="/thumbnail-anthology.png"
        alt="Logo"
        className="absolute bottom-4 right-4 opacity-80 blur"
      />
    </div>
  );
};

export default Login;
