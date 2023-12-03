import React, { useState, useEffect } from 'react';

const GetTuples = () => {
  const [fetchedInteger, setFetchedInteger] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:4000/get/tuples');

      if (response.ok) {
        const data = await response.json();
        setFetchedInteger(data);
        setShowResult(true);
        console.log(fetchedInteger);
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error during fetch:', error.message);
    }
  };

  useEffect(() => {
    if (showResult && fetchedInteger !== null) {
      console.log('Fetched Integer in useEffect:', fetchedInteger);
    }
  }, [showResult, fetchedInteger]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <p>&nbsp;&nbsp;</p>
      <button className='welcomeButton' onClick={fetchData}>Fetch Tuples</button>
      <p>&nbsp;</p>
      {showResult && (
        
        <p>Total Number of Tuples: {fetchedInteger}</p>
      )}
    </div>
  );
};

export default GetTuples;
