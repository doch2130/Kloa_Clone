import { timeStamp } from 'console';
import React, { useEffect, useRef } from 'react'

const CANVAS_RADIUS = 50;
const CANVAS_CENTER_X = 56;
const CANVAS_CENTER_Y = 56;
const OUTER_STROKE_WIDTH = 10;
const INNER_STROKE_WIDTH = 12;
const OUTER_STROKE_COLOR = '#42464d';
const INNER_STROKE_COLOR = '#6a88ff';
const ANIMATION_DURATION = 1000;

const drawCanvas = (context:CanvasRenderingContext2D, angle:number) => {
  const startAngleInDegrees = -90;
  const endAngleInDegrees = angle;

  const startAngleInRadians = (startAngleInDegrees * (Math.PI / 180));
  const endAngleInRadians = ((startAngleInDegrees + endAngleInDegrees) * (Math.PI / 180));

  // context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  context.clearRect(
    CANVAS_CENTER_X - CANVAS_RADIUS - INNER_STROKE_WIDTH,
    CANVAS_CENTER_Y - CANVAS_RADIUS - INNER_STROKE_WIDTH,
    CANVAS_RADIUS * 2 + INNER_STROKE_WIDTH * 2,
    CANVAS_RADIUS * 2 + INNER_STROKE_WIDTH * 2
  );
  

  context.beginPath();
  context.arc(CANVAS_CENTER_X, CANVAS_CENTER_Y, CANVAS_RADIUS, 0, 2 * Math.PI);
  context.lineWidth = OUTER_STROKE_WIDTH;
  context.strokeStyle = OUTER_STROKE_COLOR;
  context.stroke();

  context.beginPath();
  context.arc(CANVAS_CENTER_X, CANVAS_CENTER_Y, CANVAS_RADIUS, startAngleInRadians, endAngleInRadians);
  context.lineWidth = INNER_STROKE_WIDTH;
  context.strokeStyle = INNER_STROKE_COLOR;
  context.stroke();
};

type SkillPointCanvasProps = {
  usePoint: number
  maxPoint: number
}

export default function SkillPointCanvas({ usePoint, maxPoint }:SkillPointCanvasProps) {
  const skillPointRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number>(0);

  useEffect(() => {
    if (skillPointRef.current) {
      const canvas = skillPointRef.current;
      const context = canvas.getContext('2d');

      if (context) {
        // const animate = (timestamp:number) => {
        const animate = () => {
          // const progress = (timestamp % ANIMATION_DURATION) / ANIMATION_DURATION;
          const pointAngle = (usePoint / maxPoint) * 360;
          // const newAngle = progress * 360;

          // console.log('pointAngle ', pointAngle);

          // if(pointAngle === 360) {
          //   drawCanvas(context, 360);
          //   return;
          // } else if (pointAngle === 0) {
          //   drawCanvas(context, 0);
          //   return;
          // } 
          // // else if (newAngle < pointAngle) {
          // // }
          // else {
          //   drawCanvas(context, newAngle);
          //   // cancelAnimationFrame(animationFrameId.current);
          //   return;
          // }

          drawCanvas(context, pointAngle);

          // animationFrameId.current = requestAnimationFrame(animate);
        };

        animate()
        // animationFrameId.current = requestAnimationFrame(animate);
      }
    }

    // return () => cancelAnimationFrame(animationFrameId.current);

  }, [maxPoint, usePoint]);

  return (
  <>
    <canvas ref={skillPointRef} role='img' width={CANVAS_CENTER_X * 2} height={CANVAS_CENTER_Y * 2}
      style={{
        'display': 'block', 'boxSizing': 'border-box',
        'width': `${CANVAS_CENTER_X * 2}`, 'height': `${CANVAS_CENTER_Y * 2}`
      }}
    />
  </>
  )
};

