import React, { useState, createContext, useContext, useEffect } from 'react';

let AppContext = createContext('');//FIXME? add age

const GetAges = () => {
  const [menuOptions, setMenuOptions] = useState([]);
  const [selectedAgeValue, setSelectedValue] = useState('');

  useEffect(() => {
    // Fetch menu options from your API
    const fetchMenuOptions = async () => {
      try {
        const response = await fetch('http://localhost:4000/get/ages');
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
    const selectedAgeValue = event.target.value;
    setSelectedValue(selectedAgeValue);
    AppContext = createContext(selectedAgeValue);//FIXME?

    // Call the function to make the API request with the selected option
   // makeApiRequest(selectedValue);
  };



  return (
    <div>
      <label htmlFor="myDropdown">Choose an age:</label>
      <select id="myDropdown" value={selectedAgeValue} onChange={handleDropdownChange} style={{ width: '130px' }}>
      <option value="">Select an age range</option>
        {menuOptions.map((option, index) => (
          <option key={index} value={option[0]}>
            {option[0]}
          </option>
        ))}
      </select>

      {selectedAgeValue && (
        <p>You selected: {selectedAgeValue}</p>
      )}
    </div>
    
  );
};

//FIXME??
export default GetAges;
export const useAppContextAge = () => {
  return useContext(AppContext);
};


