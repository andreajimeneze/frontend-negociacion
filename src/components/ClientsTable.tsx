import { useEffect, useRef, useState } from "react";
import { fetchApi } from "../services/api";

interface Cliente {
  id: number;
  nombre: string;
  actividad_economica: string;
  direccion: string;
  locality: string;
  telefono: string;
  email: string;
  logo: string;
  numeroMiembros: number;
  testimonio: string;
}

const API_URL = import.meta.env.VITE_API_URL;

const ClientsTable = () => {
  const [clients, setClients] = useState<Cliente[]>([]);
  const [nuevoCliente, setNuevoCliente] = useState<Omit<Cliente, 'id' | 'logo'>>({
    nombre: '',
    actividad_economica: '',
    direccion: '',
    locality: '',
    telefono: '',
    email: '',
    numeroMiembros: 0,
    testimonio: '',
  });

  const [logo, setLogo] = useState<File | null>(null);
  const [editId, setEditId] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /* ================= FETCH CLIENTS ================= */

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const data = await fetchApi<{ data: { rows: Cliente[] } }>('/api/clients');
        setClients(data.data.rows);
      } catch (error) {
        console.error('Error al cargar clientes', error);
      }
    };
    fetchClients();
  }, []);

  /* ================= HANDLERS ================= */

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNuevoCliente(prev => ({
      ...prev,
      [name]: name === 'numeroMiembros' ? Number(value) : value,
    }));
  };

  const limpiarFormulario = () => {
    setNuevoCliente({
      nombre: '',
      actividad_economica: '',
      direccion: '',
      locality: '',
      telefono: '',
      email: '',
      numeroMiembros: 0,
      testimonio: '',
    });
    setLogo(null);
    setEditId(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const cargarFormulario = (cliente: Cliente) => {
    setEditId(cliente.id);
    setNuevoCliente({
      nombre: cliente.nombre,
      actividad_economica: cliente.actividad_economica,
      direccion: cliente.direccion,
      locality: cliente.locality,
      telefono: cliente.telefono,
      email: cliente.email,
      numeroMiembros: cliente.numeroMiembros,
      testimonio: cliente.testimonio,
    });
    setLogo(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /* ================= CRUD ================= */

  const buildFormData = () => {
    const formData = new FormData();
    Object.entries(nuevoCliente).forEach(([key, value]) =>
      formData.append(key, String(value))
    );
    if (logo) formData.append('logo', logo);
    return formData;
  };

  const agregarNuevoCliente = async () => {
    try {
      const response = await fetchApi<{ data: Cliente }>('/api/clients/create', {
        method: 'POST',
        body: buildFormData(),
      });

      setClients(prev => [...prev, response.data]);
      limpiarFormulario();
    } catch (error) {
      console.error('Error al crear cliente', error);
    }
  };

  const editarCliente = async () => {
    if (!editId || !confirm('¿Está seguro de editar este cliente?')) return;

    try {
      const response = await fetchApi<{ data: Cliente }>(
        `/api/clients/edit/${editId}`,
        {
          method: 'PUT',
          body: buildFormData(),
        }
      );

      setClients(prev =>
        prev.map(cli => (cli.id === editId ? response.data : cli))
      );
      limpiarFormulario();
    } catch (error) {
      console.error('Error al editar cliente', error);
    }
  };

  const eliminarCliente = async (id: number) => {
    if (!confirm('¿Eliminar este cliente?')) return;

    try {
      await fetchApi(`/api/clients/delete/${id}`, { method: 'DELETE' });
      setClients(prev => prev.filter(cli => cli.id !== id));
    } catch (error) {
      console.error('Error al eliminar cliente', error);
    }
  };

  /* ================= RENDER ================= */

  return (
    <div className="p-8 max-w-8xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Gestión de Clientes</h1>

      {/* FORMULARIO */}
      <div className="border-t pt-4 my-4 space-y-2">
        <h2 className="text-xl font-semibold">Nuevo Cliente</h2>

        {[
          ['nombre', 'Nombre'],
          ['actividad_economica', 'Actividad económica'],
          ['email', 'Email'],
          ['direccion', 'Dirección'],
          ['locality', 'Ciudad'],
          ['telefono', 'Teléfono'],
        ].map(([name, placeholder]) => (
          <input
            key={name}
            name={name}
            value={(nuevoCliente as any)[name]}
            onChange={handleChange}
            placeholder={placeholder}
            className="w-full border p-2 rounded"
          />
        ))}

        <input
          type="number"
          name="numeroMiembros"
          value={nuevoCliente.numeroMiembros}
          onChange={handleChange}
          placeholder="Número de socios"
          className="w-full border p-2 rounded"
        />

        <textarea
          name="testimonio"
          value={nuevoCliente.testimonio}
          onChange={handleChange}
          placeholder="Testimonio"
          className="w-full border p-2 rounded"
        />

        <input
          type="file"
          ref={fileInputRef}
          onChange={e => setLogo(e.target.files?.[0] || null)}
        />

        <button
          onClick={editId ? editarCliente : agregarNuevoCliente}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          {editId ? 'Editar Cliente' : 'Agregar Cliente'}
        </button>
      </div>

      {/* TABLA */}
      <table className="min-w-full bg-white border rounded">
        <thead className="bg-orange-600 text-white">
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Logo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clients.map(cliente => (
            <tr key={cliente.id} className="border-t">
              <td>{cliente.nombre}</td>
              <td>{cliente.email}</td>
              <td>
                <img
                  src={`${API_URL}/public/${cliente.logo}`}
                  className="h-12"
                />
              </td>
              <td>
                <button onClick={() => cargarFormulario(cliente)}>Editar</button>
                <button onClick={() => eliminarCliente(cliente.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientsTable;
