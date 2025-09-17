
import { 
  Scale, 
  Users, 
  TrendingUp, 
  Shield, 
  Calculator,
  FileText,
  BookOpen,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

const Services = () => {
  const mainServices = [
    {
      icon: Scale,
      title: 'Asesoría en Negociaciones Colectivas',
      description: 'Acompañamiento integral durante todo el proceso de negociación colectiva, desde la preparación hasta la firma del convenio.',
      features: [
        'Análisis de posición sindical',
        'Estrategia de negociación',
        'Acompañamiento en mesas de trabajo',
        'Revisión de propuestas',
        'Mediación y arbitraje'
      ],
      image: 'https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      icon: Shield,
      title: 'Asesoría Legal Laboral',
      description: 'Respaldo jurídico especializado en derecho laboral individual y colectivo, con énfasis en derechos sindicales.',
      features: [
        'Interpretación normativa',
        'Defensa en tribunales',
        'Recurso de nulidad',
        'Prácticas antisindicales',
        'Fuero sindical'
      ],
      image: 'https://images.pexels.com/photos/8116943/pexels-photo-8116943.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      icon: TrendingUp,
      title: 'Asesoría Económica',
      description: 'Análisis económico-financiero para fundamentar posiciones salariales y de beneficios en las negociaciones.',
      features: [
        'Análisis financiero empresarial',
        'Estudios de productividad',
        'Benchmarking salarial',
        'Proyecciones económicas',
        'Costos de beneficios'
      ],
      image: 'https://images.pexels.com/photos/590041/pexels-photo-590041.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      icon: Users,
      title: 'Asesoría Mediática y Comunicacional',
      description: 'Estrategias de comunicación para posicionar adecuadamente las demandas sindicales ante la opinión pública.',
      features: [
        'Plan de comunicaciones',
        'Relaciones públicas',
        'Manejo de crisis',
        'Redes sociales',
        'Capacitación mediática'
      ],
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ];

  const additionalServices = [
    {
      icon: Calculator,
      title: 'Asesoría Tributaria',
      description: 'Orientación en aspectos tributarios que afectan tanto a trabajadores como organizaciones sindicales.',
      features: ['Declaración de impuestos', 'Beneficios tributarios', 'Planificación fiscal']
    },
    {
      icon: FileText,
      title: 'Asesoría Financiera',
      description: 'Gestión financiera para sindicatos y planificación económica personal para dirigentes.',
      features: ['Gestión de fondos sindicales', 'Inversiones', 'Presupuestos']
    },
    {
      icon: Shield,
      title: 'Asesoría Preventiva',
      description: 'Prevención de conflictos laborales mediante análisis proactivo y monitoreo continuo.',
      features: ['Auditorías preventivas', 'Monitoreo normativo', 'Alertas tempranas']
    },
    {
      icon: BookOpen,
      title: 'Capacitación Especializada',
      description: 'Programas de formación en temas laborales, sindicales y de negociación para dirigentes.',
      features: ['Talleres de liderazgo', 'Técnicas de negociación', 'Derecho laboral']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Nuestros <span className="text-orange-500">Servicios</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
            Asesoría integral especializada en negociaciones colectivas y derecho laboral
          </p>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Servicios Principales
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Nuestros servicios especializados para el éxito de tus negociaciones colectivas
            </p>
          </div>

          <div className="space-y-16">
            {mainServices.map((service, index) => (
              <div key={index} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}>
                <div className="flex-1">
                  <div className="flex items-center mb-6">
                    <div className="bg-orange-600 p-3 rounded-lg mr-4">
                      <service.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-800">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-lg text-gray-600 mb-6">
                    {service.description}
                  </p>
                  <ul className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-orange-600 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex-1">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="rounded-xl shadow-lg w-full h-80 object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Servicios Complementarios
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Servicios adicionales para una asesoría integral y completa
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {additionalServices.map((service, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  <div className="bg-orange-100 p-3 rounded-lg mr-4">
                    <service.icon className="h-6 w-6 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">
                    {service.title}
                  </h3>
                </div>
                <p className="text-gray-600 mb-4">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm">
                      <ArrowRight className="h-4 w-4 text-orange-600 mr-2 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Nuestro Proceso de Trabajo
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Metodología probada para garantizar el éxito en cada negociación
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Diagnóstico', description: 'Análisis inicial de la situación y objetivos' },
              { step: '02', title: 'Estrategia', description: 'Desarrollo de plan de acción personalizado' },
              { step: '03', title: 'Ejecución', description: 'Implementación y acompañamiento continuo' },
              { step: '04', title: 'Seguimiento', description: 'Monitoreo post-negociación y evaluación' }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-orange-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">{item.step}</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-orange-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            ¿Necesitas Asesoría Especializada?
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Contáctanos para una evaluación inicial gratuita de tu situación
          </p>
          <a
            href="/contacto"
            className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 inline-flex items-center"
          >
            Solicitar Consulta
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </div>
      </section>
    </div>
  );
};

export default Services;