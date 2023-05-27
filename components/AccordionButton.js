import React, { useState } from "react";
import {
  ChevronDownIcon,
  ChevronUpIcon,

} from "@heroicons/react/outline";

// import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";



const AccordionButton = ({ title, children }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div>
      <button type="button" onClick={() => setIsExpanded(!isExpanded)}>
        {title}
        {isExpanded ? (
          <ChevronUpIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
        ) : (
          <ChevronDownIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
        )}
      </button>
      {isExpanded ? children : null}
    </div>
  );
};

export default AccordionButton;
