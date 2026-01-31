import { useState, useEffect, useRef } from "react";
import { fetchApi } from "../services/api";

interface Equipo {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  profesion: string;
  experiencia: string;
  foto: string;
  estado: string;
}

const MembersTable = () => {
  const [equipo, setEquipo] = useState<Equipo[]>([]);
  const [miembro, setMiembro] = useState({
    nombre: '',
    apellido: '',
    email: '',
    profesion: '',
    experiencia: '',
    estado: ''
  });
  const [foto, setFoto] = useState<File | null>(null);
  const [editId, setEditId] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // =========================
  // OBTENER EQUIPO
  // =========================
  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const data = await fetchApi<Equipo[]>('/api/team');
        setEquipo(data);
      } catch (error) {
        console.error('Error al obtener equipo', error);
      }
    };
    fetchTeam();
  }, []);

  // =========================
  // AGREGAR MIEMBRO
  // =========================
  const agregarMiembro = async () => {
    const formData = new FormData();

    Object.entries(miembro).forEach(([key, value]) =>
      formData.append(key, value)
    );

    if (foto) formData.append('foto', foto);

    try {
      const response = await fetchApi<{ data: Equipo }>('/api/team', {
        method: 'POST',
        body: formData
      });

      setEquipo(prev => [...prev, response.data]);
      limpiarFormulario();

      alert(`${response.data.nombre} ${response.data.apellido} agregado correctamente`);
    } catch (error) {
      console.error(error);
      alert('Error al guardar al miembro del equipo');
    }
  };

  // =========================
  // EDITAR MIEMBRO
  // =========================
  const editarMiembro = async () => {
    if (!editId) return;

    const formData = new FormData();
    Object.entries(miembro).forEach(([key, value]) =>
      formData.append(key, value)
    );
    if (foto) formData.append('foto', foto);

    try {
      const response = await fetchApi<{ data: Equipo }>(
        `/api/team/${editId}`,
        { method: 'PUT', body: formData }
      );

      setEquipo(equipo.map(e => e.id === editId ? response.data : e));
      limpiarFormulario();
    } catch (error) {
      console.error(error);
      alert('Error al editar miembro');
    }
  };


  const eliminarMiembro = async (id: number) => {
    if (!confirm('¿Eliminar miembro?')) return;

    try {
      await fetchApi(`/api/team/${id}`, { method: 'DELETE' });
      setEquipo(equipo.filter(m => m.id !== id));
    } catch (error) {
      console.error(error);
      alert('Error al eliminar miembro');
    }
  };

  const cargarFormulario = (m: Equipo) => {
    setEditId(m.id);
    setMiembro({
      nombre: m.nombre,
      apellido: m.apellido,
      email: m.email,
      profesion: m.profesion,
      experiencia: m.experiencia,
      estado: m.estado
    });
    setFoto(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const limpiarFormulario = () => {
    setMiembro({
      nombre: '',
      apellido: '',
      email: '',
      profesion: '',
      experiencia: '',
      estado: ''
    });
    setFoto(null);
    setEditId(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div>
      {/* FORM + TABLA (igual a la tuya) */}
      <table>
        <tbody>
          {equipo.map(m => (
            <tr key={m.id}>
              <td>{m.nombre}</td>
              <td>{m.apellido}</td>
              <td>
                <img src={`/${m.foto}`} alt={m.nombre} width={80} />
              </td>
              <td>
                <button onClick={() => cargarFormulario(m)}>Editar</button>
                <button onClick={() => eliminarMiembro(m.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={editId ? editarMiembro : agregarMiembro}>
        {editId ? 'Editar' : 'Agregar'}
      </button>
    </div>
  );
};

export default MembersTable;
