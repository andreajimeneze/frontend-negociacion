import { Link } from 'react-router-dom';
import { fetchApi } from '../services/api.ts';
import { 
  Scale, 
  Users, 
  TrendingUp, 
  Shield, 
  /*BookOpen, */
  ArrowRight,
  CheckCircle,
  Award,
  Target
} from 'lucide-react';
import { useEffect, useState } from 'react';

const Home = () => {
  const services = [
    {
      icon: Scale,
      title: 'Negociaciones Colectivas',
      description: 'Asesoría integral en procesos de negociación colectiva con estrategias probadas.',
      image: 'https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      icon: Shield,
      title: 'Asesoría Legal',
      description: 'Respaldo jurídico especializado en derecho laboral y sindical.',
      image: 'https://images.pexels.com/photos/8116943/pexels-photo-8116943.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      icon: TrendingUp,
      title: 'Asesoría Económica',
      description: 'Análisis financiero y económico para fundamentar posiciones negociadoras.',
      image: 'https://images.pexels.com/photos/590041/pexels-photo-590041.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      icon: Users,
      title: 'Asesoría Mediática',
      description: 'Estrategias de comunicación y manejo de imagen pública.',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600'
    }
  ];
  const [negociacionRealizada, setNegociacionRealizada] = useState(0);
 useEffect(() => {
  const fetchData = async () => {
    try {
      const data = await fetchApi<{ countNegotiations: number }>('/api/negotiations');

      console.log(data);
      setNegociacionRealizada(data.countNegotiations);
    } catch (error) {
      console.error('Error al obtener al equipo', error);
    }
  };

  fetchData();
}, []);


  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-800 to-gray-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=1920)'
          }}
        ></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Asesoría Especializada en
              <span className="text-orange-500 block">Negociaciones Colectivas</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-200">
              Representamos y asesoramos a sindicatos con experiencia, estrategia y resultados comprobados
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/servicios"
                className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center"
              >
                Conoce Nuestros Servicios
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/contacto"
                className="border-2 border-white text-white hover:bg-white hover:text-gray-800 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 inline-flex items-center justify-center"
              >
                Contacta con Nosotros
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-orange-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid">
           
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {negociacionRealizada}
                </div>
                <div className="text-orange-100 font-medium">
                  Negociaciones Exitosas
                </div>
              </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Nuestros Servicios Especializados
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ofrecemos asesoría integral en todas las áreas críticas para el éxito 
              de las negociaciones colectivas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-48">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <service.icon className="h-16 w-16 text-white" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {service.description}
                  </p>
                  <Link
                    to="/servicios"
                    className="text-orange-600 font-semibold hover:text-orange-700 inline-flex items-center"
                  >
                    Saber más
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                ¿Por Qué Elegirnos?
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-orange-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      Experiencia Comprobada
                    </h3>
                    <p className="text-gray-600">
                      Más de 15 años asesorando exitosamente a sindicatos en negociaciones complejas.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Award className="h-6 w-6 text-orange-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      Equipo Multidisciplinario
                    </h3>
                    <p className="text-gray-600">
                      Profesionales especializados en derecho laboral, economía y comunicaciones.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Target className="h-6 w-6 text-orange-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      Resultados Medibles
                    </h3>
                    <p className="text-gray-600">
                      95% de tasa de éxito en negociaciones con mejoras sustantivas para los trabajadores.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Equipo de trabajo"
                className="rounded-xl shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-orange-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            ¿Listo para Fortalecer tu Posición Negociadora?
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Contáctanos para una consulta inicial gratuita y descubre cómo podemos ayudarte
          </p>
          <Link
            to="/contacto"
            className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 inline-flex items-center"
          >
            Solicitar Consulta Gratuita
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;