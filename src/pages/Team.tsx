import { Linkedin, Mail, Award, /* BookOpen*/ } from 'lucide-react';
import { useState, useEffect } from 'react';

const Team = () => {
 interface Member {
  id: number;
  nombre: string;
  apellido: string;
  profesion: string;
  foto: string;
  experiencia: string;
  email: string;
}

  const [ team, setTeam ] = useState<Member[]>([]);

  useEffect (() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/team');
        const data = await res.json();
     
        setTeam(data.data);
      } catch(error) {
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
            Nuestro <span className="text-orange-500">Equipo</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
            Profesionales altamente especializados con décadas de experiencia en el ámbito laboral
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Conoce a Nuestros Especialistas
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Un equipo multidisciplinario comprometido con el éxito de tus negociaciones
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <img
                      src={`http://localhost:3000/public/${member.foto}`}

                      alt={member.nombre}
                      className="w-full h-64 md:h-full object-cover"
                    />
                  </div>
                  <div className="md:w-2/3 p-8">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-gray-800 mb-1">
                        {member.nombre}  {member.apellido}
                      </h3>
                      <p className="text-orange-600 font-semibold mb-4">
                        {member.profesion}
                      </p>
                    </div>

                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                      {member.experiencia}
                    </p>

                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                        <Award className="h-4 w-4 text-orange-600 mr-2" />
                        Logros Destacados:
                      </h4>
                      <ul className="space-y-1">
                       
                          <li  className="text-sm text-gray-600 flex items-start">
                            <span className="w-2 h-2 bg-orange-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            Otro
                          </li>
                      </ul>
                    </div>

                    <div className="flex items-center space-x-4">
                      <a
                        href={`mailto:${member.email}`}
                        className="flex items-center text-orange-600 hover:text-orange-700 transition-colors"
                      >
                        <Mail className="h-4 w-4 mr-1" />
                        <span className="text-sm">Contactar</span>
                      </a>
                      <a
                        href="#"
                        className="flex items-center text-gray-600 hover:text-orange-600 transition-colors"
                      >
                        <Linkedin className="h-4 w-4 mr-1" />
                        <span className="text-sm">LinkedIn</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Nuestros Valores
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Los principios que guían nuestro trabajo y compromiso con los trabajadores
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Compromiso Social',
                description: 'Creemos firmemente en la justicia social y el derecho de los trabajadores a una representación digna y efectiva.',
                icon: '🤝'
              },
              {
                title: 'Excelencia Profesional',
                description: 'Mantenemos los más altos estándares de calidad y actualización constante en nuestras áreas de especialización.',
                icon: '⭐'
              },
              {
                title: 'Transparencia',
                description: 'Trabajamos con total transparencia, manteniendo informados a nuestros clientes en cada etapa del proceso.',
                icon: '🔍'
              }
            ].map((value, index) => (
              <div key={index} className="text-center p-8 bg-gray-50 rounded-xl">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20 bg-orange-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Experiencia Colectiva
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">95+</div>
              <div className="text-orange-100">Años de Experiencia Combinada</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">100+</div>
              <div className="text-orange-100">Sindicatos Asesorados</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">15+</div>
              <div className="text-orange-100">Sectores Industriales</div>
            </div>
          </div>
          <p className="text-xl text-orange-100 max-w-3xl mx-auto">
            Nuestro equipo combina décadas de experiencia práctica con formación académica de primer nivel
          </p>
        </div>
      </section>
    </div>
  );
};

export default Team;