import React from 'react';

function Contacto() {
  return (
    <main>
      <h2>Contacto</h2>
      <form>
        <label>Nombre:</label>
        <input type="text" placeholder="Tu nombre" />
        <label>Email:</label>
        <input type="email" placeholder="Tu email" />
        <label>Mensaje:</label>
        <textarea placeholder="Escribe tu mensaje"></textarea>
        <button>Enviar</button>
      </form>
    </main>
  );
}

export default Contacto;