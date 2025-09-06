import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
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
  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    axios
      .post("http://localhost:5000/api/candidatures", form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // or sessionStorage
        },
      })
      .then((res) => {
        console.log(res);
        setSending(false);
        toast.success(res.data.message, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeButton: false,
        });
        setForm({
          titre: "",
          video_url: "",
          description: "",
        });
      })
      .catch((err) => {
        console.log(err);
        setSending(false);
        toast.error(err.response.data.error, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeButton: false,
        });
      });
  };
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login", { replace: true });
        return;
      }

      try {
        const response = await axios.get("http://localhost:5000/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const user = response.data;
        if (user && user.role === "candidat") {
          // You can also save the user data to a global state here if needed
          setIsAuthenticated(true);
        } else if (user && user.role !== "candidat") {
          navigate("/");
        } else {
          navigate("/login", { replace: true });
        }
      } catch (error) {
        console.error("Token verification failed:", error);
        // localStorage.removeItem("token");
        navigate("/login", { replace: true });
      } finally {
        setIsLoading(false);
      }
    };

    verifyUser();
  }, [navigate]);

  if (isLoading) {
    return <div className="p-5">Chargement...</div>;
  }
  return (
    isAuthenticated && (
      <div className="py-10 px-4 md:px-6 lg:px-20">
        <div className="">
          <Link to="/" className="space-x-2 text-zinc-700 cursor-pointer">
            <FontAwesomeIcon icon={faChevronLeft} />
            <span className="text-lg">Retour Aux Site</span>
          </Link>
        </div>
        <div className="mt-10 w-full flex justify-center">
          <div className="">
            <img src="/logo_transparent.png" alt="" className="w-75 mx-auto" />
            <div className="bg-white border-zinc-300 shadow-md border border-zinc-200 rounded p-10 flex flex-col items-stretch">
              <h1 className="text-3xl mb-5">Formulaire de participation</h1>
              <form action="" className="space-y-6">
                <div className="flex flex-col space-y-1">
                  <span>Titre de l'innovation</span>
                  <input
                    type="text"
                    value={form.titre}
                    onChange={(e) =>
                      setForm({ ...form, titre: e.target.value })
                    }
                    className="border border-zinc-400 rounded py-1 px-2 focus:outline-none"
                  />
                </div>
                <div className="flex flex-col space-y-1">
                  <span>Lien video hébérgée</span>
                  <input
                    type="text"
                    value={form.video_url}
                    onChange={(e) =>
                      setForm({ ...form, video_url: e.target.value })
                    }
                    placeholder="ex: youtube, facebook, vimeo, etc"
                    className="border border-zinc-400 rounded py-1 px-2 focus:outline-none"
                  />
                </div>
                <div className="flex flex-col space-y-1">
                  <span>Description</span>
                  <textarea
                    name=""
                    id=""
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                    className="border border-zinc-400 rounded resize-none focus:outline-none py-1 px-2 h-30"
                  ></textarea>
                </div>
                <button
                  className="bg-[#004C91] w-full text-white py-2 rounded text-xl cursor-pointer disabled:bg-[#004C91]/50"
                  onClick={handleSubmit}
                  disabled={sending}
                >
                  {sending ? "Envoi..." : "Envoyer"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Participation;
