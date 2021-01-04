import React from 'react';
import RouteStyles from './Route.module.css';

type Coordinate = readonly [number, number];

export type RouteProps = React.SVGProps<SVGPathElement> & {
  coordinates: Coordinate[];
  color?: string;
  drawn?: boolean;
  erased?: boolean;
  reversed?: boolean;
};

const toPrevCoordinateWithCoordinate = (
  coordinate: Coordinate,
  index: number,
  coordinates: Coordinate[]
) => [coordinates[Math.max(0, index - 1)], coordinate];

const toDistanceBetweenCoordinates = ([[xA, yA], [xB, yB]]: [
  Coordinate,
  Coordinate
]) => (Math.abs(xA - xB) ** 2 + Math.abs(yA - yB) ** 2) ** 0.5;

const sumPathLength = (pathLength: number, partialPathLength: number) =>
  pathLength + partialPathLength;

const toPartialPathDefinition = ([x, y]: Coordinate, index: number) =>
  `${index ? 'L' : 'M'} ${x * 5 + 2.5} ${y * 5 + 2.5}`;

const Route: React.FC<RouteProps> = ({
  coordinates,
  color,
  style = {},
  className = '',
  drawn: isDrawn = false,
  erased: isErased = false,
  reversed: isReversed = false,
  ...props
}) => {
  const pathLength = coordinates
    .map(toPrevCoordinateWithCoordinate)
    .map(toDistanceBetweenCoordinates)
    .reduce(sumPathLength);

  const pathDefinition = coordinates.map(toPartialPathDefinition).join(' ');

  if (isDrawn) {
    className = RouteStyles.DrawnRoute + (className && ` ${className}`);

    style = {
      ...style,
      strokeDasharray: pathLength * 5 + 'px',
      strokeDashoffset: (isReversed ? -pathLength : pathLength) * 5 + 'px',
    };
  }

  if (isErased) {
    className = RouteStyles.ErasedRoute + (className && ` ${className}`);
  }

  return (
    <path
      d={pathDefinition}
      className={className}
      fill="none"
      style={style}
      stroke={color}
      strokeWidth="0.6"
      {...props}
    />
  );
};

export default Route;
