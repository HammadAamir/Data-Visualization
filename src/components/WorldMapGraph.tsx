// src/components/WorldMapChart.tsx
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { feature } from 'topojson-client';
import { Topology } from 'topojson-specification';  // Import Topology from TopoJSON

const WorldMapChart: React.FC = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [hoveredCountryData, setHoveredCountryData] = useState<string | null>(null);

  useEffect(() => {
    // Load world map and emissions data
    Promise.all([
      d3.json('https://unpkg.com/world-atlas@1.1.4/world/110m.json') as Promise<Topology>, // World map data
      d3.csv('/co-emissions-per-capita.csv') // CO2 emissions data
    ]).then(([worldData, emissionsData]) => {
      // Convert the TopoJSON into GeoJSON (feature collection)
      const countries = feature(worldData, worldData.objects.countries) as any; // Cast as 'any' to avoid TypeScript error
      const countryFeatures = countries.features; // Access the 'features' array
        console.log(countryFeatures)
      // Map emissions data by country name (Entity column)
      const emissionsMap = new Map<string, number>();
      emissionsData.forEach((d) => {
        emissionsMap.set(d['Entity'], +d['Annual_CO2_emissions_(per_capita)']);
      });

      // Set map dimensions and margins
      const width = 960;
      const height = 600;
      const margin = { top: 20, right: 20, bottom: 40, left: 40 };

      // Clear previous SVG content
      d3.select(svgRef.current).selectAll('*').remove();

      // Create SVG container
      const svg = d3
        .select(svgRef.current)
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      // Create a projection and path generator for the world map
      const projection = d3.geoMercator().scale(150).translate([width / 2, height / 1.5]);
      const path = d3.geoPath().projection(projection);

      // Define color scale for emissions
      const colorScale = d3
        .scaleSequential(d3.interpolateYlOrRd)
        .domain([0, d3.max(emissionsData, (d) => +d['Annual_CO2_emissions_(per_capita)']) || 1]);

      // Draw the map
      svg
        .selectAll('path')
        .data(countryFeatures) // Use the country features array
        .enter()
        .append('path')
        
        .attr('d', (d: any) => {
            const pathValue = path(d);
            return pathValue ? pathValue : ''; // Ensure null values are handled
          })
        .attr('fill', (d: any) => {
          const countryName = d.properties.name; // Access the country name from the 'properties' object
          const emissions = emissionsMap.get(countryName) || 0;
          return colorScale(emissions); // Color based on emissions data
        })
        .attr('stroke', '#ccc')
        .attr('stroke-width', 0.5)
        .on('mouseover', (event, d: any) => {
          const countryName = d.properties.name;
          const emissions = emissionsMap.get(countryName) || 0;
          setHoveredCountryData(`${countryName}: ${emissions.toFixed(2)} CO₂ per capita`);
        })
        .on('mouseout', () => {
          setHoveredCountryData(null);
        });

      // Add labels or tooltips for hover
      svg
        .append('text')
        .attr('id', 'tooltip')
        .attr('x', width / 2)
        .attr('y', height - 10)
        .attr('text-anchor', 'middle')
        .attr('font-size', '14px')
        .text(hoveredCountryData || 'Hover over a country');
    });
  }, [hoveredCountryData]);

  return (
    <div>
      <h2>CO₂ Emissions World Map</h2>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default WorldMapChart;
