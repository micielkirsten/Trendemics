import React, { useState, useEffect } from "react";
import ChartComponent  from './ChartComponent';
import  GetCountries, { useAppContext } from './GetCountries';




interface FilterWindowProps {
  onClose: () => void;
  filterType: string; 
}

const FilterWindow: React.FC<FilterWindowProps> = ({ onClose }) => {
  const [filter, setFilter] = useState("");
  const [activeTab, setActiveTab] = useState(0);

  //FIXME?
  const selectedValue = useAppContext();

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  const handleApplyFilter = () => {
    // Do something with the filter value
    onClose();
  };

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };
  
return (
  <div className="filterWindow">
    <div className="filterTabs">
      <button onClick={() => handleTabClick(0)} className={activeTab === 0 ? 'active' : ''}>Tab 1</button> 
      <button onClick={() => handleTabClick(1)} className={activeTab === 1 ? 'active' : ''}>Tab 2</button>
      <GetCountries/>
      {/* More tabs */}
    </div>
    <div className="dropdown-menu"></div>
    <div className="graphPlaceholder">
    <ChartComponent selectedValue={selectedValue}/>
      <p></p>
    </div>
  </div>
  
    );
  };
  
  export default FilterWindow;