import { Link } from 'react-router-dom';
import { Scale, Mail, Phone, MapPin, Facebook, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-orange-600 p-2 rounded-lg">
                <Scale className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-lg font-bold">Gesynco</span>
                <p className="text-sm text-orange-400">Asesoría Laboral</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Especialistas en negociaciones colectivas, asesoría legal, económica y mediática 
              para sindicatos. Más de 15 años de experiencia en el ámbito laboral.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Servicios</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/servicios" className="hover:text-orange-500 transition-colors">Negociaciones Colectivas</Link></li>
              <li><Link to="/servicios" className="hover:text-orange-500 transition-colors">Asesoría Legal</Link></li>
              <li><Link to="/servicios" className="hover:text-orange-500 transition-colors">Asesoría Económica</Link></li>
              <li><Link to="/servicios" className="hover:text-orange-500 transition-colors">Asesoría Tributaria</Link></li>
              <li><Link to="/servicios" className="hover:text-orange-500 transition-colors">Capacitación</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-orange-500" />
                <span className="text-sm">contacto@gesynco.cl</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-orange-500" />
                <span className="text-sm">+56 9 3468 1809</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-orange-500" />
                <span className="text-sm">Valparaíso, Chile</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Gesynco. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;