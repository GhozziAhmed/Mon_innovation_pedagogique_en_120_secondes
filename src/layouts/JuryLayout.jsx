import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const JuryLayout = () => {
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
        const response = await axios.get("https://mon-innovation-pedagogique-en-120.onrender.com/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const user = response.data;
        if (user && user.role === "jury") {
          // You can also save the user data to a global state here if needed
          setIsAuthenticated(true);
        } else if (user && user.role !== "jury") {
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
      <div>
        <div className="shadow py-10 px-4 md:px-6 lg:px-20 flex flex-col items-start gap-5 lg:flex-row lg:items-center lg:gap-20">
          <Link
            to="/"
            className="flex items-center gap-3 bg-zinc-200 rounded py-2 px-5"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            <span>Retour aux site</span>
          </Link>
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-semibold text-zinc-800">
              Espace Jury
            </h1>
            <p className="text-zinc-800">
              Gestion des Evaluations du concours d'innovation pedagogique
            </p>
          </div>
        </div>
        <div className="mt-5 shadow py-10 px-4 md:px-6 lg:px-20 border-t border-zinc-200">
          <div
            className="flex gap-5 overflow-auto scrollbar-hide"
            style={{
              msOverflowStyle: "none", // IE and old Edge
              scrollbarWidth: "none", // Firefox
            }}
          >
            <NavLink
              to="/jury/stats"
              className={({ isActive }) =>
                `flex-1 flex justify-center rounded py-2 px-4 ${
                  isActive
                    ? "bg-[#004C91] text-white"
                    : "bg-zinc-200 text-zinc-700"
                }`
              }
            >
              Stats
            </NavLink>
            <NavLink
              to="/jury/evaluations"
              className={({ isActive }) =>
                `flex-1 flex justify-center rounded py-2 px-4 ${
                  isActive
                    ? "bg-[#004C91] text-white"
                    : "bg-zinc-200 text-zinc-700"
                }`
              }
            >
              Evaluations
            </NavLink>
            <NavLink
              to="/jury/profile"
              className={({ isActive }) =>
                `flex-1 flex justify-center rounded py-2 px-4 ${
                  isActive
                    ? "bg-[#004C91] text-white"
                    : "bg-zinc-200 text-zinc-700"
                }`
              }
            >
              Profile
            </NavLink>
          </div>
        </div>
        <Outlet />
      </div>
    )
  );
};

export default JuryLayout;
