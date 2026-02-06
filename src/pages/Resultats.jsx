import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faHourglassStart, faChartSimple } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

const Resultats = () => {
  const [results, setResults] = useState([]);
  const [phase, setPhase] = useState("");
  const [loading, setLoading] = useState(true);
  const {t} = useTranslation();

  // 1. Fetch current phase
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/phases/current-phase")
      .then((res) => {
        setPhase(res.data?.phase?.phase_name || "");
      })
      .catch((err) => {
        toast.error(t("erreur.recuperation_phase"), {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeButton: true,
        });
      })
      .finally(() => {
        // Set loading false after phase is fetched to display status box if no results are needed
        if (phase !== "Selection finale") {
            setLoading(false);
        }
      });
  }, []);

  // 2. Fetch results only during the final selection phase
  useEffect(() => {
    if (phase === "Selection finale") {
      setLoading(true);
      axios
        .get("http://localhost:5000/api/results_agg")
        .then((res) => {
          setResults(res.data);
        })
        .catch((err) => {
          console.error(err.response?.data?.error || err.message);
          setResults([]);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [phase]);

  const renderStatusBox = () => {
    let title = t("resultats.statut.bientot");
    let message = t("resultats.statut.non_commence");
    let icon = faHourglassStart;

    if (phase === "Vote public") {
      title = t("resultats.statut.page_invalide");
      message = t("resultats.statut.non_disponible");
      icon = faChartSimple;
    } else if (phase) {
      message = t("resultats.statut.phase_en_cours", { phase: phase });
    }

    return (
      <div className="flex items-center justify-center min-h-[50vh] pt-20">
        <div className="p-8 border border-zinc-300 rounded-xl text-center max-w-xl mx-auto shadow-md">
          <FontAwesomeIcon icon={icon} className="text-5xl text-[#004C91] mb-4" />
          <h2 className="text-3xl font-bold text-zinc-800 mb-2">{title}</h2>
          <p className="text-lg text-zinc-600">{message}</p>
        </div>
      </div>
    );
  };

  if (loading) {
      return (
          <div className="flex justify-center items-center min-h-screen">
              <FontAwesomeIcon icon={faSpinner} spin className="text-4xl text-[#004C91]" />
          </div>
      );
  }

  // Render content only if phase is final and results are fetched
  const showResults = phase === "Selection finale";

  return (
    <div className="px-4 md:px-6 lg:px-20 py-20 min-h-screen relative top-20">
      {showResults ? (
        <>
          {/* Header */}
          <div className="w-fit mx-auto text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-3 text-zinc-900">{t('resultats.titre')}</h1>
            <p className="text-zinc-600 text-lg">{t('resultats.sous_titre')}</p>
          </div>

          {/* Results Table - Using requested style */}
          <div className="mt-10 overflow-x-auto rounded-lg shadow-md">
            <table className="min-w-full">
              <thead>
                <tr className="bg-zinc-100 border-b border-zinc-200 text-zinc-700">
                  <th className="p-4 text-center font-semibold">{t('resultats.tableau.classement')}</th>
                  <th className="p-4 text-left font-semibold">{t('resultats.tableau.candidat')}</th>
                  <th className="p-4 text-left font-semibold">{t('resultats.tableau.pays')}</th>
                  <th className="p-4 text-center font-semibold whitespace-nowrap">{t('resultats.tableau.score_jury')}</th>
                  <th className="p-4 text-center font-semibold whitespace-nowrap">{t('resultats.tableau.votes_publics')}</th>
                  <th className="p-4 text-left font-semibold">{t('resultats.tableau.titre_innovation')}</th>
                </tr>
              </thead>
              <tbody>
                {results.map((r, i) => (
                  <tr
                    key={r.resultat_id}
                    className="border-b border-zinc-200 last:border-0 hover:bg-zinc-50 transition-colors"
                  >
                    <td className="p-4 text-center text-zinc-700 font-bold whitespace-nowrap">
                      {i + 1 === 1 ? (
                        <img src="/first.png" alt="1er" className="w-8 mx-auto" />
                      ) : i + 1 === 2 ? (
                        <img src="/second.png" alt="2ème" className="w-8 mx-auto" />
                      ) : i + 1 === 3 ? (
                        <img src="/third.png" alt="3ème" className="w-8 mx-auto" />
                      ) : (
                        r.classement // Display rank for 4th onwards
                      )}
                    </td>
                    <td className="p-4 text-zinc-700 whitespace-nowrap">
                      {r.nom} {r.prenom}
                    </td>
                    <td className="p-4 text-zinc-700">{r.pays}</td>
                    <td className="p-4 text-center text-zinc-700 font-bold">
                      {Number(r.score_jury).toFixed(2)} / 10
                    </td>
                    <td className="p-4 text-center text-zinc-700 font-bold">
                      {r.votes_count}
                    </td>
                    <td className="p-4 text-zinc-700 max-w-xs">{r.titre}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        renderStatusBox()
      )}
    </div>
  );
};

export default Resultats;