import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Toast from "./Toast";

export default function VehicleForm() {
  const [plate, setPlate] = useState("");
  const [model, setModel] = useState("");
  const [clientId, setClientId] = useState("");
  const [toastMsg, setToastMsg] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState<"success" | "danger">("success");

  const queryClient = useQueryClient();

  const { data: clients } = useQuery({
    queryKey: ["clients"],
    queryFn: async () => {
      const res = await axios.get("http://177.153.58.12:11000/clients");
      return res.data;
    },
  });

  const mutation = useMutation({
    mutationFn: async () => {
      await axios.post("http://177.153.58.12:11000/vehicles", {
        plate,
        model,
      });

      const allVehiclesRes = await axios.get("http://177.153.58.12:11000/vehicles");
      const allVehicles = allVehiclesRes.data;

      const createdVehicle = allVehicles.find(
        (v: any) => v.plate === plate && v.model === model
      );

      if (!createdVehicle) {
        throw new Error("Não foi possível localizar o veículo criado.");
      }

      await axios.post("http://177.153.58.12:11000/vehicles/associate", {
        client_id: Number(clientId),
        vehicle_id: createdVehicle.id,
      });

      return createdVehicle;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      setPlate("");
      setModel("");
      setClientId("");
      setToastMsg("Veículo cadastrado e associado com sucesso!");
      setToastType("success");
      setShowToast(true);
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Erro ao cadastrar ou associar veículo.";
      setToastMsg(message);
      setToastType("danger");
      setShowToast(true);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (plate && model && clientId) {
      mutation.mutate();
    } else {
      setToastMsg("Preencha todos os campos.");
      setToastType("danger");
      setShowToast(true);
    }
  };

  return (
    <>
      <form
        className="container vh-100 d-flex justify-content-center align-items-center"
        onSubmit={handleSubmit}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Placa"
              value={plate}
              onChange={(e) => setPlate(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Modelo"
              value={model}
              onChange={(e) => setModel(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <select
              className="form-select form-select-sm"
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
            >
              <option value="">Selecione um cliente</option>
              {clients?.map((client: any) => (
                <option key={client.id} value={client.id}>
                  {client.name}
                </option>
              ))}
            </select>
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-success btn-sm">
              Cadastrar Veículo
            </button>
          </div>
        </div>
      </form>

      {showToast && (
        <Toast
          message={toastMsg}
          type={toastType}
          onClose={() => setShowToast(false)}
        />
      )}
    </>
  );
}
