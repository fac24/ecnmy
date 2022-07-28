import Image from "next/image";
import Link from "next/link";
import ecnmyLogo from "../public/images/ecnmy-logo-white-background.png";
import onsLogo from "../public/images/ons-logo-white-background.png";
export default function Footer() {
  return (
    <>
      <footer className="text-xs pt-6 pb-8 px-11 flex justify-around items-center flex-wrap border-solid border-ecnmy-charcoal border-t-2 border-b-2">
        <div className="flex flex-row flex-wrap items-start gap-4">
          <p className="text-[16px] py-1 font-medium max-w-xs mb-2 flex flex-wrap">
            <strong>Data Sources</strong>
            This dashboard represents local data available from a range of
            sources, current sources including the following:
          </p>

          <div className="flex flex-wrap justify-around items-center gap-2">
            <Link href="https://www.ons.gov.uk/">
              <a className="w-44" rel="noreferrer" target="_blank">
                <Image
                  src={onsLogo}
                  alt="logo for the ONS with English and Welsh text (Office of National Statistics; Swyddfa Ystadegau Gwladol)"
                  // width={120}
                  // height={40}
                  className=""
                />
              </a>
            </Link>
          </div>
        </div>
      </footer>
      <div className="flex items-center gap-3 flex-wrap md:flex-nowrap justify-around my-10 max-w-[75%] mx-auto">
        <Link href="https://www.ecnmy.org/">
          <a
            target="_blank"
            className="max-w-[200px]"
            rel="noreferrer"
            data-test-id="ecmy-logo"
          >
            <Image
              src={ecnmyLogo}
              alt="logo for the charity 'Economy'"
              // width=""
              // height=""
              className=""
            />
          </a>
        </Link>
        <p className=" text-xs">
          <span className="font-semibold block">
            The Local cost of living dashboard is run by Economy
          </span>
          <i>Economy</i>’s vision is of a flourishing and sustainable society in
          which there is diverse and inclusive public conversation about the
          economy, and economics is a tool everybody can use to make confident
          personal choices; articulate their needs, values and priorities; take
          action to shape the economy and participate in democracy.
        </p>
      </div>
    </>
  );
}
