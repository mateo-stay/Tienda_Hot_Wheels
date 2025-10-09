import { Link, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';

function Layout({ carrito, usuario, setUsuario }) {

  const cerrarSesion = () => {
    setUsuario(null);
    toast.info('👋 Sesión cerrada');
  };

  return (
    <div>
      <header>
        <h1>Hot Wheels Store</h1>
        <nav>
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/">Productos</Link></li>
            <li><Link to="/nosotros">Nosotros</Link></li>
            <li><Link to="/blogs">Blogs</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
            <li><Link to="/carrito">Carrito ({carrito.length})</Link></li>

            {usuario ? (
              <li className="usuario-info">
                <span>🌟 {usuario.nombre}</span>
                <button className="btn-cerrar" onClick={cerrarSesion}>Cerrar sesión</button>
              </li>
            ) : (
              <>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/registro">Registro</Link></li>
              </>
            )}
          </ul>
        </nav>
      </header>

      <Outlet />

      <footer>
        <p>&copy; 2025 Hot Wheels Store - Proyecto DuocUC</p>
      </footer>
    </div>
  );
}

export default Layout;
