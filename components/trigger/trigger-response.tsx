"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { Card } from "@/components/ui/card";

interface Hit {
  velocity: number;
  timestamp: number;
}

interface TriggerResponseProps {
  hits: Hit[];
  maxHits?: number;
}

export function TriggerResponse({ hits, maxHits = 50 }: TriggerResponseProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || hits.length === 0) return;

    const width = svgRef.current.clientWidth;
    const height = 100;
    const margin = { top: 10, right: 10, bottom: 20, left: 30 };

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const x = d3
      .scaleTime()
      .domain([
        d3.min(hits, (d) => d.timestamp) || 0,
        d3.max(hits, (d) => d.timestamp) || 0,
      ])
      .range([margin.left, width - margin.right]);

    const y = d3
      .scaleLinear()
      .domain([0, 127])
      .range([height - margin.bottom, margin.top]);

    // Draw dots for each hit
    svg
      .selectAll("circle")
      .data(hits)
      .join("circle")
      .attr("cx", (d) => x(d.timestamp))
      .attr("cy", (d) => y(d.velocity))
      .attr("r", 3)
      .attr("fill", "currentColor")
      .attr("opacity", 0.6);

    // Add axes
    const xAxis = d3
      .axisBottom(x)
      .ticks(5)
      .tickFormat((d) => d3.timeFormat("%H:%M:%S")(d as Date));
    const yAxis = d3.axisLeft(y).ticks(5);

    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(xAxis);

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(yAxis);

  }, [hits]);

  return (
    <div className="w-full">
      <svg
        ref={svgRef}
        className="h-[100px] w-full"
        style={{ maxWidth: "100%" }}
      />
    </div>
  );
}