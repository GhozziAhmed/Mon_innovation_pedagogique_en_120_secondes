import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ConfirmVote = () => {
    const navigate = useNavigate();
  const { token } = useParams();
  console.log(token);
  const [confirmed, setConfirmed] = useState(false);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/votes/confirm/${token}`)
      .then((res) => {
        console.log(res);
        setConfirmed(true);
      })
      .catch((err) => {
        console.log(err);
        setConfirmed(false);
      });
  }, []);
  return (
    <div className="px-4 md:px-6 lg:px-20 h-screen flex justify-center items-center">
      <div className="flex flex-col">
        <h1 className="text-6xl font-bold text-[#004C91] mb-5">
          {confirmed
            ? "Vote Bien Confirmée !"
            : "token invalide, expirée ou vote deja confirmé"}
        </h1>
        <button className="bg-zinc-400 w-fit text-white py-2 px-6 mx-auto rounded cursor-pointer" onClick={() => navigate("/")}>Retourner</button>
      </div>
    </div>
  );
};

export default ConfirmVote;
