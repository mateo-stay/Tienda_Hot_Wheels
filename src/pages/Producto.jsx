import React from 'react';

function Producto({ nombre, imagen, precio, agregar }) {
  const precioFormateado = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0,
  }).format(precio);

  return (
    <div className="card">
      <img src={imagen} alt={nombre} />
      <h3>{nombre}</h3>
      <p className="precio">{precioFormateado}</p>
      <button onClick={() => agregar(nombre, precio)}>Añadir al carrito</button>
    </div>
  );
}

export default Producto;
