import React, { useState } from "react";

//new graph import statements
import { AxisLeft, AxisBottom } from '@vx/axis';
import { appleStock } from '@vx/mock-data';
import { scaleTime, scaleLinear } from '@vx/scale';
import { extent, max } from 'd3-array';
import { AreaClosed } from '@vx/shape';
import { Group } from '@vx/group';
import { LinearGradient } from '@vx/gradient';
//import { Zoom } from '@vx/zoom'; //Can use this to alter x-axis, maybe?

//graph values
const data = appleStock;
const width = 750;
const height = 400;

const margin = {
  top: 60,
  bottom: 60,
  left: 80,
  right: 80,
};
const xMax = width - margin.left - margin.right;
const yMax = height - margin.top - margin.bottom;

//graph data
const x = d => new Date(d.date);
const y = d => d.close;
data.map(y);

console.log(x(data[0])); // Fri Aug 21 1970 12:23:21 GMT-0600 (MDT)
console.log(y(data[0])); // 72.2

const xScale = scaleTime({
  range: [0, xMax],
  domain: extent(data, x)
});

const yScale = scaleLinear({
  range: [yMax, 0],
  domain: [0, max(data, y)],
});

const chart = (
  <div>
    <svg width={width} height={height}>
      <LinearGradient
              from='#fbc2eb'
              to='#a6c1ee'
              id='gradient'
            />
      <Group top={margin.top} left={margin.left}>
      
            <AxisLeft
              scale={yScale}
              top={0}
              left={0}
              label={'Close Price ($)'}
              stroke={'#1b1a1e'}
            />
          <AxisBottom
              scale={xScale}
              top={yMax}
              label={'Years'}
              stroke={'#1b1a1e'}
            />
      </Group>
  </svg>
</div>
)

interface FilterWindowProps {
  onClose: () => void;
}

const FilterWindow: React.FC<FilterWindowProps> = ({ onClose }) => {
  const [filter, setFilter] = useState("");
  const [activeTab, setActiveTab] = useState(0);

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
    {/* More tabs */}
  </div>
  <div className="graphPlaceholder">
    {chart}
    <p>Graph will be displayed here</p>
  </div>
</div>

  );
};

export default FilterWindow;
