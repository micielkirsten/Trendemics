import React, { useState, useEffect } from "react";
import ChartComponent  from './ChartComponent';
import  GetCountries, { useAppContext } from './GetCountries';
import GetAges, {useAppContextAge} from './GetAges';
import GetStates, {useAppContextState} from './GetStates';
import GetRaces, {useAppContextRace} from "./GetRaces";
import GetMobility, {useAppContextMobility} from "./GetMobility";



interface FilterWindowProps {
  onClose: () => void;
  filterType: string; 
}

const FilterWindow: React.FC<FilterWindowProps> = ({ onClose, filterType }) => {
  const [filter, setFilter] = useState("");
  const [activeTab, setActiveTab] = useState(0);

  const blurbs = {
    Vaccine:
    `Here, we visualize the vaccination rate in a given country compared to COVID 
    case rate of that country, displayed over time. Please select the country you 
    are interested in to get started.`,
    Government:
  `Here, we visualize the government responses to the pandemic in a given country 
  compared to COVID case rate of that country, displayed over time. Government 
  responses are represented as a stringency index, which is an aggregated value of 
  such responses as school closings, income support, debt relief, testing policies, 
  face coverings, public events, and international travel. Please select the country
   you are interested in to get started.`,
    Mobility: `Here, we visualize the mobility patterns in a given country compared
     to COVID case rate of that country, displayed over time. Mobility patterns are
      available for transit stations, residential, workplaces, parks, grocery/pharmacy, 
      and retail/recreation. Please select the country and mobility pattern you are 
      interested in to get started.`, 
    Race: `Here, we visualize the incidence of COVID cases among people of a certain 
    age group as a factor of total COVID cases among all age groups. This data is 
    specific to the United States. Please select the state and age group you are 
    interested in to get started.
    `,
    Age: `Here, we visualize the incidence of COVID cases among people of a certain 
    race as a factor of total COVID cases among all races. This data is specific to 
    the United States. Please select the state and race you are interested in to get 
    started.
    `};



  useEffect(() => {
    console.log("filter", filter, "closed");
    setFilter(filterType);
  }, [filterType]);

  

  //FIXME?
  const selectedValue = useAppContext();
  const selectedAgeValue = useAppContextAge();
  const selectedStateValue = useAppContextState();
  const selectedRValue = useAppContextRace();
  const selectedMValue = useAppContextMobility();

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
    //console.log(filter);
  };

  const handleApplyFilter = () => {
    
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
      <GetStates/>
      <GetAges/>
      <GetRaces/>
      <GetMobility/>
      {/* More tabs */}
    </div>
    <div className="dropdown-menu"></div>
    <div className="graphPlaceholder">
    <ChartComponent selectedValue={selectedValue} selectedStateValue={selectedStateValue} selectedAgeValue={selectedAgeValue} selectedRValue={selectedRValue} selectedMValue={selectedMValue} filterType={filter}/>
    <div className = "blurbsContainer">
        <h4>Effects of {filterType} on Covid Cases </h4>
        <ul>
          {blurbs[filterType]}
        </ul>
      </div>
   
    </div>
  </div>
  
    );
  };
  
  export default FilterWindow;