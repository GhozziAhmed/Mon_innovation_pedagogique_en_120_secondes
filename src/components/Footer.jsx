import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-[#D9D9D9] w-full relative top-20 pt-10">
      <div className="px-8 md:px-10 lg:px-20">
        <div className="flex justify-center lg:justify-start mb-5">
          <img src="/logo_transparent.png" alt="" className="w-75" />
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-0">
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <h1 className="text-xl font-semibold text-zinc-800">Pages</h1>
            <ul className="flex flex-col gap-2 mt-3 text-zinc-700">
              <li>Acceuil</li>
              <li>Votez</li>
              <li>Resultats</li>
              <li>Gallerie</li>
              <li>Contact</li>
            </ul>
          </div>
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <h1 className="text-xl font-semibold text-zinc-800">Emails</h1>
            <ul className="flex flex-col gap-2 mt-3 text-zinc-700">
              <li>innovationpedagogique2@gmail.com</li>
              <li>con.interna.pedagogique@gmail.com</li>
              <li>concours.inovation120@gmail.com</li>
              <li>concours.innovp120@usf.tn</li>
              <li>aefca.cmr@gmail.com</li>
            </ul>
          </div>
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <h1 className="text-xl font-semibold text-zinc-800">Téléphone</h1>
            <ul className="flex flex-col gap-2 mt-3 text-zinc-700">
              <li>+241 74829323</li>
              <li>+228 90838021</li>
              <li>+228 90622066</li>
              <li>+216 95092304</li>
              <li>+229 95206304</li>
            </ul>
          </div>
          <div className="flex flex-col items-center lg:items-start">
            <h1 className="text-xl text-zinc-800 font-semibold mb-3">
              Contact Us
            </h1>
            <input
              type="email"
              className="border border-zinc-800 rounded p-2 focus:outline-none focus:border focus:border-[#004C91] bg-white mb-5 w-full"
              placeholder="Email"
            />
            <div className="flex gap-2">
              <a href="facebook.com">
                <FontAwesomeIcon
                  icon={faFacebook}
                  className="text-3xl text-[#0866FF]"
                />
              </a>
              <a href="instagram.com">
                <FontAwesomeIcon
                  icon={faInstagram}
                  className="text-3xl text-[#E1306C]"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-20 h-[1px] w-full bg-zinc-400"></div>
      <div className="w-full px-8 md:px-10 lg:px-20 py-5 text-zinc-700 flex flex-col items-center gap-5 md:gap-0 md:flex-row md:justify-between">
        <span className="">
            © Mon Innovation Pedagogique en 120 secondes
        </span>
        <div className="flex gap-5">
            <Link to="/">Termes et Conditions</Link>
            <Link to="/">politique de confidentialité</Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
