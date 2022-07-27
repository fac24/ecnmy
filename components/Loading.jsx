import Image from "next/image";
import Loding from "../public/images/loading-11.gif";
export default function loading() {
  return (
    <>
      <div className="grid place-items-center">
        <Image
          src={Loding}
          alt="Picture of the author"
          width={300}
          height={200}
        />
        <p className="text-xl animate-pulse">Loading ......</p>
      </div>
    </>
  );
}
