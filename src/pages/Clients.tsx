import { useState, useEffect } from 'react';

const Clients = () => {
  interface Client {
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

  const [clients, setClients] = useState<Client[]>([]);
  const [countClients, setCountClients] = useState<number>(0);
  const [totalMiembros, setTotalMiembros] = useState<number>(0);

  const [negociacionRealizada, setNegociacionRealizada] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/negotiations');
        const data = await res.json();

        console.log(data);
        setNegociacionRealizada(data.countNegotiations);
      }catch (error) {
        console.error('Error al obtener al equipo', error);
      }
    }
    fetchData();
  },[]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/clients');
        const data = await res.json();


        setClients(data.rows);
        setCountClients(data.count);
        setTotalMiembros(data.totalMiembros);

      } catch (error) {
        console.error('Error al obtener al equipo', error);
      }
    }
    fetchData();
  }, []);



  return (

    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Nuestros <span className="text-orange-500">Clientes</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
            Casos de éxito y testimonios de sindicatos que han confiado en nuestra asesoría
          </p>
        </div>
      </section>

      {/* Estadísticas */}
      <section className="py-16 bg-orange-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-center">
        
            <div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">{negociacionRealizada}</div>
              <div className="text-orange-100">Negociaciones Exitosas</div>
            </div>
         
            <div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">{countClients}</div>
              <div className="text-orange-100">Clientes Atendidos</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">{totalMiembros}</div>
              <div className="text-orange-100">Trabajadores Beneficiados</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Testimonios de Nuestros Clientes
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Lo que dicen los sindicatos que han trabajado con nosotros
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {clients.map((client, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  <img
                    className="w-20 h-20 rounded-full object-cover mr-4"
                    src={`/public/${client.logo}`}
                    alt={client.nombre}
                  />
                  <div className='grid-cols-2 md:grid-cols-2 lg:grid-cols-1'>
                     <div className='mb-4'>
                    <h3 className="font-semibold text-gray-800">{client.nombre}</h3>
                    <p className="text-sm text-gray-600">{client.actividad_economica}</p>
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-600"><em className='italic'>"{client.testimonio}"</em></h4>
                  </div>
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>
      </section>
    </div>
  );
};

export default Clients;