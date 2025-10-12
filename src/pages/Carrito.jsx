import React from 'react';
import { toast } from 'react-toastify';

function Carrito({ carrito, setCarrito }) {

  // Calcular el total
  const total = carrito.reduce((acc, item) => acc + item.precio, 0);

  // Eliminar un producto del carrito
  const eliminarDelCarrito = (id) => {
    const nuevoCarrito = carrito.filter((item) => item.id !== id);
    setCarrito(nuevoCarrito);
    toast.info('Producto eliminado del carrito');
  };

  // Simular compra
  const comprar = () => {
    if (carrito.length === 0) {
      toast.warn('Tu carrito está vacío');
      return;
    }

    setCarrito([]); // Vacía el carrito
    toast.success('¡Compra realizada con éxito! Gracias por tu compra!');
  };

  return (
    <main className="carrito-page">
      <h2>Tu Carrito</h2>

      {carrito.length === 0 ? (
        <p className="vacio">Tu carrito está vacío.</p>
      ) : (
        <>
          <div className="lista-carrito">
            {carrito.map((item) => (
              <div key={item.id} className="item-carrito">
                <span>{item.nombre}</span>
                <span>
                  {new Intl.NumberFormat('es-CL', {
                    style: 'currency',
                    currency: 'CLP',
                    minimumFractionDigits: 0,
                  }).format(item.precio)}
                </span>
                <button
                  className="eliminar-btn"
                  onClick={() => eliminarDelCarrito(item.id)}
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>

          <div className="resumen">
            <h3>
              Total:{' '}
              {new Intl.NumberFormat('es-CL', {
                style: 'currency',
                currency: 'CLP',
                minimumFractionDigits: 0,
              }).format(total)}
            </h3>
            <button className="comprar-btn" onClick={comprar}>
              Comprar
            </button>
          </div>
        </>
      )}
    </main>
  );
}

export default Carrito;
