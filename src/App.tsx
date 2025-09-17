import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import Team from './pages/Team';
import Clients from './pages/Clients';
import Noticias from './pages/Noticias';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import MembersTable from './components/MembersTable';
import NewsTable from './components/NewsTable';
import ClientsTable from './components/ClientsTable';
import Register from './components/Register';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/servicios" element={<Services />} />
            <Route path="/equipo" element={<Team />} />
            <Route path="/clientes" element={<Clients />} />
            <Route path="/noticias" element={<Noticias />} />
            <Route path="/contacto" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard-equipo" element={<MembersTable />} />
            <Route path="/dashboard-noticias" element={<NewsTable />} />
            <Route path="/dashboard-clientes" element={<ClientsTable />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;