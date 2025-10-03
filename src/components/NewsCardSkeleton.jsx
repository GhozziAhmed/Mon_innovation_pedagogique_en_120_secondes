const NewsCardSkeleton = () => {
  return (
    <div className="bg-white w-80 rounded overflow-hidden max-w-full mx-auto animate-pulse">
      <div className="w-full bg-gray-300 h-40"></div>
      <div className="p-5 flex flex-col justify-between">
        <div>
          <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto mb-4"></div>
          <div className="h-3 bg-gray-300 rounded w-full mb-2"></div>
          <div className="h-3 bg-gray-300 rounded w-5/6 mx-auto"></div>
        </div>
        <div className="mt-4 h-3 bg-gray-300 rounded w-1/4"></div>
      </div>
    </div>
  );
};

export default NewsCardSkeleton;