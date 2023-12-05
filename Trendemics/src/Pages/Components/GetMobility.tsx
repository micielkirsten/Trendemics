import React, { useState, createContext, useContext, useEffect } from 'react';

let AppContext = createContext('');//FIXME? add age

const GetMobility = () => {
  const [menuOptions, setMenuOptions] = useState([]);
  const [selectedMValue, setSelectedValue] = useState('');

  useEffect(() => {
    // Fetch menu options from your API
    const fetchMenuOptions = async () => {
      try {
        const response = await fetch('http://localhost:4000/get/mobility');
        console.log("respone",response);
        if (response.ok) {
          const data = await response.json();
          setMenuOptions(data); // Assuming data is an array of options
        } else {
          console.error('Failed to fetch menu options');
        }
      } catch (error) {
        console.error('Error during menu options fetch:', error.message);
      }
    };

    // Call the fetch function
   // fetchMenuOptions();
   let patterns = [`TRANSIT_STATIONS`, `GROCERY_PHARMACY`, `PARKS`, `RESIDENTIAL`, `RETAIL_RECREATION`, `WORKPLACES`];
    setMenuOptions(patterns);
  }, []); 

  const handleDropdownChange = (event) => {
    const selectedMValue = event.target.value;
    setSelectedValue(selectedMValue);
    AppContext = createContext(selectedMValue);//FIXME?

    // Call the function to make the API request with the selected option
   // makeApiRequest(selectedValue);
  };



  return (
    <div>
      <label htmlFor="myDropdown">Choose a mobility pattern</label>
      <select id="myDropdown" value={selectedMValue} onChange={handleDropdownChange} style={{ width: '130px' }}>
      <option value="">Select an a mobility pattern</option>

        {menuOptions.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>

      {selectedMValue && (
        <p>You selected: {selectedMValue}</p>
      )}
    </div>
    
  );
};

//FIXME??
export default GetMobility;
export const useAppContextMobility = () => {
  return useContext(AppContext);
};


