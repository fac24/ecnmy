import { useState } from "react";
import { useRouter } from "next/router";

const howDesc = {
  "/": { page: "Home", how: "Homepage search for location and topic" },
  "/[location]/topic/[topic]": {
    page: "Topic",
    how: "Topic page see topics based on search criteria, can change location, or topic, hover over indicator to view definitiion, click on the stats to view more detailed stats on the indicator",
  },
  "/[location]/indicator/[indicator]": {
    page: "Indicator",
    how: "Indicator page, view more detailed stats on a certain indicator",
  },
};

export default function How({ params }) {
  const [isOpen, setIsOpen] = useState(false);
  const info = howDesc[useRouter().route];

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button
        onClick={togglePopup}
        className={
          isOpen
            ? "text-ecnmy-charcoal underline"
            : "hover:text-ecnmy-charcoal hover:underline"
        }
      >
        How
      </button>
      {isOpen ? (
        <div className="greyed-bg fixed w-full h-screen top-0 left-0 z-[1]">
          <div className="box relative h-auto rounded p-5 overflow-auto bg-ecnmy-white border">
            <span
              className="close-icon bg-ecnmy-charcoal border"
              onClick={togglePopup}
            >
              x
            </span>
            <div className="text-ecnmy-charcoal text-base">
              <h1 className="text-2xl">{info.page}:</h1>
              <p>{info.how}</p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
