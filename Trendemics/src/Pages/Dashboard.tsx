import React, { useState } from 'react';
import FilterWindow from '../Pages/Components/FilterWindow'; // Adjust the import path as necessary
import '../App.css'; // Make sure this path is correct

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [showFilter, setShowFilter] = useState(false);

    const handleTabClick = (index: number) => {
        setActiveTab(index);
    };

    return (
        <div className="dashboardContainer">
            <nav className="dashboardNav">
            <a href="http://localhost:3000" className="logo">Trendemics</a>
                <div className="tabButtons">
                    <button className={activeTab === 0 ? 'active' : ''} onClick={() => {handleTabClick(0); setShowFilter(true);}}>Worldwide</button>
                    <button className={activeTab === 1 ? 'active' : ''} onClick={() => {handleTabClick(1); setShowFilter(true);}}>Map Display</button>
                    <button className={activeTab === 2 ? 'active' : ''} onClick={() => {handleTabClick(2); setShowFilter(true);}}>Multi-Country Average</button>
                    <button className={activeTab === 3 ? 'active' : ''} onClick={() => {handleTabClick(3); setShowFilter(true);}}>Multi-Country Compare</button>
                </div>
            </nav>
            <div className="tabContent">
                {activeTab === 0 && <p> {showFilter && <FilterWindow onClose={() => setShowFilter(false)} filterType="Worldwide" />}</p>}
                {activeTab === 1 && <p> {showFilter && <FilterWindow onClose={() => setShowFilter(false)} filterType="Map Display" />}</p>}
                {activeTab === 2 && <p>{showFilter && <FilterWindow onClose={() => setShowFilter(false)} filterType ="Average"/>}</p>}
                {activeTab === 3 && <p> {showFilter && <FilterWindow onClose={() => setShowFilter(false)} filterType ="Compare" />}</p>}
                <p>Click on any of the links above.</p>
            
            </div>
           
        </div>
    );
};

export default Dashboard;
