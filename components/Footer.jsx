import Image from "next/image";
import Link from "next/link";
import ecnmyLogo from "../public/images/ecnmy-logo-white-background.png";
import onsLogo from "../public/images/ons-logo-white-background.png";
export default function Footer() {
    return (
        <footer className="text-xs bg-pistachioGreen pt-6 pb-8 px-11">
            <div className="grid grid-cols-2 gap-6 px-4 wrap-items">
                <div className="">
                    <h2 className="text-[16px] py-1 font-semibold">About <i>Economy</i></h2>
                    {/* this should link to the website */}
                    <Image
                        src={ecnmyLogo}
                        alt="logo for the charity 'Economy'"
                        // width=""
                        // height=""
                        className=""
                    ></Image>
                    <p>
                        <i>Economy</i>’s vision is of a flourishing and sustainable society in which there is diverse and inclusive public conversation about the economy, and economics is a tool everybody can use to make confident personal choices; articulate their needs, values and priorities; take action to shape the economy and participate in democracy.
                    </p>
                </div>

                <div className="flex flex-col items-start gap-4">
                    <p className="text-[16px] py-1 font-semibold">Data Sources</p>
                    <div className="flex gap-10">
                        {/* {/* <Image
                            src=""
                            alt=""
                            width={136}
                            height={50}
                            className=""
                        ></Image> */}
                        <Image
                            src={onsLogo}
                            alt="logo for the ONS with English and Welsh text (Office of National Statistics; Swyddfa Ystadegau Gwladol)"
                            width={120}
                            height={40}
                            className=""
                        ></Image>
                    </div>
                </div>
            </div>
        </footer>
    );
}