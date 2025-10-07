import React from 'react';

function Registro() {
  return (
    <main>
      <h2>Registro de Usuario</h2>
      <form>
        <label>Nombre:</label>
        <input type="text" placeholder="Tu nombre" />
        <label>Email:</label>
        <input type="email" placeholder="Tu email" />
        <label>Contraseña:</label>
        <input type="password" placeholder="Contraseña" />
        <button>Registrarse</button>
      </form>
    </main>
  );
}

export default Registro;
