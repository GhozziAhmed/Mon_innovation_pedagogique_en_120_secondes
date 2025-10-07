import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";

const Phase = ({ phase, src, fetchData }) => {
  const [dropDown, setDropDown] = useState(false);
  const dropdownRef = useRef(null);

  const handleChange = async (status) => {
    try {
      const res = await axios.get("https://mon-innovation-pedagogique-en-120.onrender.com/api/editions/active");
      if (!res.data || !res.data.edition_id) {
        throw new Error("No active edition found.");
      }

      await axios.put(
        `https://mon-innovation-pedagogique-en-120.onrender.com/api/phases/${res.data.edition_id}/${phase.id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success("Statut de la phase mis à jour avec succès!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeButton: true,
      });
      fetchData();
      setDropDown(false);
    } catch (err) {
      const errorMessage =
        err.response?.data?.error || "Une erreur est survenue.";
      toast.error(errorMessage, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeButton: true,
      });
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropDown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col gap-y-3">
      <div className="relative ml-auto" ref={dropdownRef}>
        <FontAwesomeIcon
          icon={faEllipsisVertical}
          className="text-zinc-800 cursor-pointer p-2 rounded-full hover:bg-zinc-100 transition-colors"
          onClick={() => setDropDown(!dropDown)}
        />
        {dropDown && (
          <div className="absolute top-8 right-0 z-10 w-48 bg-white rounded-lg shadow-lg border border-zinc-200">
            {phase.status === "pending" && (
              <button
                className="w-full text-left px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-100 transition-colors cursor-pointer"
                onClick={() => handleChange("active")}
              >
                Activer
              </button>
            )}
            {phase.status === "active" && (
              <>
                <button
                  className="w-full text-left px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-100 transition-colors cursor-pointer"
                  onClick={() => handleChange("completed")}
                >
                  Compléter
                </button>
                <button
                  className="w-full text-left px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-100 transition-colors cursor-pointer"
                  onClick={() => handleChange("pending")}
                >
                  Mettre en attente
                </button>
              </>
            )}
          </div>
        )}
      </div>
      <div className="flex flex-col items-center gap-y-2">
        <img src={src} alt={phase.phase_name} className="w-35" />
        <span className="text-zinc-800 font-medium">{phase.phase_name}</span>
      </div>
      <div
        className={`py-2 px-4 rounded-full text-white w-fit mx-auto capitalize font-semibold text-xs
          ${
            phase.status === "pending"
              ? "bg-zinc-500"
              : phase.status === "active"
              ? "bg-green-500"
              : "bg-yellow-500"
          }`}
      >
        {phase.status}
      </div>
    </div>
  );
};

export default Phase;
