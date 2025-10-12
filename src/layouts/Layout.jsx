import { Link, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../App.scss';

function Layout({ carrito, usuario, setUsuario }) {

  const cerrarSesion = () => {
    setUsuario(null);
    toast.info('Sesión cerrada');
  };

  return (
    <div>
      <header>
        <h1>Hot Wheels Store</h1>
        <nav className="navbar">
          <div className="nav-left">
            <Link to="/">Inicio</Link>
            <Link to="/">Productos</Link>
            {usuario ? (
              <div className="usuario-info">
                <span>{usuario.nombre}</span>
                <button className="btn-cerrar" onClick={cerrarSesion}>Cerrar sesión</button>
              </div>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/registro">Registro</Link>
              </>
            )}
          </div>
          <div className="nav-right">
            <Link to="/carrito">Carrito ({carrito.length})</Link>
          </div>
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
