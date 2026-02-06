import axios from "axios";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  console.log(token);
  const [form, setForm] = useState({
    token,
    new_password: "",
    confirm: "",
  });
  const [loading, setLoading] = useState(false);
  const handleReset = (e) => {
    e.preventDefault();
    console.log(form)
    setLoading(true);
    axios
      .post("http://localhost:5000/api/auth/reset-password", form)
      .then((res) => {
        navigate("/login");
        console.log(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        if (err.response) {
          // Backend error (like duplicate email, validation, etc.)
          toast.error(err.response.data.error || "Une erreur est survenue.", {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeButton: true,
          });
        } else {
          // Network error
          toast.error("Impossible de se connecter au serveur.", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeButton: true,
          });
        }
        setLoading(false);
      });
  };
  return (
    <div className="h-screen w-full flex justify-center items-center px-8">
      <div className="border border-zinc-200 rounded shadow p-5 flex flex-col items-center bg-zinc-100 w-75 max-w-full">
        <img src="/logo_transparent.png" alt="" className="w-full mb-5" />
        <div className="w-full">
          <form onSubmit={handleReset}>
          <div className="flex flex-col mb-5">
            <span className="mb-1">Nouveau Mot De Passe</span>
            <input
              type="password"
              className="border border-zinc-400 rounded py-1 px-3 focus:outline-none focus:border focus:border-[#004C91]"
              value={form.new_password}
              onChange={(e) => setForm({ ...form, new_password: e.target.value })}
            />
          </div>
          <div className="flex flex-col mb-5">
            <span className="mb-1">Confirmer</span>
            <input
              type="password"
              className="border border-zinc-400 rounded py-1 px-3 focus:outline-none focus:border focus:border-[#004C91]"
              value={form.confirm}
              onChange={(e) =>
                setForm({ ...form, confirm: e.target.value })
              }
            />
          </div>
          <button
            className="bg-[#004C91] w-full text-white py-2 rounded cursor-pointer disabled:opacity-50 disabled:cursor-default"
            onClick={() => handleReset(e)}
            type="submit"
            disabled={loading}
            >
              {loading ? "Changement..." : "Changer"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
