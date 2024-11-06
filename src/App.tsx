import React from 'react';
import './App.css';
import BarChart from './components/ChartOne';
import CountryEmissionsChart from './components/ChartTwo';
import EuropeanCountries from './components/ChartThree';
import DifferentCountries from './components/ChartFour';
import HeatMap from './components/ChartFive';

const App: React.FC = () => {
  return (
    <div className="App">
      
      
      <div className="chart-container">
        <BarChart />
      </div>
      
      <div className="chart-container">
        <CountryEmissionsChart country="Qatar"/>
      </div>

      <div className="chart-container">
      <EuropeanCountries country="Afghanistan"/>
      </div>
      
      <div className="chart-container">
        <DifferentCountries country="Rwanda"/>
      </div>
      
      <div className="chart-container">
        <HeatMap year={2022}/>
      </div>
    </div>
  );
};

export default App;
