import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../services/api";

export default function VehicleList() {
  const queryClient = useQueryClient();

  const { data: vehicles } = useQuery({
    queryKey: ["vehicles"],
    queryFn: async () => {
      const res = await api.get("/vehicles");
      return res.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/vehicles/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
  });

  return (
    <div>
      <h5>Lista de Veículos</h5>
      <ul className="list-group">
        {vehicles?.map((vehicle: any) => (
          <li
            key={vehicle.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {vehicle.model} - {vehicle.plate}
            <button
              className="btn btn-sm btn-danger"
              onClick={() => deleteMutation.mutate(vehicle.id)}
            >
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
