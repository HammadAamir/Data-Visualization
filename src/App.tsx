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

      <nav className="navbar">
        <h1>Data Visualization</h1>
      </nav>

{/* Subheading */}
<div className="project-description">
  <p>Comparing Categories.</p>
  <p>Based on the dataset given for CO2 Emission and Fossil & Land Use.</p>
  <h2>D3.js for Data Visualization</h2>
</div>
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
