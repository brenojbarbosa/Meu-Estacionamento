import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Toast from "./Toast";

export default function ClientForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [toastMsg, setToastMsg] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState<"success" | "danger">("success");

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post("http://177.153.58.12:11000/clients", {
        name,
        phone,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
      setName("");
      setPhone("");
      setToastMsg("Cliente cadastrado com sucesso!");
      setToastType("success");
      setShowToast(true);
    },
    onError: () => {
      setToastMsg("Erro ao cadastrar cliente.");
      setToastType("danger");
      setShowToast(true);
    },
  });

  return (
    <>
      <form
        className="container vh-100 d-flex justify-content-center align-items-center"
        onSubmit={(e) => {
          e.preventDefault();
          if (name && phone) mutation.mutate();
        }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Telefone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary btn-sm">
              Cadastrar Cliente
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
