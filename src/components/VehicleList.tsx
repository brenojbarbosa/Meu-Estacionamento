import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function VehicleList() {
  const { data: vehicles } = useQuery({
    queryKey: ["vehicles"],
    queryFn: async () => {
      const res = await axios.get("http://177.153.58.12:11000/vehicles");
      return res.data;
    },
  });

  return (
    <div>
      <h5>Lista de Veículos</h5>
      <ul className="list-group">
        {vehicles?.map((vehicle: any) => (
          <li key={vehicle.id} className="list-group-item">
            {vehicle.model} - {vehicle.plate}
          </li>
        ))}
      </ul>
    </div>
  );
}
