import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Brush, ResponsiveContainer } from 'recharts';
import { parseDomainOfCategoryAxis } from 'recharts/types/util/ChartUtils';
import { useAppContext } from './GetCountries';
import FilterWindow from './FilterWindow';

//FIXME??
interface ChartComponentProps {
  selectedValue: string; // Change the type according to your data
  selectedStateValue: string;
  selectedAgeValue: string;
  selectedRValue: string;
  selectedMValue: string;
  filterType: string;
}

const ChartComponent: React.FC<ChartComponentProps> = ({ selectedValue, 
  selectedStateValue, selectedAgeValue, selectedRValue, selectedMValue, filterType }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let defaultEndpoint = `http://localhost:4000/United States of America`;//FIXME should this have a default value?

        let apiEndpoint = `http://localhost:4000/${encodeURIComponent(selectedValue)}`;//FIXME should this have a default value?

        console.log("filterType in API: ",filterType);
        if (filterType === 'Vaccine') {
          if (selectedValue !== null) {
            apiEndpoint = `http://localhost:4000/government/${encodeURIComponent(selectedValue)}`; // Update with the correct endpoint
            } else {
              let apiEndpoint = defaultEndpoint;
            }
          //apiEndpoint = `http://localhost:4000/${encodeURIComponent(selectedValue)}`; // Update with the correct endpoint
        } else if (filterType === 'Government') {
          if (selectedValue !== null) {
          apiEndpoint = `http://localhost:4000/government/${encodeURIComponent(selectedValue)}`; // Update with the correct endpoint
          } else {
            let apiEndpoint = defaultEndpoint;
          }
        } else if (filterType === 'Mobility') {
          if (selectedMValue !== null && selectedValue !== null) {
          
            apiEndpoint = `http://localhost:4000/mobility/${encodeURIComponent(selectedValue)}`; // Update with the correct endpoint
          } else {
            let apiEndpoint = defaultEndpoint;
          }
          apiEndpoint = `http://localhost:4000/mobility/${encodeURIComponent(selectedValue)}`; // Update with the correct endpoint
        } else if (filterType === 'Race') {
          if (selectedStateValue !== null && selectedRValue !== null) {
          apiEndpoint = `http://localhost:4000/usrace/${encodeURIComponent(selectedStateValue)}/${encodeURIComponent(selectedRValue)}`; // Update with the correct endpoint
          }else {
            let apiEndpoint = defaultEndpoint;
          }
        } else if (filterType === 'Age') {
          if (selectedStateValue !== null && selectedAgeValue !== null) {
          apiEndpoint = `http://localhost:4000/usage/${encodeURIComponent(selectedStateValue)}/${encodeURIComponent(selectedAgeValue)}`; // Update with the correct endpoint
        }else {
          let apiEndpoint = defaultEndpoint;
        }
      }



        const response = await fetch(apiEndpoint);
        if (!response.ok) {
          console.log("filterType: ",filterType);
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const jsonData = await response.json();
        

        const parsedData = jsonData.map(([date, value]) => ({
          date: new Date(date),
          value: parseFloat(value),
        }));

        setData(parsedData);
        //console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, [selectedValue, filterType]);

  const formatDateTick = (tick) => {
    const date = new Date(tick);
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    return `${month} ${year}`;
  };

  return (
    <div>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart width={500} height={280} data={data} margin={{ bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis label={{ value: 'Date', position: 'bottomCenter', dy: 20 }} dataKey="date" tickFormatter={(tick) => new Date(tick).toLocaleDateString('default', { month: 'short' , year: 'numeric'})} />
          <YAxis label={{ value: 'Value', angle: -90, position: 'insideLeft', dy: -10 }} />
          <Tooltip labelFormatter={(label) => new Date(label).toLocaleDateString('default', { month: 'short' , year: 'numeric'})} />
          <Legend x = {0} y={360} payload={[
              { value: "Adjust Timescale", type: 'line', id: 'value' }, // Customize the legend name here
            ]} />
          <Line type="monotone" dataKey="value" stroke="#8884d8" name='Ratio of Factor to Covid Cases'/>
          <Brush
            dataKey="date" tickFormatter={(tick) => new Date(tick).toLocaleDateString('default', { month: 'short' , year: 'numeric'})}
            height={30}
            stroke="#8884d8"
            startIndex={0}
            endIndex={data.length > 0 ? data.length - 1 : 0}
            y={370}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartComponent;
