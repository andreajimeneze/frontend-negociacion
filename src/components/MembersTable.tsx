import { useState, useEffect, useRef } from "react";
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

    useEffect(() => {
        const fetchTeam = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/team');
                const data = await res.json();
                setEquipo(data.data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchTeam();
    }, [])

    const agregarMiembro = async () => {
        const formData = new FormData();

        formData.append('nombre', miembro.nombre);
        formData.append('apellido', miembro.apellido);
        formData.append('email', miembro.email);
        formData.append('profesion', miembro.profesion);
        formData.append('experiencia', miembro.experiencia);
        formData.append('estado', miembro.estado);

        if (foto) {
            formData.append('foto', foto);
        }

        try {
            const res = await fetch('http://localhost:3000/api/team/create', {
                method: 'POST',
                body: formData
            })

            if (!res.ok) {
                throw new Error('No se pudo agregar un nuevo miembro al equipo');
            }

            const { data } = await res.json();
            setEquipo([...equipo, data]);
            setMiembro({
                nombre: '',
                apellido: '',
                email: '',
                profesion: '',
                experiencia: '',
                estado: ''
            })
            setFoto(null);
            alert(`${miembro.nombre} ${miembro.apellido} ha sido agregado correctamente`);
        } catch (error) {
            console.error(error);
            alert('Error al guardar al miembro del equipo');
        }
    }

    const editarMiembro = async () => {
        if (!confirm('Está seguro que desea editar al miembro del equipo?')) return;

        if (!editId) return;

        const formData = new FormData();
        formData.append('nombre', miembro.nombre);
        formData.append('apellido', miembro.apellido);
        formData.append('email', miembro.email);
        formData.append('profesion', miembro.profesion);
        formData.append('experiencia', miembro.experiencia);
        formData.append('estado', miembro.estado);

        if (foto) {
            formData.append('foto', foto);
        }

        try {
            const res = await fetch(`http://localhost:3000/api/team/edit/${editId}`, {
                method: 'PUT',
                body: formData
            })

            if (!res.ok) {
                throw new Error('Error al eliminar al miembro del equipo');
            }

            const { data } = await res.json();
            setEquipo(equipo.map((e) => (e.id === editId ? data : e)))
            setEditId(null);

            limpiarFormulario();
        } catch (error) {
            console.log(error);
            alert('Error al intentar eliminar');
        }
    };

    const eliminarMiembro = async (id: number) => {
        if (!confirm('Está seguro que desea eliminar al miembro del equipo?')) return;
        try {
            const res = await fetch(`http://localhost:3000/api/team/delete/${id}`, {
                method: 'DELETE'
            })

            if (!res.ok) {
                throw new Error('Error al eliminar al miembro del equipo');
            }

            setEquipo(equipo.filter((member) => member.id !== id));
            alert(`${miembro.nombre} ${miembro.apellido}eliminado correctamente`);
        } catch (error) {
            console.error('Error al eliminar al miembro del equipo', error);
            alert('Error al eliminar al miembro del equipo');
        }

    }
    const cargarFormulario = (miembro: Equipo) => {
        setEditId(miembro.id);
        setMiembro({
            nombre: miembro.nombre,
            apellido: miembro.apellido,
            email: miembro.email,
            profesion: miembro.profesion,
            experiencia: miembro.experiencia,
            estado: miembro.estado
        })
        setFoto(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

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
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="p-8 max-w-8xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Gestión de Equipo Profesional</h1>

            {/* Formulario para agregar nueva noticia */}
            <div className="border-t pt-4 my-4">
                <h2 className="text-xl font-semibold mb-2 text-gray-700">Nuevo Equipo</h2>
                <div className="space-y-2">
                    <input
                        type="text"
                        placeholder="Nombre"
                        value={miembro.nombre}
                        onChange={(e) => setMiembro({ ...miembro, nombre: e.target.value })}
                        className="w-full border p-2 rounded"
                    />
                    <input
                        type="text"
                        placeholder="Apellido"
                        value={miembro.apellido}
                        onChange={(e) => setMiembro({ ...miembro, apellido: e.target.value })}
                        className="w-full border p-2 rounded"
                    />
                    <input
                        type="text"
                        placeholder="Profesión"
                        value={miembro.profesion}
                        onChange={(e) => setMiembro({ ...miembro, profesion: e.target.value })}
                        className="w-full border p-2 rounded"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={miembro.email}
                        onChange={(e) => setMiembro({ ...miembro, email: e.target.value })}
                        className="w-full border p-2 rounded"
                    />
                    <textarea
                        placeholder="Experiencia"
                        value={miembro.experiencia}
                        onChange={(e) => setMiembro({ ...miembro, experiencia: e.target.value })}
                        className="w-full border p-2 rounded"
                        rows={4}
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setFoto(e.target.files?.[0] || null)}
                        className="w-full border p-2 rounded"
                    />
                    <select value={miembro.estado}
                        onChange={(e) => setMiembro({ ...miembro, estado: e.target.value })}>
                        <option>Selecciones un estado</option>
                        <option value='activo'>Activo</option>
                        <option value='inactivo'>Inactivo</option>
                    </select>
               <div className="text-center space-x-2">
                        <button
                            onClick={editId ? editarMiembro : agregarMiembro}
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                        >
                            {editId ? 'Editar Cliente' : 'Agregar Cliente'}
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
            <div>
                <table className="min-w-full bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden mb-6">
                    <thead className="bg-orange-600 text-white text-left">
                        <tr>
                            <th className="py-3 px-4">Nombre</th>
                            <th className="py-3 px-4">Apellido</th>
                            <th className="py-3 px-4">Email</th>
                            <th className="py-3 px-4">Profesión</th>
                            <th className="py-3 px-4 w-[350px]">Experiencia</th>
                            <th className="py-3 px-4 w-[200px] ">Fotografía</th>
                            <th className="py-3 px-4">Estado</th>
                            <th className="py-3 px-4 text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {equipo.map((miembro) => (
                            <tr key={miembro.id} className="border-t">
                                <td className="px-4 py-3">{miembro.nombre}</td>
                                <td className="px-4 py-3">{miembro.apellido}</td>
                                <td className="px-4 py-3">{miembro.email}</td>
                                <td className="px-4 py-3">{miembro.profesion}</td>
                                <td className="px-4 py-3 w-[350px]">{miembro.experiencia}</td>
                                <td className="px-4 py-3 w-[200px] "><img src={`http://localhost:3000/public/${miembro.foto}`} /></td>
                                <td className="px-4 py-3">{miembro.estado}</td>
                                <td className="px-4 py-3 text-center space-x-2">
                                    <button
                                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                                        onClick={() => cargarFormulario(miembro)}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                                        onClick={() => eliminarMiembro(miembro.id)}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>


            </div>
        </div >
    )
}

export default MembersTable;