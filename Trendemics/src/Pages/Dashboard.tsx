import React, { useState } from 'react';
import FilterWindow from '../Pages/Components/FilterWindow.tsx'; // Adjust the import path as necessary
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
                <div className="logo">Trendemics</div>
                <div className="tabButtons">
                    <button className={activeTab === 0 ? 'active' : ''} onClick={() => handleTabClick(0)}>Worldwide</button>
                    <button className={activeTab === 1 ? 'active' : ''} onClick={() => handleTabClick(1)}>Map Display</button>
                    <button className={activeTab === 2 ? 'active' : ''} onClick={() => handleTabClick(2)}>Multi-Country Average</button>
                    <button className={activeTab === 3 ? 'active' : ''} onClick={() => handleTabClick(3)}>Multi-Country Compare</button>
                </div>
            </nav>
            <div className="tabContent">
                {activeTab === 0 && <p> {showFilter && <FilterWindow onClose={() => setShowFilter(false)} />}</p>}
                {activeTab === 1 && <p> {showFilter && <FilterWindow onClose={() => setShowFilter(false)} />}</p>}
                {activeTab === 2 && <p>{showFilter && <FilterWindow onClose={() => setShowFilter(false)} />}</p>}
                {activeTab === 3 && <p> {showFilter && <FilterWindow onClose={() => setShowFilter(false)} />}</p>}
            </div>
           
        </div>
    );
};

export default Dashboard;
