import Image from "next/image";
export default function loading() {
  return (
    <>
      <p className="text-xl animate-pulse">Loading ......</p>

      <h3 className="animate-spin origin-center text-center text-[200px]">
        &#9881;{" "}
      </h3>
    </>
  );
}
