import React from 'react';

function Carrito({ carrito, setCarrito }) {
  const eliminarProducto = (index) => {
    const nuevoCarrito = carrito.filter((_, i) => i !== index);
    setCarrito(nuevoCarrito);
  };

  const total = carrito.reduce((sum, item) => sum + item.precio, 0);

  return (
    <main>
      <h2>Carrito de Compras</h2>

      {carrito.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <div id="listaCarrito">
          {carrito.map((item, i) => (
            <div key={i} className="item-carrito">
              <span>{item.nombre}</span>
              <span>${item.precio}</span>
              <button onClick={() => eliminarProducto(i)}>Eliminar</button>
            </div>
          ))}
          <p id="totalCarrito">Total: ${total}</p>
        </div>
      )}
    </main>
  );
}

export default Carrito;