import { dictionary } from "../database/dictionary";
import { useState } from "react";

export default function ToolTip({ indicator, tooltips }) {
  const [hover, setHover] = useState(false);

  function handleHover() {
    setHover(!hover);
  }

  return (
    <h2 className="capitalize relative overflow-visible bg-ecnmy-grape text-ecnmy-white m-3 p-2 self-center text-center rounded-lg w-10/12 text-lg font-bold">
      <span
        tabIndex={0}
        onMouseEnter={handleHover}
        onMouseLeave={handleHover}
        onFocus={handleHover}
        onBlur={handleHover}
      >
        {indicator}
      </span>
      <span
        className={`${
          hover
            ? "absolute inset-x-0 bottom-12 bg-ecnmy-charcoal rounded-lg text-ecnmy-white text-sm"
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
