import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const handleForgot = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(
        "http://localhost:5000/api/auth/forgot-password",
        { email }
      )
      .then((res) => {
        console.log(res);
        setEmail("");
        toast.success(res.data.message, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeButton: true,
        });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.error, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeButton: true,
        });
        setLoading(false);
      });
  };
  return (
    <div className="h-screen w-full flex justify-center items-center px-8 relative">
      <div
        className="absolute top-5 left-5 text-[#004C91] text-xl cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
        Retourner
      </div>
      <div className="border border-zinc-200 rounded shadow p-5 flex flex-col items-center bg-zinc-100 w-75 max-w-full">
        <img src="/logo_transparent.png" alt="" className="w-full mb-5" />
        <div className="w-full">
          <form onSubmit={handleForgot}>
            <div className="flex flex-col mb-5">
              <span className="mb-1">Email de recuperation</span>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="border border-zinc-400 rounded py-1 px-3 focus:outline-none focus:border focus:border-[#004C91]"
              />
            </div>
            <button
              disabled={loading}
              className="bg-[#004C91] w-full text-white py-2 rounded cursor-pointer disabled:opacity-50"
              type="submit"
            >
              {loading ? "Envoi en cours..." : "Envoyer"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
