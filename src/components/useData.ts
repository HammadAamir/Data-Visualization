// src/utils/csvUtils.ts
import * as d3 from 'd3';

export const loadCO2Data = async (filePath: string) => {
  const data = await d3.csv(filePath);
  return data.map((d) => ({
    entity: d.Entity,
    emissions: +d['Annual CO2 emissions (per capita)'],
  }));
};
