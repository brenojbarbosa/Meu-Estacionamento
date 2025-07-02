import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function ClientList() {
  const { data: clients } = useQuery({
    queryKey: ["clients"],
    queryFn: async () => {
      const res = await axios.get("http://177.153.58.12:11000/clients");
      return res.data;
    },
  });

  return (
    <div>
      <h5>Lista de Clientes</h5>
      <ul className="list-group">
        {clients?.map((client: any) => (
          <li key={client.id} className="list-group-item">
            <strong>{client.name}</strong> - {client.phone}
            {client.vehicles?.length > 0 && (
              <ul className="mt-2">
                {client.vehicles.map((v: any) => (
                  <li key={v.id}>
                    {v.model} ({v.plate})
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
