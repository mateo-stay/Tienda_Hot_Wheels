import React from 'react';

function Producto({ nombre, imagen, precio, agregar }) {
  return (
    <div className="card">
      <img src={imagen} alt={nombre} />
      <h3>{nombre}</h3>
      <p className="precio">${precio}</p>
      <button onClick={() => agregar(nombre, precio)}>Añadir al carrito</button>
    </div>
  );
}

export default Producto;
