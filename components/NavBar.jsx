import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="flex text-ecnmy-breeze justify-between max-w-4xl m-auto px-4 text-2xl bg-ecnmy-charcall rounded-lg">
      <div>Data</div>
      <section className="flex space-x-6">
        <div className="flex items-center">
          <img
            className="h-6 "
            src="https://www.seekpng.com/png/detail/339-3392184_home-icons-blue-home-icon-blue-png.png"
            alt=""
          />
          <Link href="/">
            <a>Home</a>
          </Link>
        </div>
        <div className="flex items-center">
          <img
            className="h-6 "
            src="https://toppng.com/uploads/preview/map-command-comments-map-icon-11562897555gcydeuswdx.png"
            alt=""
          />
          <Link href="/map">
            <a>Map</a>
          </Link>
        </div>
        <div className="flex items-center">
          <img
            className="h-6 "
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNAijsICRNxRmav5ikr__4kc9hbtTEsP-yuw&usqp=CAU"
            alt=""
          />
          <Link href="/how">
            <a>How</a>
          </Link>
        </div>
      </section>
    </nav>
  );
}
