import { useState } from "react";
import { useRouter } from "next/router";

const howDesc = {
  "/": { page: "Home", how: <ul><li>Welcome to the ECNMY Data Dashboard!</li> <li>Navigate to another page with the links in the navigation bar, or search on this page by location and topic, then use the GO button to see the relevant data.</li></ul> },
  "/[location]/topic/[topic]": {
    page: "Topic",
    how: <ul><li>On this page, you can find information relevant to the topic and location you have selected. These cards contain the name of the indicator and key statistics, as well as the source for the data. You can change the location and topic to change the cards displayed.</li><li>Hover over or focus the indicator terms to get a definition.</li><li>Hover over or focus the source for information on sample size and the year of the publication of the dataset.</li><li>Click through to see more detailed information about the dataset as well as a relevant chart and table.</li></ul>
  },
  "/[location]/indicator/[indicator]": {
    page: "Indicator",
    how: <ul><li>On this page, you can find important information about the study used.</li><li>A line chart shows the change in that indicator for the selected location. Below, a table contains the same information in a different form.</li><li>By selecting &apos;Get the data&apos;, you can download the data specific to the chart and table.</li></ul>
  },
  "/map": {
    page: "Map",
    how: <ul><li>On this page, you can see enter a topic and indicator relevant to that topic.</li><li>Hover over a borough to see the name of the borough with the value for the indicator in that borough.</li><li>Click on a borough to see more information about that indicator in the selected borough.</li></ul>
  }
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
              <h2 className="text-[30px] leading-relaxed font-semibold">{info.page}</h2>
              <p className="leading-loose">{info.how}</p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
