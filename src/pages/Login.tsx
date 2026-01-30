import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { fetchApi } from '../services/api.ts';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  try {
    const data = await fetchApi<{
      token: string;
      user: any;
      message?: string;
    }>('/api/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    // guardar usuario
    localStorage.setItem('user', JSON.stringify(data.user));
    localStorage.setItem('token', data.token);

    console.log('Usuario guardado en localStorage', data.user);

    alert(data.message || 'Login exitoso');
    navigate('/dashboard');

  } catch (error: any) {
    alert(error.message || 'Login fallido');
    console.error(error);
  }
};


    return (
        <section className="flex items-center justify-center min-h-screen bg-gray-100 py-12 px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
                <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center">INICIO DE SESIÓN</h1>
                <h2 className="text-sm text-gray-600 mb-6 text-center">Por favor ingresa tus datos</h2>
                <form onSubmit={handleLogin} autoComplete="off" className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            E-mail
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                        />
                    </div>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="remember"
                            checked={remember}
                            onChange={() => setRemember(!remember)}
                            className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                        />
                        <label htmlFor="remember" className="ml-2 block text-sm text-gray-600">
                            Recordar usuario
                        </label>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-orange-600 text-white font-semibold rounded-md hover:bg-orange-700 transition duration-300"
                    >
                        INGRESAR
                    </button>
                    <p className="text-sm text-center text-gray-600 mt-4">
                        ¿No tienes una cuenta?{" "}
                        <Link to="/register" className="text-orange-600 hover:underline">
                            ¡Regístrate!
                        </Link>
                    </p>
                </form>
            </div>
        </section>
    );
}