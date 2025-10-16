import React from "react";

const FilterHeader = ({ title }) => {
  return (
    <div className="flex items-center">
      <span className="text-text-green font-poppins text-lg  font-medium">
        {title}
      </span>
      <hr className="flex-1 border-Light-Silver ml-6 mt-2" />
    </div>
  );
};

export default FilterHeader;
