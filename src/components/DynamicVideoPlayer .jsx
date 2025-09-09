const DynamicVideoPlayer = ({ url }) => {
  let src = url;

  // Simple heuristic for known platforms
  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    const videoId = url.split("v=")[1] || url.split("/").pop();
    src = `https://www.youtube.com/embed/${videoId}`;
  } else if (url.includes("vimeo.com")) {
    const videoId = url.split("/").pop();
    src = `https://player.vimeo.com/video/${videoId}`;
  }else if (url.includes("facebook.com")){
    src = `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}`
  }

  return (
    <iframe
      src={src}
      frameBorder="0"
      allow="autoplay; fullscreen"
      allowFullScreen
      title="video"
      className="md:col-span-2 w-full h-100"
    />
  );
};

export default DynamicVideoPlayer;
