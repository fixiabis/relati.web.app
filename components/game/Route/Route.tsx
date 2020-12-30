import React from 'react';
import RouteStyles from './Route.module.css';

const RIGHT_TRIANGLE_HYPOTENUSE_LENGTH = 1.41421;

export type RouteProps = React.SVGProps<SVGPathElement> & {
  coordinates: (readonly [number, number])[];
  color?: string;
  drawn?: boolean;
  erased?: boolean;
  reversed?: boolean;
};

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
  const [length, path] = isReversed
    ? coordinates.reduceRight(
        ([length, path], [x, y], index) => {
          if (index !== coordinates.length - 1) {
            const [prevX, prevY] = coordinates[index + 1];
            const deltaX = Math.abs(prevX - x);
            const deltaY = Math.abs(prevY - y);

            if (deltaX > 1) {
              throw RangeError(
                '座標移動超過1單位, ' +
                  `從(${prevX}, ${prevY}) 到 (${x}, ${y}), ` +
                  `X軸移動了${deltaX}單位`
              );
            } else if (deltaY > 1) {
              throw RangeError(
                '座標移動超過1單位, ' +
                  `從(${prevX}, ${prevY}) 到 (${x}, ${y}), ` +
                  `Y軸移動了${deltaY}單位`
              );
            }

            const isSlashLine = deltaX > 0 && deltaY > 0;

            if (isSlashLine) {
              length = parseFloat(
                (length + RIGHT_TRIANGLE_HYPOTENUSE_LENGTH).toFixed(5)
              );
            } else {
              length++;
            }

            path += `L ${x * 5 + 2.5} ${y * 5 + 2.5}`;
          } else {
            path += `M ${x * 5 + 2.5} ${y * 5 + 2.5}`;
          }

          return [length, path];
        },
        [0, '']
      )
    : coordinates.reduce(
        ([length, path], [x, y], index) => {
          if (index !== 0) {
            const [prevX, prevY] = coordinates[index - 1];
            const deltaX = Math.abs(prevX - x);
            const deltaY = Math.abs(prevY - y);

            if (deltaX > 1) {
              throw RangeError(
                '座標移動超過1單位, ' +
                  `從(${prevX}, ${prevY}) 到 (${x}, ${y}), ` +
                  `X軸移動了${deltaX}單位`
              );
            } else if (deltaY > 1) {
              throw RangeError(
                '座標移動超過1單位, ' +
                  `從(${prevX}, ${prevY}) 到 (${x}, ${y}), ` +
                  `Y軸移動了${deltaY}單位`
              );
            }

            const isSlashLine = deltaX > 0 && deltaY > 0;

            if (isSlashLine) {
              length = parseFloat(
                (length + RIGHT_TRIANGLE_HYPOTENUSE_LENGTH).toFixed(5)
              );
            } else {
              length++;
            }

            path += `L ${x * 5 + 2.5} ${y * 5 + 2.5}`;
          } else {
            path += `M ${x * 5 + 2.5} ${y * 5 + 2.5}`;
          }

          return [length, path];
        },
        [0, '']
      );

  if (isDrawn) {
    className = RouteStyles.DrawnRoute + (className && ` ${className}`);

    style = {
      ...style,
      strokeDasharray: length * 5 + 'px',
      strokeDashoffset: length * 5 + 'px',
    };
  }

  if (isErased) {
    className = RouteStyles.ErasedRoute + (className && ` ${className}`);
  }

  return (
    <path
      d={path}
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
