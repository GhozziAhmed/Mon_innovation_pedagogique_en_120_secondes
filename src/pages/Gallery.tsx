import axios from "axios";
import { useEffect, useState } from "react";


const Gallery = () => {
  const [photos, setPhotos] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/api/gallery").then((res) => {
      console.log(res);
      setPhotos(res.data);
    }).catch((err) => {
      console.log(err);
    })
  }, [])
  return (
    <div className="px-4 md:px-6 lg:px-20 relative top-20 py-20">
      <div className="w-fit mx-auto text-center">
        <h1 className="text-6xl font-semibold mb-3 text-zinc-800">Gallerie</h1>
        <p className="text-zinc-800">Découvrir les souvenirs du concours</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
        {
          photos.map((p) => (
            <div key={p.image_id} className="p-2 bg-zinc-200 rounded h-40">
              <img src={p.image_url} alt="" className="w-full h-full object-cover"/>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default Gallery;
