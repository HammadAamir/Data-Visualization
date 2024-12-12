import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { sankey, sankeyLinkHorizontal } from 'd3-sankey';

const AlluvialDiagram = () => {
  // Expanded data with continents, countries, and emissions
  const data = [
    // Continent: Asia
    { continent: 'Asia', country: 'Afghanistan', emissions: { 'Land Use Change': 6253312, 'Total CO2 Emissions': 14656 } },
    { continent: 'Asia', country: 'India', emissions: { 'Land Use Change': 118000000, 'Total CO2 Emissions': 2000000 } },
    { continent: 'Asia', country: 'China', emissions: { 'Land Use Change': 208000000, 'Total CO2 Emissions': 2000000 } },

    // Continent: North America
    { continent: 'North America', country: 'United States', emissions: { 'Land Use Change': 3087250000, 'Total CO2 Emissions': 38730000 } },

    // Continent: South America
    { continent: 'South America', country: 'Brazil', emissions: { 'Land Use Change': 48000000, 'Total CO2 Emissions': 2000000 } },

    // More countries and emissions data
    { continent: 'Europe', country: 'Germany', emissions: { 'Land Use Change': 100000000, 'Total CO2 Emissions': 35000000 } },
    { continent: 'Europe', country: 'France', emissions: { 'Land Use Change': 75000000, 'Total CO2 Emissions': 30000000 } },
    { continent: 'Africa', country: 'Nigeria', emissions: { 'Land Use Change': 25000000, 'Total CO2 Emissions': 8000000 } },
    { continent: 'Africa', country: 'South Africa', emissions: { 'Land Use Change': 30000000, 'Total CO2 Emissions': 10000000 } },
  ];

  const width = 1000;
  const height = 600;
  const margin = { top: 40, right: 20, bottom: 20, left: 20 };

  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    // Prepare nodes for Sankey diagram
    const nodes = [
      { name: 'Asia' },
      { name: 'North America' },
      { name: 'South America' },
      { name: 'Europe' },
      { name: 'Africa' },
      { name: 'Afghanistan' },
      { name: 'India' },
      { name: 'China' },
      { name: 'United States' },
      { name: 'Brazil' },
      { name: 'Germany' },
      { name: 'France' },
      { name: 'Nigeria' },
      { name: 'South Africa' },
      { name: 'Land Use Change' },
      { name: 'Total CO2 Emissions' },
    ];

    // Prepare links (flows) between nodes
    const links = [
      // Continent to Country
      { source: 0, target: 5, value: 6253312 }, // Asia -> Afghanistan
      { source: 0, target: 6, value: 118000000 }, // Asia -> India
      { source: 0, target: 7, value: 208000000 }, // Asia -> China
      { source: 1, target: 8, value: 3087250000 }, // North America -> United States
      { source: 2, target: 9, value: 48000000 }, // South America -> Brazil
      { source: 3, target: 10, value: 100000000 }, // Europe -> Germany
      { source: 3, target: 11, value: 75000000 }, // Europe -> France
      { source: 4, target: 12, value: 25000000 }, // Africa -> Nigeria
      { source: 4, target: 13, value: 30000000 }, // Africa -> South Africa

      // Country to Emissions (Land Use Change and Total CO2 Emissions)
      { source: 5, target: 14, value: 6253312 }, // Afghanistan -> Land Use Change
      { source: 5, target: 15, value: 14656 }, // Afghanistan -> Total CO2 Emissions
      { source: 6, target: 14, value: 118000000 }, // India -> Land Use Change
      { source: 6, target: 15, value: 2000000 }, // India -> Total CO2 Emissions
      { source: 7, target: 14, value: 208000000 }, // China -> Land Use Change
      { source: 7, target: 15, value: 2000000 }, // China -> Total CO2 Emissions
      { source: 8, target: 14, value: 3087250000 }, // United States -> Land Use Change
      { source: 8, target: 15, value: 38730000 }, // United States -> Total CO2 Emissions
      { source: 9, target: 14, value: 48000000 }, // Brazil -> Land Use Change
      { source: 9, target: 15, value: 2000000 }, // Brazil -> Total CO2 Emissions
      { source: 10, target: 14, value: 100000000 }, // Germany -> Land Use Change
      { source: 10, target: 15, value: 35000000 }, // Germany -> Total CO2 Emissions
      { source: 11, target: 14, value: 75000000 }, // France -> Land Use Change
      { source: 11, target: 15, value: 30000000 }, // France -> Total CO2 Emissions
      { source: 12, target: 14, value: 25000000 }, // Nigeria -> Land Use Change
      { source: 12, target: 15, value: 8000000 }, // Nigeria -> Total CO2 Emissions
      { source: 13, target: 14, value: 30000000 }, // South Africa -> Land Use Change
      { source: 13, target: 15, value: 10000000 }, // South Africa -> Total CO2 Emissions
    ];

    // Create the Sankey diagram layout
    const sankeyGenerator = sankey()
      .nodeWidth(20)
      .nodePadding(40)
      .size([width - margin.left - margin.right, height - margin.top - margin.bottom]);

    const { nodes: sankeyNodes, links: sankeyLinks } = sankeyGenerator({ nodes, links });

    // Color scales
    const continentColor = d3.scaleOrdinal()
      .domain(['Asia', 'North America', 'South America', 'Europe', 'Africa'])
      .range(d3.schemeCategory10);

    const emissionColor = d3.scaleOrdinal()
      .domain(['Land Use Change', 'Total CO2 Emissions'])
      .range(['#ff7f0e', '#1f77b4']);

    // Append links (flows)
    svg.selectAll('.link')
      .data(sankeyLinks)
      .enter().append('path')
      .attr('class', 'link')
      .attr('d', sankeyLinkHorizontal())
      .attr('fill', 'none')
      .attr('stroke', d => emissionColor(d.target.name) || '#000')
      .attr('stroke-opacity', 0.5)
      .attr('stroke-width', d => Math.max(1, d.width));

    // Append nodes (categories)
    svg.selectAll('.node')
      .data(sankeyNodes)
      .enter().append('g')
      .attr('class', 'node')
      .attr('transform', d => `translate(${d.x0 + margin.left},${d.y0 + margin.top})`)
      .each(function(d) {
        // Color nodes based on type
        const fillColor = d.name === 'Land Use Change' || d.name === 'Total CO2 Emissions' ? emissionColor(d.name) : continentColor(d.name);

        d3.select(this).append('rect')
          .attr('height', d.y1 - d.y0)
          .attr('width', d.x1 - d.x0)
          .attr('fill', fillColor)
          .attr('stroke', '#000')
          .attr('rx', 5)  // Rounded corners
          .attr('ry', 5);

        d3.select(this).append('text')
          .attr('x', (d.x1 - d.x0) / 2)
          .attr('y', (d.y1 - d.y0) / 2)
          .attr('dy', '.35em')
          .attr('text-anchor', 'middle')
          .text(d.name);
      });
  }, [data]);

  return (
    <div>
      <h2>Alluvial Diagram of CO2 Emissions by Continent, Country, and Emissions</h2>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default AlluvialDiagram;
