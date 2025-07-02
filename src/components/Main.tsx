import { useState } from "react";
import ClientList from "./ClientList";
import VehicleList from "./VehicleList";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function Main() {
    const [activeTab, setActiveTab] = useState("clients");

    return (
        <main className="container my-5 p-4 rounded shadow bg-light">
            <div className="text-center mb-4">
                <h2 className="fw-bold">
                    <i className="bi bi-gear-fill me-2 text-primary"></i>
                    Sistema de Gestão
                </h2>
                <p className="text-muted">
                    Acompanhe os <strong>clientes</strong> e <strong>veículos</strong> cadastrados no sistema.
                </p>
            </div>

            <ul className="nav nav-tabs mb-3 justify-content-center">
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === "clients" ? "active" : ""}`}
                        onClick={() => setActiveTab("clients")}
                    >
                        <i className="bi bi-people-fill me-1"></i>
                        Clientes <span className="badge bg-secondary ms-1"></span>
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === "vehicles" ? "active" : ""}`}
                        onClick={() => setActiveTab("vehicles")}
                    >
                        <i className="bi bi-truck-front-fill me-1"></i>
                        Veículos <span className="badge bg-secondary ms-1"></span>
                    </button>
                </li>
            </ul>

            <hr className="mb-4" />

            <div className="card shadow-sm border-0">
                <div className="card-body">
                    {activeTab === "clients" ? <ClientList /> : <VehicleList />}
                </div>
            </div>
        </main>
    );
}
