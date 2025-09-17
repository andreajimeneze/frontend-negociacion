import { useEffect, useRef, useState } from 'react';

interface Noticia {
  id: number;
  titulo: string;
  resumen: string;
  fecha_publicacion: string;
  url_imagen: string;
  texto: string;
  fecha_edicion: string;
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


  useEffect(() => {
    fetchNoticias();
  }, []);

  const fetchNoticias = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/news');
      const data = await res.json();
      setNoticias(data);
    } catch (error: unknown) {
      console.error('Error al cargar noticias:', error);
      if (error instanceof Error) {
        setError(`Error: ${error.message}`);
      } else {
        setError('No se pudieron cargar las noticias.');
      }
    } finally {
      setLoading(false);
    }
  };

  const agregarNoticia = async () => {
    if (!form.titulo || !form.resumen || !form.texto) {
      alert('Todos los campos son obligatorios');
      return;
    }

    const formData = new FormData();
    formData.append('title', form.titulo);
    formData.append('resume', form.resumen);
    formData.append('text', form.texto);
    formData.append('slug', form.titulo);
    formData.append('fecha_publicacion', new Date().toISOString());
    formData.append('fecha_edicion', '');
    if (archivoImagen) {
      formData.append('imagen', archivoImagen);
    }

    try {
      const res = await fetch('http://localhost:3000/api/news/create', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw new Error('No se pudo crear la noticia');
      }

      const { data } = await res.json();
      setNoticias([...noticias, data]);

      limpiarFormulario();
    } catch (error) {
      console.error(error);
      alert('Error al guardar la noticia');
    }
  };


  const editarNoticia = async () => {
    if (!confirm('Estás seguro de editar esta noticia?')) return;

    if (!editId) return;

    const formData = new FormData();

    formData.append('titulo', form.titulo);
    formData.append('resumen', form.resumen);
    formData.append('texto', form.texto);
    formData.append('slug', form.titulo);
    formData.append('fecha_publicacion', '');
    formData.append('fecha_edicion', new Date().toISOString());

    if (archivoImagen) {
      formData.append('imagen', archivoImagen);
    }
   
    try {
      const res = await fetch(`http://localhost:3000/api/news/edit/${editId}`, {
        method: 'PUT',
        body: formData
      });

      if (!res.ok) throw new Error('No se puede editar la noticia');
      const { data } = await res.json();
      setNoticias(noticias.map((n) => (n.id === editId ? data : n)));
      limpiarFormulario();
    } catch (error) {
      console.error(error);
      alert('Error al editar la noticia');
    }
  };

  const eliminarNoticia = async (id: number) => {
    if (!confirm('¿Estás seguro de eliminar esta noticia?')) return;

    try {
      const res = await fetch(`http://localhost:3000/api/news/delete/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Error al eliminar');
      setNoticias(noticias.filter((n) => n.id !== id));
    } catch (error) {
      console.error(error);
      alert('Error al eliminar');
    }
  };

  const limpiarFormulario = () => {
    setForm({ titulo: '', resumen: '', texto: '' });
    setArchivoImagen(null);
    setEditId(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const cargarFormulario = (noticia: Noticia) => {
    setEditId(noticia.id);
    setForm({
      titulo: noticia.titulo,
      resumen: noticia.resumen,
      texto: noticia.texto,
    })
    setArchivoImagen(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }


return (
    <div className="p-8 max-w-8xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Gestión de Noticias</h1>

      {/* Formulario */}
      <div className="border-t pt-4 my-4">
        <h2 className="text-xl font-semibold mb-2 text-gray-700">Nueva Noticia</h2>
        <div className="space-y-2">
          <input
            type="text"
            placeholder="Título"
            className="w-full border p-2 rounded"
            value={form.titulo}
            onChange={(e) =>
              setForm({ ...form, titulo: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Resumen"
            className="w-full border p-2 rounded"
            value={form.resumen}
            onChange={(e) =>
              setForm({ ...form, resumen: e.target.value })
            }
          />
          <textarea
            placeholder="Texto completo"
            className="w-full border p-2 rounded"
            rows={4}
            value={form.texto}
            onChange={(e) =>
              setForm({ ...form, texto: e.target.value })
            }
          />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="w-full border p-2 rounded"
            onChange={(e) => setArchivoImagen(e.target.files?.[0] || null)}
          />
          <div className="text-center space-x-2">
            <button
              onClick={editId ? editarNoticia : agregarNoticia}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              {editId ? 'Editar Noticia' : 'Agregar Noticia'}
            </button>
            {editId && (
              <button
                onClick={limpiarFormulario}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancelar
              </button>
            )}
          </div>

        </div>
      </div>

      {loading ? (
        <p className="text-gray-500">Cargando noticias...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden mb-6">
          <thead className="bg-orange-600 text-white text-left">
            <tr>
              <th className="py-3 px-4 w-[200px]">Título</th>
              <th className="py-3 px-4 w-[350px]">Resumen</th>
              <th className="py-3 px-4">Imagen</th>
              <th className="py-3 px-4">Fecha publicación</th>
              <th className="py-3 px-4 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {noticias.map((noticia) => (
              <tr key={noticia.id} className="border-t">
                <td className="px-4 py-3">{noticia.titulo}</td>
                <td className="px-4 py-3">{noticia.resumen}</td>
                <td className="px-4 py-3">
                  {noticia.url_imagen && (
                    <img
                      src={`http://localhost:3000/public/${noticia.url_imagen}`}
                      alt="Noticia"
                      className="max-w-[120px] max-h-[80px] object-cover rounded"
                    />
                  )}
                </td>
                <td className="px-4 py-3">
                  {new Date(noticia.fecha_publicacion).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 text-center space-x-2">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                    onClick={() => cargarFormulario(noticia)}
                  >
                    Editar
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                    onClick={() => eliminarNoticia(noticia.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default NoticiasTable;
