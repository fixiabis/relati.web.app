import React, { useRef, useEffect, useMemo } from 'react';

import BoardStyles from './board.module.css';

export type CoordinateObject = { x: number; y: number };

export type BoardProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  width: number;
  height: number;
  containerClassName?: string;
  onGridClick?: ({ x, y }: CoordinateObject) => void;
};

const Board: React.FC<BoardProps> = ({
  width,
  height,
  children,
  className = '',
  containerClassName = '',
  onGridClick: emitGridClick,
  style,
  ...props
}) => {
  const viewWidth = width * 5;
  const viewHeight = height * 5;
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>;
  const containerRef = useRef() as React.MutableRefObject<HTMLDivElement>;

  const gridLines = useMemo(() => {
    const horizionGridLinePaths = Array.from({ length: width }, (_, y) => y)
      .slice(1)
      .map((y) => `M ${y * 5} 0 V ${viewHeight}`);

    const verticalGridLinePaths = Array.from({ length: height }, (_, x) => x)
      .slice(1)
      .map((x) => `M 0 ${x * 5} H ${viewWidth}`);

    return [
      ...horizionGridLinePaths,
      ...verticalGridLinePaths,
    ].map((d, index) => <path key={index} d={d} />);
  }, [viewWidth, viewHeight, width, height]);

  useEffect(() => {
    const scale = () => {
      if (ref.current && containerRef.current) {
        const { offsetWidth, offsetHeight } = containerRef.current;
        const widthRatio = offsetWidth / viewWidth;
        const heightRatio = offsetHeight / viewHeight;
        const scale = Math.min(widthRatio, heightRatio) * 0.95;
        ref.current.style.transform = `scale(${scale})`;
      }
    };

    scale();
    window.addEventListener('resize', scale);
    return () => window.removeEventListener('resize', scale);
  }, [viewWidth, viewHeight, ref, containerRef]);

  const handleClick = ({ nativeEvent }: React.MouseEvent) => {
    const { offsetX, offsetY } = nativeEvent;
    const x = (offsetX / 5) | 0;
    const y = (offsetY / 5) | 0;
    emitGridClick?.({ x, y });
  };

  return (
    <div ref={containerRef} className={BoardStyles.boardContainer}>
      <div
        ref={ref}
        className={BoardStyles.board + (className && ` ${className}`)}
        style={{ width: viewWidth, height: viewHeight, ...style }}
        onClick={handleClick}
        {...props}
      >
        <svg width={viewWidth} height={viewHeight}>
          {children}
          <g className="grid-lines" stroke="#888" strokeWidth="0.4">
            {gridLines}
          </g>
        </svg>
      </div>
    </div>
  );
};

export default Board;
