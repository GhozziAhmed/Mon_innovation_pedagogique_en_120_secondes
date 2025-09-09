import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const Phase = ({ phase, src, fetchData }) => {
  const [dropDown, setDropDown] = useState(false);
  const handleChange = async (status) => {
    const res = await axios.get("https://mon-innovation-pedagogique-en-120.onrender.com/api/editions/active");
    axios
      .put(
        `https://mon-innovation-pedagogique-en-120.onrender.com/api/phases/${res.data.edition_id}/${phase.id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        fetchData();
        setDropDown(false);
      })
      .catch((err) => {
        toast.error(err.response.data.error, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeButton: false,
        });
      });
  };
  return (
    <div className="flex flex-col gap-y-3">
      <div className="relative ml-auto">
        <FontAwesomeIcon
          icon={faEllipsisVertical}
          className="text-zinc-800 cursor-pointer"
          onClick={() => setDropDown(!dropDown)}
        />
        {dropDown && (
          <div className="flex flex-col w-40 border border-zinc-300 absolute top-6 right-4 bg-white">
            {phase.status === "pending" && (
              <button
                className="w-full text-left px-2 py-1 cursor-pointer hover:bg-zinc-200 whitespace-nowrap"
                onClick={() => handleChange("active")}
              >
                activer
              </button>
            )}
            {phase.status === "active" && (
              <>
                <button
                  className="w-full text-left px-2 py-1 cursor-pointer hover:bg-zinc-200 whitespace-nowrap"
                  onClick={() => handleChange("completed")}
                >
                  completer
                </button>{" "}
                <button
                  className="w-full text-left px-2 py-1 cursor-pointer hover:bg-zinc-200 whitespace-nowrap"
                  onClick={() => handleChange("pending")}
                >
                  mettre en attente
                </button>
              </>
            )}
          </div>
        )}
      </div>
      <div className="flex flex-col items-center gap-y-2">
        <img src={src} alt="" className="w-35" />
        <span>{phase.phase_name}</span>
      </div>
      <button
        className={`py-2 px-4 rounded text-white w-fit mx-auto disabled:bg-yellow-400/60 bg-${
          phase.status === "active" ? "green-500" : "zinc-700"
        }`}
        disabled={phase.status === "completed"}
      >
        {phase.status}
      </button>
    </div>
  );
};

export default Phase;


