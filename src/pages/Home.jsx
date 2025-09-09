import Flow from "../sections/Flow";
import Hero from "../sections/Hero";
import News from "../sections/News";
import Partners from "../sections/Partners";

const Home = () => {
  return (
    <div className="relative top-20">
        <Hero />
        <Flow />
        <News />
        <Partners />
    </div>
  );
};

export default Home;
