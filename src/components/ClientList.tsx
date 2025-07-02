import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export default function ClientList() {
  const queryClient = useQueryClient();

  const { data: clients, isLoading, error } = useQuery({
    queryKey: ["clients"],
    queryFn: async () => {
      const res = await axios.get("http://177.153.58.12:11000/clients");
      return res.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await axios.delete(`http://177.153.58.12:11000/clients/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
  });

  if (isLoading) return <p>Carregando clientes...</p>;
  if (error) return <p>Erro ao carregar clientes.</p>;

  return (
    <div>
      <h5>Lista de Clientes</h5>
      <ul className="list-group">
        {clients?.map((client: any) => (
          <li
            key={client.id}
            className="list-group-item d-flex justify-content-between align-items-start"
          >
            <div>
              <div><strong>Nome:</strong> {client.name}</div>
              <div><strong>Telefone:</strong> {client.phone}</div>
              {client.vehicles?.length > 0 &&
                client.vehicles.map((v: any) => (
                  <div key={v.id}>
                    <strong>Carro:</strong> {v.model} ({v.plate})
                  </div>
                ))}
            </div>
            <button
              className="btn btn-sm btn-danger ms-2"
              onClick={() => deleteMutation.mutate(client.id)}
            >
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
