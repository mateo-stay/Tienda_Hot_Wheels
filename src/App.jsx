import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Páginas
import Producto from './pages/Producto';
import Carrito from './pages/Carrito';
import Registro from './pages/Registro';
import Login from './pages/Login';

// Layout
import Layout from './layouts/Layout';

function App() {
  const productos = [
    { nombre: "Nissan Skyline R32", imagen: "/img/skyline.jpg", precio: 6000 },
    { nombre: "Toyota Supra Mk4", imagen: "/img/toyota.jpg", precio: 7000 },
    { nombre: "Porsche 911 GT3", imagen: "/img/porche.png", precio: 4000 },
    { nombre: "Subaru BRZ", imagen: "/img/subaru_brz.jpg", precio: 7000 },
    { nombre: "Subaru Impreza WRX STI", imagen: "/img/subaru.jpg", precio: 10000 },
    { nombre: "Audi Quattro", imagen: "/img/quattro.jpg", precio: 7000 },
    { nombre: "Toyota GR86", imagen: "/img/toyota_gr86.jpg", precio: 4000 },
    { nombre: "Mazda 787B", imagen: "/img/mazda_787b.jpg", precio: 7000 },
  ];

  // Carrito persistente
  const [carrito, setCarrito] = useState(() => {
    return JSON.parse(localStorage.getItem('carrito')) || [];
  });

  //  Usuario logueado persistente
  const [usuario, setUsuario] = useState(() => {
    return JSON.parse(localStorage.getItem('usuario')) || null;
  });

  // Sincronizar carrito con localStorage
  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  // Sincronizar usuario con localStorage
  useEffect(() => {
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }, [usuario]);

  const agregarAlCarrito = (nombre, precio) => {
    setCarrito([...carrito, { id: Date.now(), nombre, precio }]);
    toast.success(`${nombre} agregado al carrito`);
  };

  const Inicio = () => (
    <main>
      <section id="bienvenida">
        <h2>Bienvenido a la Tienda Oficial Hot Wheels</h2>
        {usuario && <p>{usuario.nombre}</p>}
      </section>
      <section id="productos">
        <h2>Modelos Destacados</h2>
        <div className="productos-container">
          {productos.map((p) => (
            <Producto
              key={p.nombre}
              nombre={p.nombre}
              imagen={p.imagen}
              precio={p.precio}
              agregar={agregarAlCarrito}
            />
          ))}
        </div>
      </section>
    </main>
  );

  const CarritoPage = () => <Carrito carrito={carrito} setCarrito={setCarrito} />;

  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={<Layout carrito={carrito} usuario={usuario} setUsuario={setUsuario} />}
        >
          <Route path="/" element={<Inicio />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/login" element={<Login setUsuario={setUsuario} />} />
          <Route path="/carrito" element={<CarritoPage />} />
        </Route>
      </Routes>

      {/* Contenedor global de toasts */}
      <ToastContainer position="top-center" autoClose={2000} />
    </BrowserRouter>
  );
}

export default App;