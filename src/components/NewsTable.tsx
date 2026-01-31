import { useEffect, useRef, useState } from 'react';
import { fetchApi } from "../services/api";

interface Noticia {
  id: number;
  titulo: string;
  resumen: string;
  texto: string;
  fecha_publicacion: string;
  fecha_edicion: string | null;
  url_imagen: string | null;
  slug: string;
}

const NoticiasTable = () => {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [archivoImagen, setArchivoImagen] = useState<File | null>(null);
  const [form, setForm] = useState({
    titulo: '',
    resumen: '',
    texto: '',
  });
  const [editId, setEditId] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // =========================
  // OBTENER NOTICIAS
  // =========================
  useEffect(() => {
    const fetchNoticias = async () => {
      try {
        const data = await fetchApi<Noticia[]>('/api/news');
        setNoticias(data);
      } catch (err) {
        console.error(err);
        setError('No se pudieron cargar las noticias');
      } finally {
        setLoading(false);
      }
    };

    fetchNoticias();
  }, []);

  // =========================
  // AGREGAR NOTICIA
  // =========================
  const agregarNoticia = async () => {
    if (!form.titulo || !form.resumen || !form.texto) {
      alert('Todos los campos son obligatorios');
      return;
    }

    const formData = new FormData();
    formData.append('titulo', form.titulo);
    formData.append('resumen', form.resumen);
    formData.append('texto', form.texto);
    formData.append('slug', form.titulo);
    formData.append('fecha_publicacion', new Date().toISOString());

    if (archivoImagen) {
      formData.append('imagen', archivoImagen);
    }

    try {
      const response = await fetchApi<{ data: Noticia }>('/api/news', {
        method: 'POST',
        body: formData,
      });

      setNoticias(prev => [...prev, response.data]);
      limpiarFormulario();
    } catch (error) {
      console.error(error);
      alert('Error al guardar la noticia');
    }
  };

  // =========================
  // EDITAR NOTICIA
  // =========================
  const editarNoticia = async () => {
    if (!editId) return;

    const formData = new FormData();
    formData.append('titulo', form.titulo);
    formData.append('resumen', form.resumen);
    formData.append('texto', form.texto);
    formData.append('slug', form.titulo);
    formData.append('fecha_edicion', new Date().toISOString());

    if (archivoImagen) {
      formData.append('imagen', archivoImagen);
    }

    try {
      const response = await fetchApi<{ data: Noticia }>(
        `/api/news/${editId}`,
        { method: 'PUT', body: formData }
      );

      setNoticias(noticias.map(n =>
        n.id === editId ? response.data : n
      ));

      limpiarFormulario();
    } catch (error) {
      console.error(error);
      alert('Error al editar la noticia');
    }
  };

  // =========================
  // ELIMINAR NOTICIA
  // =========================
  const eliminarNoticia = async (id: number) => {
    if (!confirm('¿Eliminar esta noticia?')) return;

    try {
      await fetchApi(`/api/news/${id}`, { method: 'DELETE' });
      setNoticias(noticias.filter(n => n.id !== id));
    } catch (error) {
      console.error(error);
      alert('Error al eliminar la noticia');
    }
  };

  const cargarFormulario = (n: Noticia) => {
    setEditId(n.id);
    setForm({
      titulo: n.titulo,
      resumen: n.resumen,
      texto: n.texto
    });
    setArchivoImagen(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const limpiarFormulario = () => {
    setForm({ titulo: '', resumen: '', texto: '' });
    setArchivoImagen(null);
    setEditId(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // =========================
  // RENDER
  // =========================
  return (
    <div className="p-8 max-w-8xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Gestión de Noticias</h1>

      {loading ? (
        <p>Cargando noticias...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <table className="w-full">
          <tbody>
            {noticias.map(n => (
              <tr key={n.id}>
                <td>{n.titulo}</td>
                <td>{n.resumen}</td>
                <td>
                  {n.url_imagen && (
                    <img
                      src={`/${n.url_imagen}`}
                      alt={n.titulo}
                      className="w-28 rounded"
                    />
                  )}
                </td>
                <td>
                  <button onClick={() => cargarFormulario(n)}>Editar</button>
                  <button onClick={() => eliminarNoticia(n.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <button onClick={editId ? editarNoticia : agregarNoticia}>
        {editId ? 'Editar' : 'Agregar'}
      </button>
    </div>
  );
};

export default NoticiasTable;
