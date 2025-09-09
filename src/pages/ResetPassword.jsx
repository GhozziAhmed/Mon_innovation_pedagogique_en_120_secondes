import axios from "axios";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
//   console.log(token);
  const [form, setForm] = useState({
    token,
    new_password: "",
    confirm: "",
  });
  const [error, setError] = useState("");
  const handleReset = () => {
    console.log(form)
    axios
      .post("https://mon-innovation-pedagogique-en-120.onrender.com/api/auth/reset-password", form)
      .then((res) => {
        navigate("/login");
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
        if (err.response) {
          // Backend error (like duplicate email, validation, etc.)
          setError(err.response.data.error || "Une erreur est survenue.");
        } else {
          // Network error
          setError("Impossible de se connecter au serveur.");
        }
      });
  };
  return (
    <div className="h-screen w-full flex justify-center items-center px-8">
      <div className="border border-zinc-200 rounded shadow p-5 flex flex-col items-center bg-zinc-100 w-75 max-w-full">
        <img src="/logo_transparent.png" alt="" className="w-full mb-5" />
        <div className="w-full">
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
          {error && <span className="text-red-500">{error}</span>}
          <button
            className="bg-[#004C91] w-full text-white py-2 rounded cursor-pointer"
            onClick={handleReset}
          >
            Changer
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
