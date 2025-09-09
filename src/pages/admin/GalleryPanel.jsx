import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const GalleryPanel = () => {
  const [editions, setEditions] = useState([]);
  useEffect(() => {
    axios
      .get("https://mon-innovation-pedagogique-en-120.onrender.com/api/editions")
      .then((res) => {
        console.log(res.data);
        setEditions(res.data);
      })
      .catch((err) => {
        console.log(err.response.data.error);
      });
  }, []);
  return (
    <div className="px-4 md:px-6 lg:px-20 py-10">
      <div className="w-fit mx-auto text-center">
        <h1 className="text-4xl text-zinc-800 font-semibold mb-5">
          Gestion de gallerie
        </h1>
        <p className="text-zinc-800">Gérez le contenu de gallerie</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
        {editions.map((e) => (
          <div key={e.edition_id} className="rounded-md border border-zinc-300 shadow relative overflow-hidden">
            <img src="/vote.png" alt="" />
            <div className="p-3">
                <div className="flex justify-between items-center">
                    <span className="text-lg">{e.annee}</span>
                    <Link to={`/admin/gallerie/${e.edition_id}`} className="py-1 px-4 border-2 border-[#004C91] text-[#004C91] rounded">Plus</Link>
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryPanel;
