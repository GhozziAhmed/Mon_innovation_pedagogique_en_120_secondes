import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const AdminLayout = () => {
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
        const response = await axios.get(
          "http://localhost:5000/api/auth/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const user = response.data;
        if (user && user.role === "admin") {
          // You can also save the user data to a global state here if needed
          setIsAuthenticated(true);
        } else if (user && user.role !== "admin") {
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
              Administration
            </h1>
            <p className="text-zinc-800">
              Gestion du concours d'innovation pedagogique
            </p>
          </div>
        </div>
        <div className="mt-5 shadow py-10 px-4 md:px-6 lg:px-20 border-t border-zinc-200 overflow-auto custom-scrollbar">
          <div
            className="flex gap-5"
          >
            <NavLink
              to="/admin/stats"
              className={({ isActive }) =>
                `flex-1 flex justify-center rounded shadow-md py-2 px-4 ${
                  isActive
                    ? "bg-[#004C91] text-white"
                    : "bg-zinc-200 text-zinc-700"
                }`
              }
            >
              Stats
            </NavLink>
            <NavLink
              to="/admin/editions"
              className={({ isActive }) =>
                `flex-1 flex justify-center rounded shadow-md py-2 px-4 ${
                  isActive
                    ? "bg-[#004C91] text-white"
                    : "bg-zinc-200 text-zinc-700"
                }`
              }
            >
              Editions
            </NavLink>
            <NavLink
              to="/admin/jury"
              className={({ isActive }) =>
                `flex-1 flex justify-center rounded shadow-md py-2 px-4 ${
                  isActive
                    ? "bg-[#004C91] text-white"
                    : "bg-zinc-200 text-zinc-700"
                }`
              }
            >
              Jury
            </NavLink>
            <NavLink
              to="/admin/candidatures"
              className={({ isActive }) =>
                `flex-1 flex justify-center rounded shadow-md py-2 px-4 ${
                  isActive
                    ? "bg-[#004C91] text-white"
                    : "bg-zinc-200 text-zinc-700"
                }`
              }
            >
              Candidatures
            </NavLink>
            <NavLink
              to="/admin/gallerie"
              className={({ isActive }) =>
                `flex-1 flex justify-center rounded shadow-md py-2 px-4 ${
                  isActive
                    ? "bg-[#004C91] text-white"
                    : "bg-zinc-200 text-zinc-700"
                }`
              }
            >
              Gallerie
            </NavLink>
            <NavLink
              to="/admin/news"
              className={({ isActive }) =>
                `flex-1 flex justify-center rounded shadow-md py-2 px-4 ${
                  isActive
                    ? "bg-[#004C91] text-white"
                    : "bg-zinc-200 text-zinc-700"
                }`
              }
            >
              Actualités
            </NavLink>
            <NavLink
              to="/admin/votes"
              className={({ isActive }) =>
                `flex-1 flex justify-center rounded shadow-md py-2 px-4 ${
                  isActive
                    ? "bg-[#004C91] text-white"
                    : "bg-zinc-200 text-zinc-700"
                }`
              }
            >
              Votes
            </NavLink>
            <NavLink
              to="/admin/evaluations"
              className={({ isActive }) =>
                `flex-1 flex justify-center rounded shadow-md py-2 px-4 ${
                  isActive
                    ? "bg-[#004C91] text-white"
                    : "bg-zinc-200 text-zinc-700"
                }`
              }
            >
              Evaluations
            </NavLink>
            <NavLink
              to="/admin/results"
              className={({ isActive }) =>
                `flex-1 flex justify-center rounded shadow-md py-2 px-4 ${
                  isActive
                    ? "bg-[#004C91] text-white"
                    : "bg-zinc-200 text-zinc-700"
                }`
              }
            >
              Resultats
            </NavLink>
            <NavLink
              to="/admin/partners"
              className={({ isActive }) =>
                `flex-1 flex justify-center rounded shadow-md py-2 px-4 ${
                  isActive
                    ? "bg-[#004C91] text-white"
                    : "bg-zinc-200 text-zinc-700"
                }`
              }
            >
              Partenaires
            </NavLink>
            <NavLink
              to="/admin/phases"
              className={({ isActive }) =>
                `flex-1 flex justify-center rounded shadow-md py-2 px-4 ${
                  isActive
                    ? "bg-[#004C91] text-white"
                    : "bg-zinc-200 text-zinc-700"
                }`
              }
            >
              Phases
            </NavLink>
            <NavLink
              to="/admin/messages"
              className={({ isActive }) =>
                `flex-1 flex justify-center rounded shadow-md py-2 px-4 ${
                  isActive
                    ? "bg-[#004C91] text-white"
                    : "bg-zinc-200 text-zinc-700"
                }`
              }
            >
              Messages
            </NavLink>
          </div>
        </div>
        <Outlet />
      </div>
    )
  );
};

export default AdminLayout;
