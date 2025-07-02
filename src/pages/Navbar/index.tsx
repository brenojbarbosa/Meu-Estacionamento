import { Link } from "react-router-dom"



function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Meu Estacionamento 🚗 </a>
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                        <Link className="nav-link" arian-current="page" to="/">Home</Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to="CadastrarClientes">Cadastrar Clientes</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="CadastrarVeiculos">Cadastrar Veículos</Link>
                    </li>
                </ul>

            </div>

        </nav>

    )

}

export default Navbar