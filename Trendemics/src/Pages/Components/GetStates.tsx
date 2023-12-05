import React, { useState, createContext, useContext, useEffect } from 'react';

let AppContext = createContext('');//FIXME? add age

const GetStates = () => {
  const [menuOptions, setMenuOptions] = useState([]);
  const [selectedStateValue, setSelectedValue] = useState('');

  useEffect(() => {
    // Fetch menu options from your API
    const fetchMenuOptions = async () => {
      try {
        const response = await fetch('http://localhost:4000/get/states');
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
    const selectedStateValue = event.target.value;
    setSelectedValue(selectedStateValue);
    AppContext = createContext(selectedStateValue);//FIXME?

    // Call the function to make the API request with the selected option
   // makeApiRequest(selectedValue);
  };



  return (
    <div>
      <label htmlFor="myDropdown">Choose a state:</label>
      <select id="myDropdown" value={selectedStateValue} onChange={handleDropdownChange} style={{ width: '130px' }}>
      <option value="">Select an a state</option>
        {menuOptions.map((option, index) => (
          <option key={index} value={option[0]}>
            {option[0]}
          </option>
        ))}
      </select>

      {selectedStateValue && (
        <p>You selected: {selectedStateValue}</p>
      )}
    </div>
    
  );
};

//FIXME??
export default GetStates
export const useAppContextState = () => {
  return useContext(AppContext);
};


