import { faChevronDown, faFilter, faHourglassStart, faCircleXmark, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

const JuryCandidatures = () => {
    const [candidatures, setCandidatures] = useState([]);
    const [filteredCandidatures, setFilteredCandidatures] = useState([]);
    const [search, setSearch] = useState("");
    const filters = ["Tous", "A-Z", "Z-A", "Evaluée", "Non Evaluée"];
    const [filter, setFilter] = useState(filters[0]);
    const [filterDropdown, setFilterDropdown] = useState(false);
    
    // New state for phase checking
    const [currentPhase, setCurrentPhase] = useState(null);
    const [loading, setLoading] = useState(true);

    const filterDropdownRef = useRef(null);

    // --- Phase and Candidatures Fetch Logic ---

    const fetchPhase = async () => {
        try {
            const res = await axios.get(
                "https://mon-innovation-pedagogique-en-120.onrender.com/api/phases/current-phase"
            );
            setCurrentPhase(res.data?.phase?.phase_name || "");
        } catch (err) {
            console.error("Error fetching current phase:", err);
            setCurrentPhase("Erreur de récupération");
        }
    };

    const fetchData = async () => {
        try {
            const res = await axios.get("https://mon-innovation-pedagogique-en-120.onrender.com/api/jury/assignments/me", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            setCandidatures(res.data);
            setFilteredCandidatures(res.data);
        } catch (err) {
            console.error("Error fetching candidatures:", err);
        }
    };

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            await fetchPhase();
            // We fetch candidatures regardless of the phase to check evaluation status later,
            // but the UI logic will block display if the phase is incorrect.
            await fetchData(); 
            setLoading(false);
        };
        loadData();
    }, []);

    // --- Filter and Search Logic ---

    // Combined effect for searching
    useEffect(() => {
        const filterAndSearch = () => {
            let results = [...candidatures];

            // 1. Apply Filter
            if (filter === "A-Z") {
                results.sort((a, b) => a.nom.localeCompare(b.nom));
            } else if (filter === "Z-A") {
                results.sort((a, b) => b.nom.localeCompare(a.nom));
            } else if (filter === "Evaluée") {
                results = results.filter((r) => r.evaluated);
            } else if (filter === "Non Evaluée") {
                results = results.filter((r) => !r.evaluated);
            } else {
                // "Tous" filter - use original list
                results = [...candidatures];
            }

            // 2. Apply Search
            const finalResults = results.filter(
                (c) =>
                    c.nom?.toUpperCase().includes(search.toUpperCase()) ||
                    c.prenom?.toUpperCase().includes(search.toUpperCase())
            );

            setFilteredCandidatures(finalResults);
        };
        filterAndSearch();
    }, [search, filter, candidatures]);


    // --- Dropdown Handler ---

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                filterDropdownRef.current &&
                !filterDropdownRef.current.contains(event.target)
            ) {
                setFilterDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    // --- Status Rendering Function ---

    const renderPhaseStatus = () => {
        if (currentPhase === "Evaluation jury") return null; // Only show status if phase is wrong or loading

        let title = "Évaluation Non Disponible";
        let message = `Le concours est actuellement en phase de ${currentPhase}. L'évaluation ne peut être effectuée qu'en phase d'Évaluation.`;
        let icon = faCircleXmark;
        
        if (currentPhase === "Erreur de récupération" || currentPhase === "") {
             title = "Statut du Concours Inconnu";
             message = "Impossible de vérifier la phase actuelle. Veuillez réessayer plus tard.";
             icon = faHourglassStart;
        }

        return (
            <div className="flex items-center justify-center min-h-[50vh] pt-10">
                <div className="p-8 border border-zinc-300 rounded-xl text-center max-w-xl mx-auto shadow-md">
                    <FontAwesomeIcon icon={icon} className="text-5xl text-red-600 mb-4" />
                    <h2 className="text-3xl font-bold text-zinc-800 mb-2">{title}</h2>
                    <p className="text-lg text-zinc-600">{message}</p>
                </div>
            </div>
        );
    };

    // --- Main Component Render ---
    
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <FontAwesomeIcon icon={faSpinner} spin className="text-4xl text-[#004C91]" />
            </div>
        );
    }
    
    if (currentPhase !== "Evaluation jury") {
        return renderPhaseStatus();
    }
    

    return (
        <div className="px-4 md:px-6 lg:px-20 py-10">
            <div className="text-4xl w-fit mx-auto mb-10">
                <h1>Evaluer Votre Candidatures</h1>
            </div>
            <div className="flex flex-col md:flex-row md:justify-between items-center gap-4 mb-10">
                <div className="flex w-full md:w-1/2">
                    <input
                        type="text"
                        className="w-full px-4 py-2 border-2 border-gray-300 border-r-0 rounded-l-lg focus:outline-none focus:border-[#004c91] transition-all"
                        placeholder="Chercher Un Candidat"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <div className="bg-[#004c91] text-white px-4 py-2 flex items-center rounded-r-lg">
                        <FontAwesomeIcon icon={faFilter} />
                    </div>
                </div>

                <div
                    className="w-full md:w-auto relative cursor-pointer"
                    onClick={() => setFilterDropdown(!filterDropdown)}
                    ref={filterDropdownRef}
                >
                    <div className="flex justify-between items-center px-4 py-2 border-2 border-gray-300 rounded-lg bg-white hover:border-[#004c91] transition-colors">
                        <span>{filter}</span>
                        <FontAwesomeIcon
                            icon={faChevronDown}
                            className={`ml-2 transition-transform duration-300 ${
                                filterDropdown ? "rotate-180" : ""
                            }`}
                        />
                    </div>
                    {filterDropdown && (
                        <div className="absolute top-full mt-2 w-fit bg-white rounded-lg shadow-lg z-10 border border-gray-200 overflow-hidden animate-slide-down">
                            {filters.map((f) => (
                                <div
                                    key={f}
                                    className="p-3 hover:bg-gray-100 transition-colors whitespace-nowrap"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setFilter(f);
                                        setFilterDropdown(false);
                                    }}
                                >
                                    {f}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-10">
                {filteredCandidatures &&
                    filteredCandidatures.map((c) => (
                        <div
                            key={c.assignment_id}
                            className="rounded-lg overflow-hidden shadow relative border border-zinc-300"
                        >
                            <img src="/vote.png" alt="" />
                            <div className="px-3 py-5">
                                <div className="flex justify-between items-center">
                                    <h2 className="font-semibold">
                                        {c.nom} {c.prenom}
                                    </h2>
                                    <Link
                                        to={`/jury/evaluations/${c.candidature_id}`}
                                        className="border-2 border-zinc-600 text-zinc-600 hover:bg-zinc-100 rounded px-4 py-1 cursor-pointer"
                                    >
                                        Plus
                                    </Link>
                                </div>
                            </div>
                            <div className="absolute top-2 right-2">
                                <div className="size-8 rounded-full bg-white flex justify-center items-center">
                                    <img
                                        src={c.evaluated ? "/check-circle.png" : "/push-pin.png"}
                                        alt=""
                                        className="w-5"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
            {/* Display message if no candidatures match filters/search */}
            {filteredCandidatures.length === 0 && (
                <div className="text-center mt-10 p-5 border border-zinc-200 rounded-lg bg-zinc-50">
                    <p className="text-xl text-zinc-600">Aucune candidature ne correspond à vos critères de recherche ou de filtre.</p>
                </div>
            )}
        </div>
    );
};

export default JuryCandidatures;