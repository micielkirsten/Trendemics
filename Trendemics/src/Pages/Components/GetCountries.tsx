import React, { useState, useEffect } from 'react';

const GetCountries = () => {
  const [menuOptions, setMenuOptions] = useState([]);
  const [selectedValue, setSelectedValue] = useState('');

  useEffect(() => {
    // Fetch menu options from your API
    const fetchMenuOptions = async () => {
      try {
        const response = await fetch('http://localhost:4000/get/countries');
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
    const selectedValue = event.target.value;
    setSelectedValue(selectedValue);

    // Call the function to make the API request with the selected option
    makeApiRequest(selectedValue);
  };

  const makeApiRequest = async (selectedValue) => {
    try {
      const response = await fetch(`http://localhost:4000/${encodeURIComponent(selectedValue)}`);

      if (response.ok) {
        const data = await response.json();
        // Process the response data as needed
        console.log('API response:', data);
      } else {
        console.error('Failed to make API request');
      }
    } catch (error) {
      console.error('Error during API request:', error.message);
    }
    console.log('Making API request with selected value:', selectedValue);
  };

  return (
    <div>
      <label htmlFor="myDropdown">Choose an option:</label>
      <select id="myDropdown" value={selectedValue} onChange={handleDropdownChange} style={{ width: '130px' }}>
      <option value="">Select a country</option>
        {menuOptions.map((option, index) => (
          <option key={index} value={option[0]}>
            {option[0]}
          </option>
        ))}
      </select>

      {selectedValue && (
        <p>You selected: {selectedValue}</p>
      )}
    </div>
  );
};

export default GetCountries;
