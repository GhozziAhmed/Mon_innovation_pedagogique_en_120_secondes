import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const countries = [
    "Tunisia",
    "Algeria",
    "Gabon",
    "Togo",
    "Benin",
    "Cameroon",
  ];
  const statuts = [
    "Étudiant",
    "Enseignant",
    "Chercheur",
    "Salarié",
    "Entrepreneur",
    "Sans Emploi",
    "Autre",
  ];
  const exercice_level = [
    "Lycée",
    "License",
    "Master",
    "Doctorat",
    "Jeune Professionnel",
    "Professionnel",
  ];
  const [genderDropDown, setGenderDropDown] = useState(false);
  const [countryDropDown, setCountryDropDown] = useState(false);
  const [statusDropDown, setStatusDropDown] = useState(false);
  const [niveauDropDown, setNiveauDropDown] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    genre: "",
    statut: "",
    niveau_exercice: "",
    specialite: "",
    email: "",
    mot_de_passe: "",
    pays: "",
    etablissement: "",
    antecedents: "",
  });
  const [error, setError] = useState("");
  const handleRegister = async (e) => {
    e.preventDefault();
    axios
      .post("https://mon-innovation-pedagogique-en-120.onrender.com/api/auth/register", form)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/");
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
    <div className="grid grid-cols-12">
      <div className="col-span-12 lg:col-span-5 p-7">
        <div className="flex justify-between items-center">
          <Link
            to="/"
            className="size-7 border-2 rounded-full flex justify-center items-center cursor-pointer"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="text-sm" />
          </Link>
          <div>
            Déja un member ?{" "}
            <Link to="/login" className="text-[#004C91]">
              Login
            </Link>
          </div>
        </div>
        <div className="mt-5">
          <h1 className="text-4xl font-semibold mb-5">Registre</h1>
          <h3 className="text-zinc-600">
            Bienvenue, Créez votre compte en 2min
          </h3>
        </div>
        <form action="" className="mt-5">
          {error != "" && (
            <span className="text-red-600 w-full text-left mb-5">{error}</span>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="border-b-2 flex items-center">
              <img src="/account_circle.png" alt="" />
              <input
                type="text"
                className="w-full p-2 focus:outline-none"
                placeholder="Nom"
                value={form.nom}
                onChange={(e) => setForm({ ...form, nom: e.target.value })}
              />
            </div>
            <div className="border-b-2 flex items-center">
              <img src="/account_circle.png" alt="" />
              <input
                type="text"
                className="w-full p-2 focus:outline-none"
                placeholder="Prenom"
                value={form.prenom}
                onChange={(e) => setForm({ ...form, prenom: e.target.value })}
              />
            </div>
            <div
              className="border-b-2 flex items-center relative cursor-pointer"
              onClick={() => setGenderDropDown(!genderDropDown)}
            >
              <img src="/male.png" alt="" />
              <span
                className={`${
                  form.genre === "" ? "text-zinc-500" : "text-zinc-900"
                } p-2`}
              >
                {form.genre || "Genre"}
              </span>
              <div className="flex justify-center items-center size-7 border-2 border-zinc-500 rounded-full absolute top-1/2 transform -translate-1/2 right-0 cursor-pointer">
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className="text-zinc-500"
                />
              </div>
              {genderDropDown && (
                <div className="absolute bg-white w-full top-[105%] border divide-zinc-600 z-1000">
                  <div
                    className="p-2 hover:bg-zinc-200 cursor-pointer"
                    onClick={() => {
                      setGenderDropDown(false);
                      setForm({ ...form, genre: "Homme" });
                    }}
                  >
                    Homme
                  </div>
                  <div
                    className="p-2 hover:bg-zinc-200 cursor-pointer"
                    onClick={() => {
                      setGenderDropDown(false);
                      setForm({ ...form, genre: "Femme" });
                    }}
                  >
                    Femme
                  </div>
                </div>
              )}
            </div>
            <div
              className="border-b-2 flex items-center relative cursor-pointer"
              onClick={() => setStatusDropDown(!statusDropDown)}
            >
              <img src="/location_away.png" alt="" />
              <span
                className={`${
                  form.statut === "" ? "text-zinc-500" : "text-zinc-900"
                } p-2`}
              >
                {form.statut || "Statut"}
              </span>
              <div className="flex justify-center items-center size-7 border-2 border-zinc-500 rounded-full absolute top-1/2 transform -translate-1/2 right-0 cursor-pointer">
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className="text-zinc-500"
                />
              </div>
              {statusDropDown && (
                <div className="absolute bg-white w-full top-[105%] border divide-zinc-600 h-25 overflow-auto z-1000">
                  {statuts.map((s) => (
                    <div
                      key={s}
                      className="p-2 hover:bg-zinc-200 cursor-pointer"
                      onClick={() => {
                        setStatusDropDown(false);
                        setForm({ ...form, statut: s });
                      }}
                    >
                      {s}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div
              className="border-b-2 flex items-center relative cursor-pointer"
              onClick={() => setNiveauDropDown(!niveauDropDown)}
            >
              <img src="/location_away.png" alt="" />
              <span
                className={`${
                  form.niveau_exercice === "" ? "text-zinc-500" : "text-zinc-900"
                } p-2`}
              >
                {form.niveau_exercice || "Niveau d'exercice"}
              </span>
              <div className="flex justify-center items-center size-7 border-2 border-zinc-500 rounded-full absolute top-1/2 transform -translate-1/2 right-0 cursor-pointer">
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className="text-zinc-500"
                />
              </div>
              {niveauDropDown && (
                <div className="absolute bg-white w-full top-[105%] border divide-zinc-600 h-25 overflow-auto z-1000">
                  {exercice_level.map((l) => (
                    <div
                      key={l}
                      className="p-2 hover:bg-zinc-200 cursor-pointer"
                      onClick={() => {
                        setNiveauDropDown(false);
                        setForm({ ...form, niveau_exercice: l });
                      }}
                    >
                      {l}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="border-b-2 flex items-center">
              <img src="/interactive_space.png" alt="" />
              <input
                type="text"
                className="w-full p-2 focus:outline-none"
                placeholder="Specialite"
                value={form.specialite}
                onChange={(e) =>
                  setForm({ ...form, specialite: e.target.value })
                }
              />
            </div>
            <div className="border-b-2 flex items-center md:col-span-2">
              <img src="/alternate_email.png" alt="" />
              <input
                type="email"
                className="w-full p-2 focus:outline-none"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div className="border-b-2 flex items-center md:col-span-2 pr-2">
              <img src="/lock.png" alt="" />
              <input
                type={hidden ? "password" : "text"}
                className="w-full p-2 focus:outline-none"
                placeholder="Mot De Passe"
                value={form.mot_de_passe}
                onChange={(e) =>
                  setForm({ ...form, mot_de_passe: e.target.value })
                }
              />
              <button className="cursor-pointer" onClick={(e) => {
                e.preventDefault();
                setHidden(!hidden);
              }}>
                <img src={`/${hidden ? "hidden" : "visible"}.png`} alt="" className="w-7"/>
              </button>
            </div>
            <div
              className="border-b-2 flex items-center relative cursor-pointer"
              onClick={() => setCountryDropDown(!countryDropDown)}
            >
              <img src="/globe_uk.png" alt="" />
              <span
                className={`${
                  form.pays === "" ? "text-zinc-500" : "text-zinc-900"
                } p-2`}
              >
                {form.pays || "Pays"}
              </span>
              <div className="flex justify-center items-center size-7 border-2 border-zinc-500 rounded-full absolute top-1/2 transform -translate-1/2 right-0 cursor-pointer">
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className="text-zinc-500"
                />
              </div>
              {countryDropDown && (
                <div className="absolute bg-white w-full top-[105%] border divide-zinc-600 h-25 overflow-auto">
                  {countries.map((c) => (
                    <div
                      key={c}
                      className="p-2 hover:bg-zinc-200 cursor-pointer"
                      onClick={() => {
                        setCountryDropDown(false);
                        setForm({ ...form, pays: c });
                      }}
                    >
                      {c}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="border-b-2 flex items-center">
              <img src="/cottage.png" alt="" />
              <input
                type="text"
                className="w-full p-2 focus:outline-none"
                placeholder="Etablissement"
                value={form.etablissement}
                onChange={(e) =>
                  setForm({ ...form, etablissement: e.target.value })
                }
              />
            </div>
            <div className="border-b-2 flex items-center md:col-span-2">
              <img src="/background_replace.png" alt="" />
              <input
                type="text"
                className="w-full p-2 focus:outline-none"
                placeholder="Antecedents"
                value={form.antecedents}
                onChange={(e) =>
                  setForm({ ...form, antecedents: e.target.value })
                }
              />
            </div>
          </div>
          <button
            className="bg-[#004C91] flex items-center gap-5 py-2 px-6 rounded-full mt-4 cursor-pointer"
            onClick={handleRegister}
          >
            <span className="text-xl text-white">Register</span>
            <div className="size-7 bg-[#8c98ff] flex justify-center items-center rounded-full">
              <FontAwesomeIcon icon={faArrowRight} className="text-white" />
            </div>
          </button>
        </form>
      </div>
      <div className="relative col-span-12 lg:col-span-7 w-full h-screen overflow-hidden hidden lg:block">
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

export default Register;
