import Link from "next/link";
import { useRouter } from "next/router";
import How from "./How";
import Image from "next/image";

export default function NavBar() {
  const router = useRouter();
  const active =
    router.route === "/" ? "home" : router.route === "/map" ? "map" : null;
  return (
    <nav className="flex text-ecnmy-breeze justify-between w-screen m-auto px-4 h-16 text-2xl bg-ecnmy-skyblue font-bold">
      <div>
        <Image src={ecnmyLogo} alt="logo for the charity 'Economy'" />
      </div>
      <section className="flex space-x-6">
        <div className="flex items-center">
          <img
            className="h-6 "
            src="https://www.seekpng.com/png/detail/339-3392184_home-icons-blue-home-icon-blue-png.png"
            alt=""
          />
          <Link href="/">
            <a
              className={
                active === "home"
                  ? "text-ecnmy-charcoal underline"
                  : "hover:text-ecnmy-charcoal hover:underline"
              }
            >
              Home
            </a>
          </Link>
        </div>
        <div className="flex items-center">
          <img
            className="h-6 "
            src="https://toppng.com/uploads/preview/map-command-comments-map-icon-11562897555gcydeuswdx.png"
            alt=""
          />
          <Link href="/map">
            <a
              className={
                active === "map"
                  ? "text-ecnmy-charcoal underline"
                  : "hover:text-ecnmy-charcoal hover:underline"
              }
            >
              Map
            </a>
          </Link>
        </div>
        <div className="flex items-center">
          <img
            className="h-6 "
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNAijsICRNxRmav5ikr__4kc9hbtTEsP-yuw&usqp=CAU"
            alt=""
          />
          <How />
        </div>
      </section>
    </nav>
  );
}
