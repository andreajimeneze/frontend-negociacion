import { useEffect, useRef, useState } from "react";

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
    testimonio: string
}

const ClientsTable = () => {
    const [clients, setClients] = useState<Cliente[]>([]);
    const [nuevoCliente, setNuevoCliente] = useState({
        nombre: '',
        actividad_economica: '',
        direccion: '',
        locality: '',
        telefono: '',
        email: '',
        numeroMiembros: 0,
        testimonio: ''
    });

    const [logo, setLogo] = useState<File | null>(null);
    const [editId, setEditId] = useState<number | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/clients');
                const data = await res.json()

                setClients(data.rows);
            } catch (error) {
                console.error(error);
            }
        }
        fetchClients();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNuevoCliente(prev => ({ ...prev, [name]: value }));
    };

    const agregarNuevoCliente = async () => {

        const formData = new FormData();

        formData.append('nombre', nuevoCliente.nombre);
        formData.append('actividad_economica', nuevoCliente.actividad_economica);
        formData.append('direccion', nuevoCliente.direccion);
        formData.append('locality', nuevoCliente.locality);
        formData.append('telefono', nuevoCliente.telefono);
        formData.append('email', nuevoCliente.email);
        formData.append('numeroMiembros', String(nuevoCliente.numeroMiembros));
        formData.append('testimonio', nuevoCliente.testimonio);

        if (logo) {
            formData.append('logo', logo)
        }

        try {
            const res = await fetch('http://localhost:3000/api/clients/create', {
                method: 'POST',
                body: formData,
            });

            if (!res.ok) throw new Error('Error al guardar cliente');

            const { data } = await res.json();
            setClients([...clients, data]);

            limpiarFormulario();
        } catch (error) {
            console.error(error);
        }
    };

    const editarCliente = async () => {
        if (!confirm('Está seguro de editar a este cliente?')) return;

        if (!editId) return;

        const formData = new FormData();

        formData.append('nombre', nuevoCliente.nombre);
        formData.append('actividad_economica', nuevoCliente.actividad_economica);
        formData.append('direccion', nuevoCliente.direccion);
        formData.append('locality', nuevoCliente.locality);
        formData.append('telefono', nuevoCliente.telefono);
        formData.append('email', nuevoCliente.email);
        formData.append('numeroMiembros', String(nuevoCliente.numeroMiembros));
        formData.append('testimonio', nuevoCliente.testimonio);

        if (logo) {
            formData.append('logo', logo)
        }

        try {
            const res = await fetch(`http://localhost:3000/api/clients/edit/${editId}`, {
                method: 'PUT',
                body: formData
            })

            if (!res.ok) throw new Error('No se puede editar al cliente');
            const { data } = await res.json();
            setClients(clients.map((cli) => (cli.id === editId ? data : cli)));
            limpiarFormulario();
        } catch (error) {
            console.error(error);
            alert('Error al editar al cliente');
        }
    }

    const eliminarCliente = async (id: number) => {
        if (!confirm('¿Estás seguro de eliminar a este cliente?')) return;

        try {
            const res = await fetch(`http://localhost:3000/api/clients/delete/${id}`, {
                method: 'DELETE'
            })

            if (!res.ok) throw new Error('Error al eliminar al cliente');
            setClients(clients.filter((cli) => cli.id !== id));
        } catch (error) {
            console.error(error);
            alert('Error al eliminar al cliente');
        }
    }

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
            testimonio: cliente.testimonio
        })
        setLogo(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    const limpiarFormulario = () => {
        setNuevoCliente({
            nombre: '',
            actividad_economica: '',
            direccion: '',
            locality: '',
            telefono: '',
            email: '',
            numeroMiembros: 0,
            testimonio: ''
        });
        setLogo(null);
        setEditId(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="p-8 max-w-8xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Gestión de Clientes</h1>

            {/* Formulario para agregar nueva noticia */}
            <div className="border-t pt-4 my-4">
                <h2 className="text-xl font-semibold mb-2 text-gray-700">Nuevo Cliente</h2>
                <div className="space-y-2">
                    <input
                        type="text"
                        name="nombre"
                        value={nuevoCliente.nombre}
                        onChange={handleChange}
                        placeholder="Nombre"
                        className="w-full border p-2 rounded"
                    />
                    <input
                        type="text"
                        name="actividad_economica"
                        value={nuevoCliente.actividad_economica}
                        onChange={handleChange}
                        placeholder="Actividad económica"
                        className="w-full border p-2 rounded"
                    />
                    <input
                        type="email"
                        name="email"
                        value={nuevoCliente.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className="w-full border p-2 rounded"
                    />
                    <input
                        type="text"
                        name="dirección"
                        value={nuevoCliente.direccion}
                        onChange={handleChange}
                        placeholder="Dirección"
                        className="w-full border p-2 rounded"
                    />
                    <input
                        type="text"
                        name="locality"
                        value={nuevoCliente.locality}
                        onChange={handleChange}
                        placeholder="Ciudad"
                        className="w-full border p-2 rounded"
                    />

                    <input
                        type="text"
                        name="telefono"
                        value={nuevoCliente.telefono}
                        onChange={handleChange}
                        placeholder="Teléfono"
                        className="w-full border p-2 rounded"
                    />
                    <input
                        type="number"
                        name="numeroMiembros"
                        value={nuevoCliente.numeroMiembros}
                        onChange={handleChange}
                        placeholder="Número Socios"
                        className="w-full border p-2 rounded"
                    />
                    <textarea
                        name="testimonio"
                        value={nuevoCliente.testimonio}
                        onChange={handleChange}
                        placeholder="Testimonio"
                        rows={4}
                        className="w-full border p-2 rounded"
                    />
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        className="w-full border p-2 rounded"
                        onChange={(e) => setLogo(e.target.files?.[0] || null)}
                    />
                    <div className="text-center space-x-2">
                        <button
                            onClick={editId ? editarCliente : agregarNuevoCliente}
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
                            <th className="py-3 px-4">Actividad económica</th>
                            <th className="py-3 px-4">Dirección</th>
                            <th className="py-3 px-4">Localidad</th>
                            <th className="py-3 px-4">Email</th>
                            <th className="py-3 px-4">Telefono</th>
                            <th className="py-3 px-4">N° Socios</th>
                            <th className="py-3 px-4 w-[250px]">Testimonio</th>
                            <th className="py-3 px-4">Logo Sindicato</th>
                            <th className="py-3 px-4 text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            clients.map((cliente) => (
                                <tr key={cliente.id} className="border-t">
                                    <td className="px-4 py-3">{cliente.nombre}</td>
                                    <td className="px-4 py-3">{cliente.actividad_economica}</td>
                                    <td className="px-4 py-3">{cliente.direccion}</td>
                                    <td className="px-4 py-3">{cliente.locality}</td>
                                    <td className="px-4 py-3">{cliente.email}</td>
                                    <td className="px-4 py-3">{cliente.telefono}</td>
                                    <td className="px-4 py-3">{cliente.numeroMiembros}</td>
                                    <td className="px-4 py-3 w-[250px]">{cliente.testimonio}</td>
                                    <td className="px-4 py-3 w-[200px] "><img src={`http://localhost:3000/public/${cliente.logo}`} /></td>
                                    <td className="px-4 py-3 text-center space-x-2">
                                        <button
                                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                                            onClick={() => cargarFormulario(cliente)}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                                            onClick={() => eliminarCliente(cliente.id)}
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
export default ClientsTable;