import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Producto from './components/Producto';
import Carrito from './components/Carrito';
import Registro from './components/Registro';
import Login from './components/Login';
import Nosotros from './components/Nosotros';
import Blogs from './components/Blogs';
import Contacto from './components/Contacto';
import './index.css';

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
    setCarrito([...carrito, { nombre, precio }]);
  };

  const Inicio = () => (
    <main>
      <section id="bienvenida">
        <h2>Bienvenido a la Tienda Oficial Hot Wheels</h2>
      </section>

      <section id="productos">
        <h2>Modelos Destacados</h2>
        <div className="productos-container">
          {productos.map((p, i) => (
            <Producto
              key={i}
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
    <div>
      <header>
        <h1>Hot Wheels Store</h1>
        <nav>
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/">Productos</Link></li>
            <li><Link to="/registro">Registro</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/nosotros">Nosotros</Link></li>
            <li><Link to="/blogs">Blogs</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
            <li><Link to="/carrito">Carrito ({carrito.length})</Link></li>
          </ul>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/carrito" element={<CarritoPage />} />
      </Routes>

      <footer>
        <p>&copy; 2025 Hot Wheels Store - Proyecto DuocUC</p>
      </footer>
    </div>
  );
}

export default App;