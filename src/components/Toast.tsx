import { useEffect } from "react";

type Props = {
  message: string;
  type?: "success" | "danger";
  onClose: () => void;
  duration?: number;
};

export default function Toast({ message, type = "success", onClose, duration = 3000 }: Props) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div
      className={`toast align-items-center text-bg-${type} show position-fixed bottom-0 start-0 m-4`}
      role="alert"
      style={{
        zIndex: 9999,
        minWidth: "350px",
        maxWidth: "500px",
        borderRadius: 0,
        boxShadow: "0 0 12px rgba(0,0,0,0.25)",
        padding: "16px 20px",
        fontSize: "1.1rem",
      }}
    >
      <div className="d-flex justify-content-between align-items-center w-100">
        <div className="toast-body">{message}</div>
        <button
          type="button"
          className="btn-close btn-close-white ms-3"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}
