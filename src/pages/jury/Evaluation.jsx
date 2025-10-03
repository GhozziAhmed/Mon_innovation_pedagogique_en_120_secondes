import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DynamicVideoPlayer from "../../components/DynamicVideoPlayer ";
import { toast } from "react-toastify";

const Evaluation = () => {
  const { id } = useParams();
  const [candidature, setCandidature] = useState({});
  //   const [evaluation, setEvaluation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    note_innovation: "",
    note_technique: "",
    note_langue: "",
    coup_de_coeur: "",
    commentaires: "",
  });
  const fetchData = () => {
    axios
      .get(`https://mon-innovation-pedagogique-en-120.onrender.com/api/candidatures/${id}`)
      .then((res) => {
        console.log(res.data);
        setCandidature(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`https://mon-innovation-pedagogique-en-120.onrender.com/api/jury/evaluation/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        // setEvaluation(res.data);
        console.log(res.data);
        setForm((prev) => {
          return res.data || prev;
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(`https://mon-innovation-pedagogique-en-120.onrender.com/api/jury/${id}`, form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        toast.success(res.data.message, {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeButton: false,
        });
      })
      .catch((err) => {
        console.log(err.response);
        setLoading(false);
        toast.error(err.response.data.error, {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeButton: false,
        });
      });
  };
  return (
    <div className="px-4 md:px-6 lg:px-20 py-10">
      <Link to="/jury/evaluations" className="text-[#004C91]">
        <FontAwesomeIcon icon={faChevronLeft} className="text-sm" />
        Retour aux candidatures
      </Link>
      <h1 className="mt-5 text-3xl text-center lg:text-left font-semibold text-zinc-800">
        Détails De La Candidature
      </h1>
      <div className="grid grid-cols-4 mt-10 gap-5">
        <div className="col-span-4 xl:col-span-3 p-5 rounded border border-zinc-200">
          <h2 className="text-4xl font-bold text-zinc-800 mb-5">
            {candidature.nom} {candidature.prenom}
          </h2>
          <div className="flex flex-col space-y-2 mb-5">
            <h3 className="font-bold text-xl">
              Pays :{" "}
              <span className="font-normal text-zinc-800">
                {candidature.pays}
              </span>
            </h3>
            <h3 className="font-bold text-xl">
              Etablissement :{" "}
              <span className="font-normal text-zinc-800">
                {candidature.etablissement}
              </span>
            </h3>
            <h3 className="font-bold text-xl">
              Statut :{" "}
              <span className="font-normal text-zinc-800">
                {candidature.statut}
              </span>
            </h3>
            <h3 className="font-bold text-xl">
              Niveau D'exercice :{" "}
              <span className="font-normal text-zinc-800">
                {candidature.niveau_exercice}
              </span>
            </h3>
            <h3 className="font-bold text-xl">
              Specialité :{" "}
              <span className="font-normal text-zinc-800">
                {candidature.specialite}
              </span>
            </h3>
            <h3 className="font-bold text-xl">
              Antécédents :{" "}
              <span className="font-normal text-zinc-800">
                {candidature.antecedents}
              </span>
            </h3>
          </div>
          <h3 className="font-bold text-xl mb-5">
            Titre Innovation : <br />
            <span className="font-normal text-zinc-800 lg:ml-5">
              {candidature.titre}
            </span>
          </h3>
          <h3 className="font-bold text-xl mb-5">
            Déscription : <br />
            <span className="font-normal text-zinc-800 lg:ml-5">
              {candidature.description}
            </span>
          </h3>
          <h3 className="font-bold text-xl mb-2">Vidéo :</h3>
          {candidature.fichier_lien && (
            <DynamicVideoPlayer url={candidature.fichier_lien} />
          )}
        </div>
        <div className="col-span-4 xl:col-span-1 p-5 rounded border border-zinc-200 h-fit">
          <h2 className="text-2xl font-semibold text-zinc-800">Evaluation</h2>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2 mt-5">
              <div className="flex justify-between">
                <span>Innovation</span>
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    className="border focus:outline-none w-7 px-1 rounded text-center"
                    value={form.note_innovation}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        note_innovation: e.target.value,
                      })
                    }
                  />
                  / 8
                </div>
              </div>
              <div className="flex justify-between">
                <span>Technique</span>
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    className="border focus:outline-none w-7 px-1 rounded text-center"
                    value={form.note_technique}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        note_technique: e.target.value,
                      })
                    }
                  />
                  / 5
                </div>
              </div>
              <div className="flex justify-between">
                <span>Langue</span>
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    className="border focus:outline-none w-7 px-1 rounded text-center"
                    value={form.note_langue}
                    onChange={(e) =>
                      setForm({ ...form, note_langue: e.target.value })
                    }
                  />
                  / 5
                </div>
              </div>
              <div className="flex justify-between">
                <span>Coup De Coeur</span>
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    className="border focus:outline-none w-7 px-1 rounded text-center"
                    value={form.coup_de_coeur}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        coup_de_coeur: e.target.value,
                      })
                    }
                  />
                  / 2
                </div>
              </div>
              <div className="mt-5">
                <div className="mb-1">Commentaires :</div>
                <textarea
                  name=""
                  id=""
                  className="border w-full resize-none rounded h-30 focus:outline-none p-2"
                  value={form.commentaires}
                  onChange={(e) =>
                    setForm({ ...form, commentaires: e.target.value })
                  }
                ></textarea>
              </div>
            </div>
            <div className="flex justify-end mt-5">
              <button
                className="bg-[#004C91] text-white px-4 py-2 rounded cursor-pointer disabled:opacity-50 disabled:cursor-default"
                type="submit"
                disabled={loading}
              >
                {loading ? "Soumission..." : "Soumettre"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Evaluation;
