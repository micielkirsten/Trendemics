import React, { useState, useEffect } from 'react';
import FilterWindow from '../Pages/Components/FilterWindow'; // Adjust the import path as necessary
import '../App.css'; // Make sure this path is correct

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [showFilter, setShowFilter] = useState(false);
    const [filterType, setFilterType] = useState('');

    const tabFilterMapping = {
        0: 'Vaccine',
        1: 'Government',
        2: 'Mobility',
        3: 'Race',
        4: 'Age',
    };

    const handleTabClick = (index: number) => {
        setFilterType(tabFilterMapping[index]);
        setActiveTab(index);
        setShowFilter(true);
    };

    useEffect(() => {
        setFilterType(tabFilterMapping[activeTab]);
        console.log("Tab was clicked", filterType);
      }, [filterType, activeTab, showFilter]);

    return (
        <div className="dashboardContainer">
            <nav className="dashboardNav">
            <a href="http://localhost:3000" className="logo">Trendemics</a>
                <div className="tabButtons">
                
                    <button className={activeTab === 0 ? 'active' : ''} onClick={() => {handleTabClick(0); }}>World: Vaccine Doses</button>
                    <button className={activeTab === 1 ? 'active' : ''} onClick={() => {handleTabClick(1); }}>World: Government Responses</button>
                    <button className={activeTab === 2 ? 'active' : ''} onClick={() => {handleTabClick(2); }}>World: Mobility Patterns</button>
                    <button className={activeTab === 3 ? 'active' : ''} onClick={() => {handleTabClick(3); }}>US: Race</button>
                    <button className={activeTab === 4 ? 'active' : ''} onClick={() => {handleTabClick(4); }}>US: Age</button>
                </div>
            </nav>
            <div className="tabContent">
            {showFilter && <FilterWindow onClose={() => setShowFilter(false)} filterType={tabFilterMapping[activeTab]} />}
              
            
            </div>
           
        </div>
    );
};

export default Dashboard;
