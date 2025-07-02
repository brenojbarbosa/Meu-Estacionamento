import { Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import ClientList from "./components/ClientList";
import VehicleList from "./components/VehicleList";
import Navbar from "./pages/Navbar";
import VehicleForm from "./components/VehicleForm";
import ClientForm from "./components/ClientForm";
import Main from "./components/Main";


const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/ListaClientes" element={<ClientList />} />
        <Route path="ListaVeiculos" element={<VehicleList />} />
        <Route path="CadastrarVeiculos" element={<VehicleForm />} />
        <Route path="CadastrarClientes" element={<ClientForm />} />
        <Route />
      </Routes>
    </QueryClientProvider>
  );
}
