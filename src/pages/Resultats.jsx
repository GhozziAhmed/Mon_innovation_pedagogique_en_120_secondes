import axios from "axios";
import { useEffect, useState } from "react";

const Resultats = () => {
  const [results, setResults] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/results_agg")
      .then((res) => {
        console.log(res.data);
        setResults(res.data);
      })
      .catch((err) => {
        console.log(err.response.data.error);
      });
  }, []);
  return (
    <div className="px-4 md:px-6 lg:px-20 relative top-20 py-20">
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
                  {i+1 === 1 ? (
                    <img src="/first.png" alt="" className="w-8"/>
                  ) : i+1 === 2 ? (
                    <img src="/second.png" alt="" className="w-8"/>
                  ) : i+1 === 3 ? (
                    <img src="/third.png" alt="" className="w-8"/>
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
    </div>
  );
};

export default Resultats;
