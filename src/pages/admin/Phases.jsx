import {
  faEllipsisVertical,
  faRotateLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Phase from "../../components/Phase";
import { toast } from "react-toastify";

const Phases = () => {
  // const [edition, setEdition] = useState({});
  const [phases, setPhases] = useState([]);
  const icons = [
    "/register.png",
    "/evaluation.png",
    "/voting.png",
    "/podium.png",
  ];
  const fetchData = async () => {
    const res = await axios.get("https://mon-innovation-pedagogique-en-120.onrender.com/api/editions/active");
    console.log(res.data.edition_id);
    axios
      .get(`https://mon-innovation-pedagogique-en-120.onrender.com/api/phases/${res.data.edition_id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setPhases(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  const reset = () => {
    axios
      .put("https://mon-innovation-pedagogique-en-120.onrender.com/api/phases/reset", {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
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
          closeButton: false,
        });
      });
  };
  return (
    <div className="px-4 md:px-6 lg:px-20 py-10">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-semibold text-zinc-800">
          Gérer Les Phases Du Concours
        </h1>
        <button
          className="bg-[#004C91] text-white py-2 px-4 rounded flex items-center gap-x-2 text-xl cursor-pointer"
          onClick={reset}
        >
          <FontAwesomeIcon icon={faRotateLeft} />
          Initialiser
        </button>
      </div>
      <div className="mt-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {phases &&
            phases.map((p, i) => (
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
