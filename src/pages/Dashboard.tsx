
import { Link } from "react-router-dom";

const Dashboard = () => {
    return (
        <div className="">
            <div className="grid grid-cols-1 justify-center gap-6 my-20 text-center">
                <h2 className="text-3xl font-bold">Panel de Edición de Contenido</h2>
            </div>
        <div className="flex justify-center gap-6 my-20 text-center text-xl">
            <Link to="/dashboard-noticias">
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-3 rounded ">
                    Gestión de Noticias
                </button>
            </Link>

            <Link to="/dashboard-clientes">
                <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-3 rounded">
                    Gestión de Clientes
                </button>
            </Link>

            <Link to="/dashboard-equipo">
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded">
                    Gestión de Profesionales
                </button>
            </Link>
        </div>
</div>

    );
}

export default Dashboard;