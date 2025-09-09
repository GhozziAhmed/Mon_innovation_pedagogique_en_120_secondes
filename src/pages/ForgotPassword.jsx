import axios from "axios";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  // const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState({
    error : false,
    message : ""
  });
  const handleForgot = () => {
    axios.post("http://localhost:5000/api/auth/forgot-password", { email }).then((res) => {
        console.log(res);
        setError({error: false, message : res.data.message});
    }).catch((err) => {
        console.log(err)
        setError({error: true, message : err.response.data.error});
    });
  };
  return (
    <div className="h-screen w-full flex justify-center items-center px-8">
      <div className="border border-zinc-200 rounded shadow p-5 flex flex-col items-center bg-zinc-100 w-75 max-w-full">
        <img src="/logo_transparent.png" alt="" className="w-full mb-5" />
        <div className="w-full">
          <div className="flex flex-col mb-5">
            <span className="mb-1">Email de recuperation</span>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="border border-zinc-400 rounded py-1 px-3 focus:outline-none focus:border focus:border-[#004C91]"
            />
            {error.message !== "" && <span className={error.error ? "text-red-500" : "text-green-500"}>{error.message}</span>}
          </div>
          <button
            className="bg-[#004C91] w-full text-white py-2 rounded cursor-pointer"
            onClick={handleForgot}
          >
            Envoyer
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
