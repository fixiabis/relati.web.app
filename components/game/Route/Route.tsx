import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import React from "react";

const drawLine = keyframes({
  to: { strokeDashoffset: "0px" },
});

const eraseLine = keyframes({
  "0%": {
    opacity: 1,
  },
  "12%": {
    opacity: 0,
  },
  "36%": {
    opacity: 1,
  },
  "48%": {
    opacity: 0,
  },
  "72%": {
    stroke: "#ddd",
    opacity: 1,
  },
  "100%": {
    stroke: "#ddd",
    opacity: 0,
  },
});

const DrawnRoute = styled.path<{ pathLength: number; reversed: boolean }>(
  { animation: `${drawLine} 500ms forwards linear` },
  ({ pathLength, reversed: isReversed }) => ({
    strokeDasharray: pathLength * 5 + "px",
    strokeDashoffset: (isReversed ? -pathLength : pathLength) * 5 + "px",
  })
);

const ErasedRoute = styled.path({
  animation: `${eraseLine} 500ms forwards linear`,
});

type Coordinate = readonly [number, number];

export type RouteProps = {
  coordinates: Coordinate[];
  color?: string;
  drawn?: boolean;
  erased?: boolean;
  reversed?: boolean;
  opacity?: number | string;
};

const toPrevCoordinateWithCoordinate = (coordinate: Coordinate, index: number, coordinates: Coordinate[]) =>
  [coordinates[Math.max(0, index - 1)], coordinate] as [Coordinate, Coordinate];

const toDistanceBetweenCoordinates = ([[xA, yA], [xB, yB]]: [Coordinate, Coordinate]) =>
  (Math.abs(xA - xB) ** 2 + Math.abs(yA - yB) ** 2) ** 0.5;

const sumPathLength = (pathLength: number, partialPathLength: number) => pathLength + partialPathLength;

const toPartialPathDefinition = ([x, y]: Coordinate, index: number) =>
  `${index ? "L" : "M"} ${x * 5 + 2.5} ${y * 5 + 2.5}`;

const Route: React.FC<RouteProps> = ({
  coordinates,
  color,
  drawn: isDrawn = false,
  erased: isErased = false,
  reversed: isReversed = false,
  ...props
}) => {
  const pathDefinition = coordinates.map(toPartialPathDefinition).join(" ");

  if (isDrawn) {
    const pathLength = coordinates
      .map(toPrevCoordinateWithCoordinate)
      .map(toDistanceBetweenCoordinates)
      .reduce(sumPathLength);

    return (
      <DrawnRoute
        d={pathDefinition}
        fill="none"
        stroke={color}
        strokeWidth="0.6"
        strokeLinecap="round"
        pathLength={pathLength}
        reversed={isReversed}
        {...props}
      />
    );
  }

  if (isErased) {
    return (
      <ErasedRoute d={pathDefinition} fill="none" stroke={color} strokeWidth="0.6" strokeLinecap="round" {...props} />
    );
  }

  return <path d={pathDefinition} fill="none" stroke={color} strokeWidth="0.6" strokeLinecap="round" {...props} />;
};

export default Route;
