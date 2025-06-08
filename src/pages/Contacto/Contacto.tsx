import { useForm } from "react-hook-form";
import { enviarContacto } from "./contacto.service";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import type { ContactoForm } from "./contacto.types";

export const Contacto = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactoForm>();

  const onSubmit = async (data: ContactoForm) => {
    try {
      await enviarContacto(data);
      toast.success("✅ Mensaje enviado correctamente", {
        position: "top-right",
        autoClose: 4000,
      });
      reset();
    } catch (err) {
      toast.error("Error al enviar el mensaje", {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Contacto</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Nombre:</label>
            <input
              className="w-full px-3 py-2 border rounded-xl"
              {...register("nombre", { required: "El nombre es obligatorio" })}
            />
            {errors.nombre && (
              <p className="text-red-500">{errors.nombre.message}</p>
            )}
          </div>

          <div>
            <label className="block font-medium mb-1">
              Correo electrónico:
            </label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded-xl"
              {...register("correo", {
                required: "El correo es obligatorio",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Correo no válido",
                },
              })}
            />
            {errors.correo && (
              <p className="text-red-500">{errors.correo.message}</p>
            )}
          </div>

          <div>
            <label className="block font-medium mb-1">Mensaje:</label>
            <textarea
              className="w-full px-3 py--2 border rounded-xl"
              rows={4}
              {...register("mensaje", {
                required: "El mensaje es obligatorio",
              })}
            ></textarea>
            {errors.mensaje && (
              <p className="text-red-500">{errors.mensaje.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700"
          >
            Enviar
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};
