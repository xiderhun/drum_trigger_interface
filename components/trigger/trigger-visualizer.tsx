"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3";

interface TriggerVisualizerProps {
  config: {
    sensitivity: number;
    threshold: number;
    scanTime: number;
    retrigger: number;
    crosstalk: number;
    maskTime: number;
  };
}

export function TriggerVisualizer({ config }: TriggerVisualizerProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = svgRef.current.clientWidth;
    const height = 200;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // Generate sample data based on config
    const data = generateWaveformData(config);

    // Set up scales
    const x = d3
      .scaleLinear()
      .domain([0, data.length - 1])
      .range([margin.left, width - margin.right]);

    const y = d3
      .scaleLinear()
      .domain([0, 100])
      .range([height - margin.bottom, margin.top]);

    // Create the line generator
    const line = d3
      .line<number>()
      .x((d, i) => x(i))
      .y((d) => y(d));

    // Draw the threshold line
    svg
      .append("line")
      .attr("x1", margin.left)
      .attr("x2", width - margin.right)
      .attr("y1", y(config.threshold))
      .attr("y2", y(config.threshold))
      .attr("stroke", "red")
      .attr("stroke-dasharray", "4,4");

    // Draw the waveform
    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "currentColor")
      .attr("stroke-width", 1.5)
      .attr("d", line);

    // Add axes
    const xAxis = d3.axisBottom(x).ticks(5);
    const yAxis = d3.axisLeft(y).ticks(5);

    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(xAxis);

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(yAxis);

  }, [config]);

  return (
    <div className="w-full">
      <svg
        ref={svgRef}
        className="h-[200px] w-full"
        style={{ maxWidth: "100%" }}
      />
    </div>
  );
}

function generateWaveformData(config: TriggerVisualizerProps["config"]) {
  const length = 100;
  const data: number[] = [];

  for (let i = 0; i < length; i++) {
    if (i < 10) {
      data.push(0);
    } else if (i < 15) {
      data.push((config.sensitivity * (i - 10)) / 5);
    } else if (i < 20) {
      data.push(
        config.sensitivity * Math.exp(-(i - 15) / (config.scanTime / 20))
      );
    } else {
      data.push(
        Math.max(
          0,
          data[i - 1] * (1 - config.retrigger / 1000)
        )
      );
    }
  }

  return data;
}