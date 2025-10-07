import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Resultats = () => {
  const [results, setResults] = useState([]);
  const [phase, setPhase] = useState("");

  // Fetch current phase first
  useEffect(() => {
    axios
      .get("https://mon-innovation-pedagogique-en-120.onrender.com/api/phases/current-phase")
      .then((res) => {
        console.log(res.data);
        setPhase(res.data.phase.phase_name);
      })
      .catch((err) => {
        console.log(err.response);
        toast.error(err.response?.data?.error || "Erreur lors de la récupération de la phase", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeButton: true,
        });
      });
  }, []);

  // Fetch results only during the final selection phase
  useEffect(() => {
    if (phase === "Selection finale") {
      axios
        .get("https://mon-innovation-pedagogique-en-120.onrender.com/api/results_agg")
        .then((res) => {
          console.log(res.data);
          setResults(res.data);
        })
        .catch((err) => {
          console.log(err.response?.data?.error || err.message);
        });
    }
  }, [phase]);
  return (
    <div className="px-4 md:px-6 lg:px-20 relative top-20 py-20">
      {phase && phase === "Selection finale" ? (
        <>
          <div className="w-fit mx-auto text-center">
            <h1 className="text-6xl font-semibold mb-3 text-zinc-800">Résultats</h1>
            <p className="text-zinc-800">Découvrir les finalistes de cette édition</p>
          </div>
          <div className="mt-10 overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead className="">
                <tr className="bg-zinc-200 border-b">
                  <th className="p-3 text-ceter">Classement</th>
                  <th className="p-3 text-left">Candidat</th>
                  <th className="p-3 text-left">Pays</th>
                  <th className="p-3 text-left">Score Jury</th>
                  <th className="p-3 text-left">Votes Publics</th>
                  <th className="p-3 text-left">Titre Innovation</th>
                </tr>
              </thead>
              <tbody>
                {results.map((r, i) => (
                  <tr key={r.resultat_id} className="bg-zinc-100 border-b border-zinc-400">
                    <td className="px-3 py-6 flex justify-center">
                      {i + 1 === 1 ? (
                        <img src="/first.png" alt="" className="w-8" />
                      ) : i + 1 === 2 ? (
                        <img src="/second.png" alt="" className="w-8" />
                      ) : i + 1 === 3 ? (
                        <img src="/third.png" alt="" className="w-8" />
                      ) : (
                        r.classement
                      )}
                    </td>
                    <td className="px-3 py-6 text-left whitespace-nowrap">{r.nom} {r.prenom}</td>
                    <td className="px-3 py-6 text-left">{r.pays}</td>
                    <td className="px-3 py-6 text-left whitespace-nowrap">{r.score_jury} / 10</td>
                    <td className="px-3 py-6 text-left">{r.votes_count}</td>
                    <td className="px-3 py-6 text-left whitespace-nowrap">{r.titre}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="h-100 flex items-center justify-center">
          <div className="w-fit text-center">
            {phase === "Vote public" ? (
              <>
                <h1 className="text-6xl font-semibold text-zinc-800 mb-5">Page Non Valable</h1>
                <h2 className="text-xl font-light">Les résultats ne sont pas encore disponibles</h2>
              </>
            ) : (
              <>
                <h1 className="text-6xl font-semibold text-zinc-800 mb-5">Coming Soon</h1>
                <h2 className="text-xl font-light">
                  {phase
                    ? `Le concours est encore en phase d'${phase}`
                    : "Le concours n'a pas encore commencé ou en pause"}
                </h2>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Resultats;
