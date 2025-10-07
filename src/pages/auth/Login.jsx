import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState({
    email: "",
    mot_de_passe: "",
  });
  const [error, setError] = useState("");
  const [hidden, setHidden] = useState(true);
  const [loading, setLoading] = useState(false);
  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("https://mon-innovation-pedagogique-en-120.onrender.com/api/auth/login", login)
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user))
        setError("");
        navigate("/");
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response.data.error);
        setError(err.response.data.error);
        setLoading(false);
      });
  };
  return (
    <div className="grid grid-cols-12 h-full">
      <div className="col-span-12 md:col-span-5 p-7">
        <div className="flex justify-between items-center">
          <Link
            to="/"
            className="size-7 border-2 rounded-full flex justify-center items-center cursor-pointer"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="text-sm" />
          </Link>
          <div>
            Vous n'avez pas d'un compte ?{" "}
            <Link to="/register" className="text-[#004C91]">
              Registre
            </Link>
          </div>
        </div>
        <div className="mt-5">
          <h1 className="text-4xl font-semibold mb-5">Login</h1>
          <h3 className="text-zinc-600">
            Bienvenue, Se connecter a votre compte
          </h3>
        </div>
        <form action="" className="mt-5 flex flex-col items-center md:block">
          {error != "" && <span className="text-red-600 w-full text-left mb-5">{error}</span>}
          <div className="space-y-5 w-full md:w-8/12 mb-2">
            <div className="border-b-2 flex items-center">
              <img src="/alternate_email.png" alt="" />
              <input
                type="email"
                className="w-full p-2 focus:outline-none"
                placeholder="Email"
                value={login.email}
                onChange={(e) => setLogin({ ...login, email: e.target.value })}
              />
            </div>
            <div className="border-b-2 flex items-center pr-2">
              <img src="/lock.png" alt="" />
              <input
                type={hidden ? "password" : "text"}
                className="w-full p-2 focus:outline-none"
                placeholder="Mot De Passe"
                value={login.mot_de_passe}
                onChange={(e) =>
                  setLogin({ ...login, mot_de_passe: e.target.value })
                }
              />
              <span className="cursor-pointer" onClick={() => {
                // e.preventDefault();
                setHidden(!hidden);
              }}>
                <img src={`/${hidden ? "hidden" : "visible"}.png`} alt="" className="w-7"/>
              </span>
            </div>
          </div>
          <Link to="/login/forgot-password" className="text-[#004C91]">
            Mot de Passe oubliée ?
          </Link>
          <button
            className="bg-[#004C91] flex items-center gap-5 py-2 px-6 rounded-full mt-5 cursor-pointer disabled:opacity-50"
            onClick={handleLogin}
            disabled={loading}
          >
            <span className="text-xl text-white">{loading ? "Login..." : "Login"}</span>
            {!loading && <div className="size-7 bg-[#8c98ff] flex justify-center items-center rounded-full">
              <FontAwesomeIcon icon={faArrowRight} className="text-white" />
            </div>}
          </button>
        </form>
      </div>
      <div className="relative col-span-12 md:col-span-7 w-full h-screen overflow-hidden hidden md:block">
        <div className="absolute top-1/2 left-1/2 transform -translate-1/2 z-12 bg-white p-5 rounded-lg shadow-xl border border-zinc-200">
          <img src="/logo_transparent.png" alt="" className="w-50" />
        </div>
        <div className="bg-[#143A63] w-125 h-75 absolute rounded-bl-4xl right-30 -top-50 transform -rotate-25 z-10"></div>
        <div className="bg-[#5565FF] h-full w-150 absolute -right-20 -top-20 transform rotate-10 z-9"></div>
        <div className="bg-[#004C91] h-full w-160 absolute rounded-4xl -right-15 -bottom-80 transform -rotate-10 z-10"></div>
        <div className="bg-[#5599FF] h-full w-160 absolute rounded-4xl right-15 -bottom-100 transform -rotate-20 z-9"></div>
      </div>
    </div>
  );
};

export default Login;
