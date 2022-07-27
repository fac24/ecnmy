import { useState } from "react";

export default function HealthWarning({ metadata, year }) {
  const [warning, setWarning] = useState(false);

  function handleWarning() {
    setWarning(!warning);
  }
  return (
    <div className="relative overflow-visible text-ecnmy-white m-3 p-2 text-right rounded-lg  text-lg font-bold">
      <span
        tabIndex={0}
        onMouseEnter={handleWarning}
        onMouseLeave={handleWarning}
        onFocus={handleWarning}
        onBlur={handleWarning}
        className="text-ecnmy-mustard bg-ecnmy-black rounded-full p-0.5 cursor-pointer"
      >
        &#9888;
      </span>
      <span
        className={`${
          warning
            ? "absolute inset-x-0 top-12 bg-ecnmy-charcoal rounded-lg text-ecnmy-white text-sm text-left p-2 z-[1] min-w-[150px] w-full"
            : "hidden"
        }`}
      >
        <ul>
          <li>Source: {metadata.source}</li>
          {metadata.sampleSize === null ? null : (
            <li>Sample size: {metadata.sampleSize}</li>
          )}
          <li>Year collected: {year}</li>
        </ul>
      </span>
    </div>
  );
}
