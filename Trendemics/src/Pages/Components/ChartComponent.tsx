import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Brush, ResponsiveContainer } from 'recharts';
import { parseDomainOfCategoryAxis } from 'recharts/types/util/ChartUtils';

const ChartComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/get/vaccines');
        if (!response.ok) {
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
  }, []);

  const formatDateTick = (tick) => {
    const date = new Date(tick);
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    return `${month} ${year}`;
  };

  return (
    <div>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart width={500} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tickFormatter={(tick) => new Date(tick).toLocaleDateString('default', { month: 'short' , year: 'numeric'})} />
          <YAxis />
          <Tooltip labelFormatter={(label) => new Date(label).toLocaleDateString('en-GB')} />
          <Legend payload={[
              { value: 'New Vaccine doses administered', type: 'line', id: 'value' }, // Customize the legend name here
            ]} />
          <Line type="monotone" dataKey="value" stroke="#8884d8" name='New Vaccine doses administered' />
          <Brush
            dataKey="date" tickFormatter={(tick) => new Date(tick).toLocaleDateString('default', { month: 'short' , year: 'numeric'})}
            height={30}
            stroke="#8884d8"
            startIndex={0}
            endIndex={data.length > 0 ? data.length - 1 : 0}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartComponent;
