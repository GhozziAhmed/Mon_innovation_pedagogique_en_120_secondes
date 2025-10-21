import {
  faChevronLeft,
  faCircleXmark,
  faCalendarCheck,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Participation = () => {
  const [form, setForm] = useState({
    titre: "",
    video_url: "",
    description: "",
  });
  const [sending, setSending] = useState(false);

  // Auth and Loading States
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Phase Checking State
  const [currentPhase, setCurrentPhase] = useState(null);
  const [isPhaseCorrect, setIsPhaseCorrect] = useState(false);

  const navigate = useNavigate();

  // --- Phase Verification Function ---
  const checkPhase = async () => {
    try {
      const phaseRes = await axios.get(
        "https://mon-innovation-pedagogique-en-120.onrender.com/api/phases/current-phase"
      );
      const phaseName = phaseRes.data?.phase?.phase_name;
      setCurrentPhase(phaseName);

      // Check if the current phase matches the required phase
      if (phaseName === "Inscription et submission") {
        setIsPhaseCorrect(true);
      } else {
        setIsPhaseCorrect(false);
      }
    } catch (error) {
      console.error("Erreur lors de la vérification de la phase:", error);
      setCurrentPhase(null); // Indicate an error state
      setIsPhaseCorrect(false);
    }
  };

  // --- Authentication and Data Fetch Effect ---
  useEffect(() => {
    const verifyUserAndCheckPhase = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login", { replace: true });
        return;
      }

      try {
        // 1. Authenticate and check role
        const response = await axios.get(
          "https://mon-innovation-pedagogique-en-120.onrender.com/api/auth/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const user = response.data;
        if (user && user.role === "candidat") {
          setIsAuthenticated(true);
          // 2. Check current phase only after successful auth
          await checkPhase();
        } else if (user && user.role !== "candidat") {
          // Non-candidate users redirected to home
          navigate("/");
        } else {
          // Invalid token/user data
          navigate("/login", { replace: true });
        }
      } catch (error) {
        console.error("Token verification failed:", error);
        navigate("/login", { replace: true });
      } finally {
        setIsLoading(false);
      }
    };

    verifyUserAndCheckPhase();
  }, [navigate]);

  // --- Submission Handler ---
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isPhaseCorrect) {
      toast.error("La période de soumission est terminée ou non commencée.", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeButton: true,
      });
      return;
    }

    setSending(true);
    axios
      .post(
        "https://mon-innovation-pedagogique-en-120.onrender.com/api/candidatures",
        form,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setSending(false);
        toast.success(res.data.message, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeButton: true,
        });
        setForm({
          titre: "",
          video_url: "",
          description: "",
        });
        // Optional: Redirect the user after successful submission
        // navigate("/candidat/dashboard");
      })
      .catch((err) => {
        setSending(false);
        toast.error(
          err.response.data.error ||
            "Erreur lors de l'envoi de la candidature.",
          {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeButton: true,
          }
        );
      });
  };

  // --- Helper function for input changes ---
  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // --- Rendering Status Box (similar to previous components) ---
  const renderPhaseStatus = () => {
    let title;
    let message;
    let icon;
    let colorClass;

    if (currentPhase === "Inscription et submission") {
      // Should not happen here due to the main conditional rendering, but good for completeness
      title = "Période d'Inscription Active";
      message = "Vous pouvez soumettre votre candidature.";
      icon = faCalendarCheck;
      colorClass = "text-green-600 border-green-300";
    } else if (currentPhase) {
      title = "Période d'Inscription Clôturée";
      message = `Le concours est actuellement en phase d'${currentPhase}. La soumission n'est plus possible.`;
      icon = faCircleXmark;
      colorClass = "text-red-600 border-red-300";
    } else {
      title = "Vérification en Cours...";
      message = "Nous vérifions le statut du concours. Veuillez patienter.";
      icon = faSpinner;
      colorClass = "text-zinc-500 border-zinc-300";
    }

    return (
      <div className="flex items-center justify-center min-h-[50vh] py-20">
        <div
          className={`p-8 border-2 rounded-xl text-center max-w-lg mx-auto shadow-md bg-white`}
        >
          <FontAwesomeIcon
            icon={icon}
            spin={!currentPhase}
            className={`text-5xl mb-4 ${colorClass}`}
          />
          <h2 className="text-3xl font-bold text-zinc-800 mb-2">{title}</h2>
          <p className="text-lg text-zinc-600">{message}</p>
          <Link
            to="/"
            className="mt-6 inline-flex items-center space-x-2 text-[#004C91] hover:text-[#003B70] transition-colors font-semibold"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
            <span>Retour à l'accueil</span>
          </Link>
        </div>
      </div>
    );
  };

  // --- Main Rendering ---

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <FontAwesomeIcon
          icon={faSpinner}
          spin
          className="text-4xl text-[#004C91]"
        />
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirection should handle this, but as a safeguard:
    return null;
  }

  if (!isPhaseCorrect) {
    return renderPhaseStatus();
  }

  // If authenticated and phase is correct, show the form
  return (
    <div className="py-10 px-4 md:px-6 lg:px-20">
      <div className="">
        <Link
          to="/"
          className="space-x-2 text-zinc-700 cursor-pointer hover:text-[#004C91] transition-colors"
        >
          <FontAwesomeIcon icon={faChevronLeft} />
          <span className="text-lg">Retour Au Site</span>
        </Link>
      </div>
      <div className="mt-10 w-full flex justify-center">
        <div className="w-full max-w-lg">
          {/* The w-75 class used on img is not standard Tailwind. I'll replace it with a standard max-width class. */}
          <img
            src="/logo_transparent.png"
            alt=""
            className="max-w-xs mx-auto mb-8"
          />
          <div className="bg-white shadow-xl border border-zinc-200 rounded-lg p-10 flex flex-col items-stretch">
            <h1 className="text-3xl font-semibold mb-6 text-zinc-800">
              Formulaire de participation
            </h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col space-y-2">
                <label className="font-medium text-zinc-700">
                  Titre de l'innovation
                </label>
                <input
                  type="text"
                  name="titre"
                  value={form.titre}
                  onChange={handleFormChange}
                  required
                  className="border border-zinc-400 rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#004C91] transition-shadow"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="font-medium text-zinc-700">
                  Lien video hébergée (URL)
                </label>
                <input
                  type="url"
                  name="video_url"
                  value={form.video_url}
                  onChange={handleFormChange}
                  required
                  placeholder="ex: https://youtube.com/watch?v=..."
                  className="border border-zinc-400 rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#004C91] transition-shadow"
                />
                <p className="text-sm text-zinc-500">
                  Veuillez utiliser une plateforme d'hébergement (YouTube,
                  Vimeo, etc.).
                </p>
              </div>
              <div className="flex flex-col space-y-2">
                <label className="font-medium text-zinc-700">Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleFormChange}
                  required
                  rows="5"
                  className="border border-zinc-400 rounded resize-none focus:outline-none focus:ring-2 focus:ring-[#004C91] py-2 px-3 transition-shadow"
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-[#004C91] w-full text-white py-3 rounded-lg text-xl font-semibold cursor-pointer transition-all hover:bg-[#003B70] disabled:bg-[#004C91]/50 disabled:cursor-not-allowed"
                disabled={
                  sending || !form.titre || !form.video_url || !form.description
                }
              >
                {sending ? (
                  <>
                    <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />
                    Envoi...
                  </>
                ) : (
                  "Envoyer ma candidature"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Participation;
