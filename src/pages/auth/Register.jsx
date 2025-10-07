import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect, useCallback } from "react";
import axios from "axios";
// 💡 Import the new standalone component
import DropdownField from "../../components/DropdownField"; 

const Register = () => {
  const navigate = useNavigate();

  // 💡 Ref for click-outside logic
  const dropdownContainerRef = useRef(null); 
  
  // Data Arrays
  const countries = [
    "Tunisie", "Algerie", "Gabon", "Togo", "Benin", "Cameroun",
  ];
  const statuts = [
    "Étudiant", "Enseignant", "Chercheur", "Salarié", 
    "Entrepreneur", "Sans Emploi", "Autre",
  ];
  const exercice_level = [
    "Lycée", "License", "Master", "Doctorat", 
    "Jeune Professionnel", "Professionnel",
  ];
  const genders = ["Homme", "Femme"];

  const [dropdownStates, setDropdownStates] = useState({
    gender: false,
    country: false,
    status: false,
    niveau: false,
  });

  const [hidden, setHidden] = useState(true);
  const [form, setForm] = useState({
    nom: "", prenom: "", genre: "", statut: "",
    niveau_exercice: "", specialite: "", email: "", 
    mot_de_passe: "", pays: "", etablissement: "",
    antecedents: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // 💡 Centralized form update handler for dropdowns
  const handleDropdownSelect = useCallback((key, value) => {
    setForm(prevForm => ({ ...prevForm, [key]: value }));
  }, []);

  // 💡 Effect to handle clicks outside the form container
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownContainerRef.current &&
        !dropdownContainerRef.current.contains(event.target)
      ) {
        setDropdownStates({
          gender: false, country: false, status: false, niveau: false,
        });
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []); // Empty dependency array means this runs once on mount

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("https://mon-innovation-pedagogique-en-120.onrender.com/api/auth/register", form)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/");
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        if (err.response) {
          setError(err.response.data.error || "Une erreur est survenue.");
        } else {
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
        <form 
            action="" 
            className="mt-5" 
            onSubmit={handleRegister} 
            ref={dropdownContainerRef}
        >
          {error && (
            <span className="text-red-600 w-full text-left mb-5 block">{error}</span>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Input: Nom */}
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
            {/* Input: Prenom */}
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

            {/* Dropdown: Genre */}
            <DropdownField
              icon="/male.png"
              label="Genre"
              formKey="genre"
              dropdownKey="gender"
              options={genders}
              selectedValue={form.genre}
              onSelect={handleDropdownSelect}
              dropdownStates={dropdownStates}
              setDropdownStates={setDropdownStates}
            />

            {/* Dropdown: Statut */}
            <DropdownField
              icon="/location_away.png"
              label="Statut"
              formKey="statut"
              dropdownKey="status"
              options={statuts}
              selectedValue={form.statut}
              onSelect={handleDropdownSelect}
              dropdownStates={dropdownStates}
              setDropdownStates={setDropdownStates}
            />
            
            {/* Dropdown: Niveau d'exercice */}
            <DropdownField
              icon="/location_away.png"
              label="Niveau d'exercice"
              formKey="niveau_exercice"
              dropdownKey="niveau"
              options={exercice_level}
              selectedValue={form.niveau_exercice}
              onSelect={handleDropdownSelect}
              dropdownStates={dropdownStates}
              setDropdownStates={setDropdownStates}
            />

            {/* Input: Specialite */}
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

            {/* Input: Email */}
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

            {/* Input: Mot De Passe */}
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

            {/* Dropdown: Pays */}
            <DropdownField
              icon="/globe_uk.png"
              label="Pays"
              formKey="pays"
              dropdownKey="country"
              options={countries}
              selectedValue={form.pays}
              onSelect={handleDropdownSelect}
              dropdownStates={dropdownStates}
              setDropdownStates={setDropdownStates}
            />
            
            {/* Input: Etablissement */}
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

            {/* Input: Antecedents */}
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
            className="bg-[#004C91] flex items-center gap-5 py-2 px-6 rounded-full mt-4 cursor-pointer disabled:opacity-50"
            type="submit"
            disabled={loading}
          >
            <span className="text-xl text-white">{loading ? "Register..." : "Register"}</span>
            <div className="size-7 bg-[#8c98ff] flex justify-center items-center rounded-full">
              <FontAwesomeIcon icon={faArrowRight} className="text-white" />
            </div>
          </button>
        </form>
      </div>
      <div className="relative col-span-12 lg:col-span-7 w-full h-screen overflow-hidden hidden lg:block">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-12 bg-white p-5 rounded-lg shadow-xl border border-zinc-200">
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