import { dictionary } from "../database/dictionary";
import { useState } from "react";

export default function ToolTip({ indicator, tooltips }) {
  const [hover, setHover] = useState(false);

  function handleHover() {
    setHover(!hover);
  }

  return (
    <h2 className=" relative overflow-visible bg-ecnmy-grape self-center text-ecnmy-white m-3 p-2 text-center flex justify-between rounded-lg w-10/12 text-lg font-medium">
      <span></span>
      <span
        onMouseEnter={handleHover}
        onMouseLeave={handleHover}
        onFocus={handleHover}
        onBlur={handleHover}
        className="capitalize-first"
      >
        {indicator}
      </span>
      <span
        tabIndex={0}
        onMouseEnter={handleHover}
        onMouseLeave={handleHover}
        onFocus={handleHover}
        onBlur={handleHover}
      >
        &#9432;
      </span>

      <span
        className={`${
          hover
            ? "absolute inset-x-0 bottom-12 bg-ecnmy-black rounded-lg text-ecnmy-white p-2 text-sm capitalize-first"
            : "hidden"
        }`}
      >
        <ul>
          {tooltips.map((tooltip, index) => (
            <li key={index}>
              {tooltip}: {dictionary[tooltip]}
            </li>
          ))}
        </ul>
      </span>
    </h2>
  );
}
