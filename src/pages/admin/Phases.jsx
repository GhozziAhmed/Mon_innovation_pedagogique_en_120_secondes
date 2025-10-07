import { faRotateLeft, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import axios from "axios";
import Phase from "../../components/Phase";
import { toast } from "react-toastify";
import { faCalendarDays, faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

const Phases = () => {
  // const [edition, setEdition] = useState({});
  const [phases, setPhases] = useState([]);
  const [loadingInitial, setLoadingInitial] = useState(true); // New state for initial data loading

  const icons = [
    "/register.png",
    "/evaluation.png",
    "/voting.png",
    "/podium.png",
  ];

  const fetchData = async () => {
    setLoadingInitial(true); // Start loading
    try {
      const activeEditionRes = await axios.get(
        "https://mon-innovation-pedagogique-en-120.onrender.com/api/editions/active"
      );
      
      // Check if an active edition was found
      if (activeEditionRes.data && activeEditionRes.data.edition_id) {
        const phasesRes = await axios.get(
          `https://mon-innovation-pedagogique-en-120.onrender.com/api/phases/${activeEditionRes.data.edition_id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setPhases(phasesRes.data);
      } else {
        // If no active edition is returned (data is empty or missing ID)
        setPhases([]);
      }
    } catch (err) {
      console.error(err);
      // Optional: Add error toast for fetching failure
      setPhases([]);
    } finally {
      setLoadingInitial(false); // End loading
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const reset = () => {
    axios
      .put(
        "https://mon-innovation-pedagogique-en-120.onrender.com/api/phases/reset",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data.message);
        fetchData();
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.error, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeButton: true,
        });
      });
  };

  if (loadingInitial) {
      // Optional: Show a full-screen spinner while data is being fetched
      return (
          <div className="flex justify-center items-center min-h-screen">
              <FontAwesomeIcon icon={faSpinner} spin className="text-4xl text-[#004C91]" />
          </div>
      );
  }

  // --- NEW COMPONENT FOR NO ACTIVE EDITION ---
  if (phases.length === 0) {
    return (
      <div className="px-4 md:px-6 lg:px-20 py-20 min-h-screen">
        <h1 className="text-4xl font-semibold text-zinc-800 mb-10">
          Gérer Les Phases Du Concours
        </h1>
        <div className="flex flex-col items-center justify-center p-12 bg-white border-2 border-dashed border-red-300 rounded-xl shadow-lg max-w-2xl mx-auto text-center">
          <FontAwesomeIcon 
            icon={faCalendarDays} 
            className="text-6xl text-red-500 mb-6" 
          />
          <h2 className="text-2xl font-bold text-zinc-800 mb-3">
            Aucune Édition Active Détectée
          </h2>
          <p className="text-zinc-600 mb-8 max-w-md">
            Pour pouvoir gérer les phases du concours (inscription, évaluation, vote, etc.), 
            vous devez d'abord activer ou créer une édition dans la section "Éditions".
          </p>
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 text-red-700 text-sm">
             <FontAwesomeIcon icon={faCircleExclamation} className="text-xl" />
             <span>Veuillez vous rendre dans la section Éditions pour continuer.</span>
          </div>
        </div>
      </div>
    );
  }
  // --- END NEW COMPONENT ---

  return (
    <div className="px-4 md:px-6 lg:px-20 py-10">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-semibold text-zinc-800">
          Gérer Les Phases Du Concours
        </h1>
        <button
          className="bg-[#004C91] text-white py-2 px-4 rounded flex items-center gap-x-2 text-xl cursor-pointer hover:bg-[#003B70] transition-colors"
          onClick={reset}
        >
          <FontAwesomeIcon icon={faRotateLeft} />
          Initialiser
        </button>
      </div>
      <div className="mt-20 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {phases.map((p, i) => (
            <Phase
              key={p.id}
              phase={p}
              src={icons[i]}
              fetchData={fetchData}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Phases;