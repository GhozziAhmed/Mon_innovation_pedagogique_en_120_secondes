import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import DynamicVideoPlayer from "../../components/DynamicVideoPlayer ";

const Profile = () => {
  const [candidature, setCandidature] = useState(null);
  const [evaluations, setEvaluations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchCandidature = async () => {
      try {
        const [candidatureRes, evaluationsRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/candidatures/me`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }),
          axios.get(`http://localhost:5000/api/jury/candidate/me`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }),
        ]);

        if (candidatureRes.data.length > 0) {
          setCandidature(candidatureRes.data[0]);
        } else {
          setCandidature(null);
        }

        setEvaluations(evaluationsRes.data);
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCandidature();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-80px)] px-4 md:px-6 lg:px-20">
        <div className="text-xl text-zinc-500 font-semibold animate-pulse">
          Chargement de la candidature...
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-80px)] px-4 md:px-6 lg:px-20">
        <div className="text-center text-xl text-red-500 font-semibold p-10 bg-white rounded-lg shadow-md">
          Une erreur s'est produite lors du chargement. Veuillez réessayer plus
          tard.
        </div>
      </div>
    );
  }

  if (!candidature) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-80px)] px-4 md:px-6 lg:px-20">
        <div className="text-center text-xl text-zinc-500 font-semibold p-10 bg-white rounded-lg shadow-md flex flex-col items-center">
          <p className="mb-4">Vous n'avez pas encore soumis de candidature.</p>
          <Link
            to="/"
            className="mt-4 px-6 py-2 bg-[#004C91] text-white font-semibold rounded-full hover:bg-opacity-90 transition-all"
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 md:px-6 lg:px-20 py-10">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-[#004C91] hover:underline mb-8"
      >
        <FontAwesomeIcon icon={faChevronLeft} className="text-lg" />
        <span className="text-lg">Retour</span>
      </Link>

      <h1 className="text-3xl md:text-4xl font-bold text-[#004C91] mb-8 text-center">
        Ma Candidature
      </h1>

      <div className="bg-white rounded-xl shadow-lg p-6 md:p-10 space-y-8">
        <div className="flex flex-col items-center text-center space-y-2">
          <h2 className="text-2xl md:text-3xl font-extrabold text-zinc-800">
            {candidature.titre}
          </h2>
          <p className="text-zinc-600 text-sm md:text-base max-w-2xl">
            {candidature.description}
          </p>
        </div>

        <div className="border-t border-gray-200 pt-8">
          <h2 className="text-xl font-semibold text-zinc-800 mb-4">
            Vidéo de l'innovation :
          </h2>
          {candidature.fichier_lien ? (
            <div className="aspect-w-16 aspect-h-9 w-full rounded-lg overflow-hidden shadow-lg">
              <DynamicVideoPlayer url={candidature.fichier_lien} />
            </div>
          ) : (
            <div className="text-center text-zinc-500 italic p-5 border rounded-lg border-dashed">
              Pas de vidéo soumise.
            </div>
          )}
        </div>

        <div className="border-t border-gray-200 pt-8">
          <h2 className="text-xl font-semibold text-zinc-800 mb-4">
            Évaluations du Jury :
          </h2>
          {evaluations.length > 0 ? (
            <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr className="text-zinc-700">
                    <th className="p-4 text-left whitespace-nowrap">Jury</th>
                    <th className="p-4 text-left whitespace-nowrap">
                      Innovation
                    </th>
                    <th className="p-4 text-left whitespace-nowrap">
                      Technique
                    </th>
                    <th className="p-4 text-left whitespace-nowrap">Langue</th>
                    <th className="p-4 text-left whitespace-nowrap">
                      Coup de Cœur
                    </th>
                    <th className="p-4 text-left whitespace-nowrap">
                      Note Finale
                    </th>
                    <th className="p-4 text-left whitespace-nowrap">
                      Commentaires
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {evaluations.map((e) => (
                    <tr
                      key={e.evaluation_id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="p-4 text-left whitespace-nowrap">
                        {e.jury_nom} {e.jury_prenom}
                      </td>
                      <td className="p-4 text-left">{e.note_innovation}</td>
                      <td className="p-4 text-left">{e.note_technique}</td>
                      <td className="p-4 text-left">{e.note_langue}</td>
                      <td className="p-4 text-left">{e.coup_de_coeur}</td>
                      <td className="p-4 text-left font-bold text-[#004C91]">
                        {e.note_finale}
                      </td>
                      <td className="p-4 text-left max-w-xs">
                        {e.commentaires}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center text-zinc-500 italic p-5 border rounded-lg border-dashed">
              Aucune évaluation n'a encore été soumise.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
