import { CSSObject } from '@emotion/styled';
import React, { useRef, useEffect, useMemo } from 'react';
import { styled } from '../../core';
import BoardContainer from './BoardContainer';

export type CoordinateObject = { x: number; y: number };

export type BoardProps = {
  width: number;
  height: number;
  onGridClick?: ({ x, y }: CoordinateObject) => void;
};

const style: CSSObject = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
};

const BoardBase = styled.div<BoardProps>(style, ({ width, height }) => ({
  width: width * 5,
  height: height * 5,
}));

const unclickable: React.CSSProperties = { pointerEvents: 'none' };

const Board: React.FC<BoardProps> = ({
  width,
  height,
  onGridClick: emitGridClick,
  children,
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
    emitGridClick && emitGridClick({ x, y });
  };

  return (
    <BoardContainer ref={containerRef}>
      <BoardBase ref={ref} width={width} height={height} onClick={handleClick}>
        <svg width={viewWidth} height={viewHeight} style={unclickable}>
          {children}
          <g className="grid-lines" stroke="#888" strokeWidth="0.4">
            {gridLines}
          </g>
        </svg>
      </BoardBase>
    </BoardContainer>
  );
};

export default Board;
