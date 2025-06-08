import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FiLogOut } from "react-icons/fi";

export const Layout = () => {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="flex items-center justify-between bg-white shadow px-6 py-4">
        <div className="flex gap-6 items-center">
          <span className="text-xl font-bold text-gray-800">
            Sistema de Contactos
          </span>
          <Link to="/mensajes" className="text-gray-700 hover:text-blue-600">
            Mensajes
          </Link>
          <Link to="/contacto" className="text-gray-700 hover:text-blue-600">
            Contacto
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-gray-700 font-medium">{usuario?.nombre}</span>
          <button
            onClick={handleLogout}
            className="text-red-600 hover:text-red-800"
            title="Cerrar sesión"
          >
            <FiLogOut size={20} />
          </button>
        </div>
      </nav>

      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
};
