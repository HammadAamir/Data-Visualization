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
      
      <div className="homepage">
      <section className="section">
        <div className="background-image"></div>
        <div className="card">
            <BarChart />
        </div>
      </section>
      <section className="section">
        <div className="background-image"></div>
        <div className="card">
          <CountryEmissionsChart country="Qatar"/>
        </div>
      </section>
      <section className="section">
        <div className="background-image"></div>
        <div className="card">
          <EuropeanCountries country="Afghanistan"/>
        </div>
      </section>
      <section className="section">
        <div className="background-image"></div>
        <div className="card">
          <DifferentCountries country="Rwanda"/>
        </div>
      </section>
      <section className="section">
        <div className="background-image"></div>
        <div className="card">
          <HeatMap year={2022}/>
        </div>
      </section>
      {/* Add more sections if needed */}
    </div>
    </div>
  );
};

export default App;
