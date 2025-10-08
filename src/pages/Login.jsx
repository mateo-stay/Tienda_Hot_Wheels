import React from 'react';

function Login() {
  return (
    <main>
      <h2>Iniciar Sesión</h2>
      <form>
        <label>Email:</label>
        <input type="email" placeholder="Tu email" />
        <label>Contraseña:</label>
        <input type="password" placeholder="Contraseña" />
        <button>Ingresar</button>
      </form>
    </main>
  );
}

export default Login;