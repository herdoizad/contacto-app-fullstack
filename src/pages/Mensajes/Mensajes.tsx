import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { ModalMensaje } from "./ModalMensajes";
import type { Mensaje } from "./mensajes.types";
import { obtenerMensajes } from "./mensajes.service";

export const Mensajes = () => {
  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [mostrarModal, setMostrarModal] = useState(false);

  const cargarMensajes = async () => {
    try {
      const data = await obtenerMensajes();
      setMensajes(data);
    } catch (error) {
      console.error("Error al obtener los mensajes:", error);
    }
  };

  useEffect(() => {
    cargarMensajes();
  }, []);

  const abrirModal = () => setMostrarModal(true);
  const cerrarModal = () => {
    setMostrarModal(false);
    cargarMensajes(); // refresca la lista después de cerrar el modal
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
          Mensajes
        </h2>
        <button
          onClick={abrirModal}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition"
        >
          <FiPlus className="text-lg" />
          <span className="text-sm sm:text-base">Agregar</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border bg-white border-gray-300 mt-4 rounded-xl shadow">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left px-4 py-2">ID</th>
              <th className="text-left px-4 py-2">Contenido</th>
            </tr>
          </thead>
          <tbody>
            {mensajes.map((m) => (
              <tr key={m.id} className="border-t border-gray-200">
                <td className="px-4 py-2">{m.id}</td>
                <td className="px-4 py-2">{m.contenido}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {mostrarModal && <ModalMensaje onClose={cerrarModal} />}
    </div>
  );
};
