import { useState } from "react";

export default function LoginForm({ onSubmit }) {
  const [username, setUser] = useState("");
  const [password, setPass] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      setError("Debes ingresar usuario y contraseña.");
      return;
    }

    setError("");
    onSubmit({ username, password });
  }

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Acceso al Sistema</h2>

        <label style={styles.label}>Usuario</label>
        <input
          style={styles.input}
          value={username}
          onChange={(e) => setUser(e.target.value)}
        />

        <label style={styles.label}>Contraseña</label>
        <input
          type="password"
          style={styles.input}
          value={password}
          onChange={(e) => setPass(e.target.value)}
        />

        {error && <div style={styles.error}>{error}</div>}

        <button style={styles.button} type="submit">
          Entrar
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    width: "100%",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center",
    background: "#f1f1f1",
  },
  form: {
    background: "#fff",
    padding: "30px",
    borderRadius: "8px",
    width: "320px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
  },
  title: {
    textAlign: "center",
  },
  label: {
    marginTop: "10px",
    marginBottom: "5px",
  },
  input: {
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #aaa",
  },
  button: {
    marginTop: "20px",
    padding: "12px",
    backgroundColor: "#0077cc",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  error: {
    color: "red",
    marginTop: "10px",
    fontSize: "14px",
    fontWeight: "bold",
  },
};
