import React, { useState, createContext, useContext, useEffect } from 'react';

let AppContext = createContext('');//FIXME?

const GetRaces = () => {
  const [menuOptions, setMenuOptions] = useState([]);
  const [selectedRValue, setSelectedValue] = useState('');

  useEffect(() => {
    // Fetch menu options from your API
    const fetchMenuOptions = async () => {
      try {
        const response = await fetch('http://localhost:4000/get/races');
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
    fetchMenuOptions();
  }, []); 

  const handleDropdownChange = (event) => {
    const selectedRValue = event.target.value;
    setSelectedValue(selectedRValue);
    AppContext = createContext(selectedRValue);//FIXME?

    // Call the function to make the API request with the selected option
   // makeApiRequest(selectedValue);
  };

  

  return (
    <div>
      <label htmlFor="myDropdown">Choose a race:</label>
      <select id="myDropdown" value={selectedRValue} onChange={handleDropdownChange} style={{ width: '130px' }}>
      <option value="">Select a race</option>
        {menuOptions.map((option, index) => (
          <option key={index} value={option[0]}>
            {option[0]}
          </option>
        ))}
      </select>

      {selectedRValue && (
        <p>You selected: {selectedRValue}</p>
      )}
    </div>
    
  );
};

//FIXME??
export default GetRaces;
export const useAppContextRace = () => {
  return useContext(AppContext);
};


