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
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Mensajes</h2>
        <button
          onClick={abrirModal}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
        >
          <FiPlus /> Agregar
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left px-4 py-2">ID</th>
              <th className="text-left px-4 py-2">Contenido</th>
            </tr>
          </thead>
          <tbody>
            {mensajes.map((m) => (
              <tr key={m.id} className="border-t">
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
