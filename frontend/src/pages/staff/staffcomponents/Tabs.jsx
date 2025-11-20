import React from 'react';

const Tabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="flex justify-center bg-white rounded-full shadow py-2 px-4 items-center">
      {tabs.map((tab, idx) => (
        <button
          key={tab.name}
          onClick={() => setActiveTab(tab.name)}
          className={`flex items-center px-5 py-2 rounded-full transition-all duration-300 ease-in-out text-base font-medium
            ${idx === 0 ? 'ml-6' : ''} 
            ${activeTab === tab.name
              ? 'bg-blue-600 text-white shadow'
              : 'bg-transparent text-gray-700 hover:bg-blue-100 hover:text-blue-600'
            }`}
        >
          {tab.icon && <tab.icon className="mr-2 h-5 w-5" />}
          {tab.name}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
