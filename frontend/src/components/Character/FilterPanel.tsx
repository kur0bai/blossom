import { CHARACTER_BUTTONS, SPECIE_BUTTONS } from "@/constants/filterButtons";
import React, { useState } from "react";

export const FilterPanel = () => {
  const [characterFilter, setCharacterFilter] = useState();
  const [specieFilter, setSpecieFilter] = useState();

  return (
    <div className="absolute top-36 bg-white shadow w-[25%] left-3 border mx-auto z-[100] px-8 py-6 rounded-lg gap-4 flex flex-col">
      <div>
        <h3 className="text-gray-400 mb-4">Character</h3>
        <div className="flex flex-row justify-between gap-5">
          {CHARACTER_BUTTONS.map((btn) => (
            <button
              className="border w-full hover:text-primary-700 hover:bg-primary-100 py-4 rounded-md duration-300 capitalize"
              title={btn.value}
              value={btn.value}
            >
              {btn.value}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-gray-400 mb-4">Specie</h3>
        <div className="flex flex-row justify-between gap-5">
          {SPECIE_BUTTONS.map((btn) => (
            <button
              className="border w-full hover:text-primary-700 hover:bg-primary-100 py-4 rounded-md duration-300 capitalize"
              title={btn.value}
              value={btn.value}
            >
              {btn.value}
            </button>
          ))}
        </div>
      </div>
      <div>
        <button className="bg-primary-700 text-white min-w-[200px] hover:text-primary-600  py-4 rounded-md duration-300 capitalize w-full">
          Filter
        </button>
      </div>
    </div>
  );
};
