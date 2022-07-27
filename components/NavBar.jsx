import Link from "next/link";
import { useRouter } from "next/router";
import How from "./How";
import Image from "next/image";

export default function NavBar() {
  const router = useRouter();
  const active =
    router.route === "/" ? "home" : router.route === "/map" ? "map" : null;
  return (
    <nav className="grid place-items-center text-ecnmy-breeze  w-screen m-auto px-4 h-16 text-2xl bg-ecnmy-skyblue font-bold">
      <section className="flex space-x-6">
        <div className="flex items-center">
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
          <How />
        </div>
      </section>
    </nav>
  );
}
