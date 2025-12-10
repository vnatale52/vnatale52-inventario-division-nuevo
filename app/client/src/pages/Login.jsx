import axios from "axios";
import LoginForm from "../components/LoginForm.jsx";

export default function Login() {
  async function handleLogin({ username, password }) {
    try {
      const r = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        { username, password }
      );

      localStorage.setItem("token", r.data.token);

      // Navega al inventario
      window.location.href = "/inventory";
    } catch (err) {
      alert("Usuario o contraseña incorrectos.");
    }
  }

  return <LoginForm onSubmit={handleLogin} />;
}
