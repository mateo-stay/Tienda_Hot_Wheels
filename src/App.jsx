import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.scss';

// Páginas
import Producto from './pages/Producto';
import Carrito from './pages/Carrito';
import Registro from './pages/Registro';
import Login from './pages/Login';
import Nosotros from './pages/Nosotros';
import Blogs from './pages/Blogs';
import Contacto from './pages/Contacto';

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

  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (nombre, precio) => {
    setCarrito([...carrito, { id: Date.now(), nombre, precio }]);
  };

  const Inicio = () => (
    <main>
      <section id="bienvenida">
        <h2>Bienvenido a la Tienda Oficial Hot Wheels</h2>
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

  const CarritoPage = () => (
    <Carrito carrito={carrito} setCarrito={setCarrito} />
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout carrito={carrito} />}>
          <Route path="/" element={<Inicio />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/carrito" element={<CarritoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
