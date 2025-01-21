"use client";

import React, { useState } from "react";
import Checkbox from "./_components/Checkbox_1";

const Page = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleCheckboxChange = (newChecked) => {
    setIsChecked(newChecked);
    console.log("Checkbox state:", newChecked);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Checkbox value={isChecked} onChange={handleCheckboxChange} disabled={isDisabled} />

      <div className="mt-8 space-y-4">
        <button
          onClick={() => setIsDisabled(!isDisabled)}
          className="px-4 py-2 bg-blue-500 text-white rounded shadow-md hover:bg-blue-600 transition"
        >
          Toggle Disabled ({isDisabled ? "On" : "Off"})
        </button>

        <button
          onClick={() => setIsChecked(!isChecked)}
          className="px-4 py-2 bg-green-500 text-white rounded shadow-md hover:bg-green-600 transition"
        >
          Toggle Checkbox ({isChecked ? "Checked" : "Unchecked"})
        </button>
      </div>
    </div>
  );
};

export default Page;
