import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faXmark } from "@fortawesome/free-solid-svg-icons";
import DynamicVideoPlayer from "../components/DynamicVideoPlayer ";
import { toast } from "react-toastify";

const CandidatureDetails = () => {
  const { id } = useParams();
  const [candidature, setCandidature] = useState({});
  useEffect(() => {
    axios.get(`http://localhost:5000/api/candidatures/${id}`).then((res) => {
      console.log(res);
      setCandidature(res.data);
    });
  }, []);
  const [isOpen, setIsOpen] = useState(false);
  // const handleVote = (bool: boolean) => {
  //   setIsOpen(bool);
  // };
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);
  const [voter_email, setVoterEmail] = useState("");
  const [envoi, setEnvoi] = useState(false);
  const [confirmVoteModal, setConfirmVoteModal] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const [code, setCode] = useState("");
  const handleEnvoi = () => {
    setEnvoi(true);
    axios
      .post(`http://localhost:5000/api/votes/confirm/${id}`, { voter_email })
      .then((res) => {
        console.log(res);
        setEnvoi(false);
        setIsOpen(false);
        setConfirmVoteModal(true);
      })
      .catch((err) => {
        console.log(err);
        setEnvoi(false);
        toast.error(err.response.data.error, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeButton: false,
        });
      });
  };
  const handleConfirm = () => {
    console.log(id);
    console.log(voter_email);
    setConfirmation(true);
    axios
      .post("http://localhost:5000/api/votes/confirm", { voter_email, code })
      .then((res) => {
        console.log(res.data);
        toast.success(res.data.message, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeButton: false,
        });
        setConfirmation(false);
        setConfirmVoteModal(false);
      })
      .catch((err) => {
        console.log(err);
        setConfirmation(false);
        toast.error(err.response.data.message, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeButton: false,
        });
      });
  };
  return (
    <>
      <div className="px-4 md:px-6 lg:px-20 relative top-20 py-20">
        <Link
          to="/vote"
          className="text-[#004C91] underline flex items-center w-fit"
        >
          <FontAwesomeIcon icon={faChevronLeft} className="text-sm" /> Retour
          aux candidatures
        </Link>
        <div className="p-2 md:p-5 rounded w-200 mx-auto max-w-full shadow mt-10 border border-zinc-100">
          <h1 className="text-4xl font-semibold mb-10 text-center">
            {candidature.prenom} {candidature.nom}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 space-y-5 mb-5">
            <h2 className="text-xl">
              <span className="font-bold">Pays</span> : {candidature.pays}
            </h2>
            <h2 className="text-xl">
              <span className="font-bold">Etablissment</span> :{" "}
              {candidature.etablissement}
            </h2>
            <h2 className="text-xl">
              <span className="font-bold">Statut</span> : {candidature.statut}
            </h2>
            <h2 className="text-xl">
              <span className="font-bold">Niveau d'exercice</span> :{" "}
              {candidature.niveau_exercice}
            </h2>
            <h2 className="text-xl">
              <span className="font-bold">Specialité</span> :{" "}
              {candidature.specialite}
            </h2>
            <h2 className="text-xl">
              <span className="font-bold">Antécédents</span> :{" "}
              {candidature.antecedents ? candidature.antecedents : "Aucun"}
            </h2>
            <h2 className="text-xl md:col-span-2">
              <span className="font-bold">Titre de l'innovation</span> :{" "}
              {candidature.titre}
            </h2>
            <h2 className="text-xl md:col-span-2">
              <span className="font-bold">Description</span> :{" "}
              {candidature.description}
            </h2>
            {candidature.fichier_lien && (
              <DynamicVideoPlayer url={candidature.fichier_lien} />
            )}
          </div>
          <div className="flex justify-end">
            <button
              className="text-2xl border-[#95BF47] bg-[#95BF47] text-white py-1 px-3 rounded cursor-pointer"
              onClick={() => setIsOpen(true)}
            >
              Votez
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center px-8 z-2000">
          <div className="bg-white p-5 rounded">
            <div className="flex justify-end mb-5">
              <FontAwesomeIcon
                icon={faXmark}
                className="text-zinc-600 cursor-pointer"
                onClick={() => setIsOpen(false)}
              />
            </div>
            <h1 className="mb-5 text-3xl">Confirmez Votre Vote</h1>
            <div className="mb-5 flex flex-col space-y-1">
              <span>Votre Email</span>
              <input
                type="email"
                className="border border-zinc-600 rounded focus:outline-none py-1 px-2"
                value={voter_email}
                onChange={(e) => setVoterEmail(e.target.value)}
              />
            </div>
            <button
              className="bg-[#004C91] text-white py-2 w-full rounded cursor-pointer disabled:bg-[#004C91]/50"
              onClick={handleEnvoi}
              disabled={envoi}
            >
              {envoi ? "Envoi..." : "Envoyer"}
            </button>
          </div>
        </div>
      )}
      {confirmVoteModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center px-8 z-2000">
          <div className="bg-white p-5 rounded">
            <div className="flex justify-end mb-5">
              <FontAwesomeIcon
                icon={faXmark}
                className="text-zinc-600 cursor-pointer"
                onClick={() => setConfirmVoteModal(false)}
              />
            </div>
            <h1 className="mb-5 text-3xl">
              Entrer le code envoyée a votre mail
            </h1>
            <div className="mb-5 flex flex-col space-y-1">
              <span>Code</span>
              <input
                type="text"
                className="border border-zinc-600 rounded focus:outline-none py-1 px-2"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>
            <button
              className="bg-[#004C91] text-white py-2 w-full rounded cursor-pointer disabled:bg-[#004C91]/50"
              onClick={handleConfirm}
              disabled={confirmation}
            >
              {confirmation ? "Confirmation..." : "Confirmer"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CandidatureDetails;
