import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";


const Gallery = () => {
  const [photos, setPhotos] = useState([]);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    axios.get("https://mon-innovation-pedagogique-en-120.onrender.com/api/gallery").then((res) => {
      console.log(res);
      setPhotos(res.data);
    }).catch((err) => {
      console.log(err);
    })
  }, [])

  const openViewer = (index) => {
    setCurrentIndex(index);
    setIsViewerOpen(true);
  };

  const closeViewer = () => {
    setIsViewerOpen(false);
  };

  const showPrev = (e) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const showNext = (e) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  useEffect(() => {
    if (!isViewerOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") closeViewer();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isViewerOpen, photos.length]);
  return (
    <div className="px-4 md:px-6 lg:px-20 relative top-20 py-20">
      <div className="w-fit mx-auto text-center">
        <h1 className="text-6xl font-semibold mb-3 text-zinc-800">Gallerie</h1>
        <p className="text-zinc-800">Découvrir les souvenirs du concours</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
        {
          photos.map((p, idx) => (
            <button
              key={p.image_id}
              className="p-2 bg-zinc-200 rounded h-40 cursor-pointer"
              onClick={() => openViewer(idx)}
            >
              <img src={p.image_url} alt="" className="w-full h-full object-cover rounded"/>
            </button>
          ))
        }
      </div>
      {isViewerOpen && photos.length > 0 && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
          onClick={closeViewer}
        >
          <div className="relative w-full h-full md:w-[90%] md:h-[90%] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <img
              src={photos[currentIndex]?.image_url}
              alt=""
              className="max-w-[90%] max-h-[85%] object-contain shadow-xl"
            />
            <button
              aria-label="Fermer"
              className="absolute top-5 right-5 text-white text-3xl md:text-4xl cursor-pointer"
              onClick={closeViewer}
            >
              ×
            </button>
            {photos.length > 1 && (
              <>
                <button
                  aria-label="Précédent"
                  className="absolute left-4 md:left-6 text-white text-xl md:text-3xl p-3 rounded-full hover:bg-white/10 select-none cursor-pointer"
                  onClick={showPrev}
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <button
                  aria-label="Suivant"
                  className="absolute right-4 md:right-6 text-white text-xl md:text-3xl p-3 rounded-full hover:bg-white/10 select-none cursor-pointer"
                  onClick={showNext}
                >
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm bg-black/40 px-3 py-1 rounded-full">
                  {currentIndex + 1} / {photos.length}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
