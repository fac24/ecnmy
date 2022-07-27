import Link from "next/link";

export default function LocalStoryCard() {

    return (<div className="flex flex-col w-1/4 justify-evenly min-w-[320px] max-w-[360px]">
        <div className="bg-ecnmy-white mb-1 flex flex-col rounded-t-lg ">
            <h2 className="relative overflow-visible bg-ecnmy-navy self-center text-ecnmy-white m-3 p-2 text-center flex justify-between rounded-lg w-10/12 text-lg font-bold">
                Local Stories
            </h2>
        </div>
        <div className="bg-ecnmy-white mb-1 p-4 rounded-b-lg h-full ">
            <h3 className="text-ecnmy-navy text-4xl text-center font-semibold">
                Are you a journalist?
            </h3>
            <ul className="list-disc m-4 text-base">
            </ul>
            <section className="flex justify-between items-center">
                <div className="flex items-center">
                    Find out more about how to access a network of contributors who can share their lived experience of economic issues in your local area.
                </div>
            </section>
            <section className="pt-[45px] pb-[25px]">
                <Link href={`https://weare.ecnmy.org/about-us/contact-us/`}>
                    <a className="underline font-semibold hover:font-bold text-ecnmy-pumpkin">
                        More Info
                    </a>
                </Link>
            </section>
        </div>
    </div>
    )
}