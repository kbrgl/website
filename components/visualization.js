import { useRef, useEffect, useState } from "react";

// https://css-tricks.com/using-requestanimationframe-with-react-hooks/
const useAnimationFrame = (callback) => {
  // Use useRef for mutable variables that we want to persist
  // without triggering a re-render on their change
  const requestRef = useRef();
  const previousTimeRef = useRef();

  const animate = (time) => {
    if (previousTimeRef.current !== undefined) {
      const deltaTime = time - previousTimeRef.current;
      callback(deltaTime);
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);
};

function drawSine(ctx, { omega, wavelength, width, height, time }) {
  ctx.beginPath();
  const f = (x) => {
    const fx = Math.sin(x);
    return height / 2 - (height / 2 - ctx.lineWidth) * fx;
  };
  for (let i = 0; i < width; i += 1) {
    const y = f(i / wavelength + time * omega);
    ctx.lineTo(i, y);
  }
  ctx.stroke();
}

function Canvas({ height, width, time }) {
  const secs = time / 1000;
  const canvasEl = useRef(null);

  useEffect(() => {
    if (canvasEl) {
      const ctx = canvasEl.current.getContext("2d");

      ctx.clearRect(0, 0, width, height);
      const dpr = window.devicePixelRatio;
      canvasEl.current.height = height * dpr;
      canvasEl.current.width = width * dpr;
      ctx.scale(dpr, dpr);
      ctx.lineWidth = 1;

      ctx.strokeStyle = "#ddd";
      drawSine(ctx, {
        omega: 0.5,
        wavelength: width / (2 * Math.PI),
        width,
        height,
        time: secs,
      });
      ctx.strokeStyle = "#eee";
      drawSine(ctx, {
        omega: 1,
        wavelength: width / Math.PI,
        width,
        height,
        time: secs,
      });
    }
  }, [canvasEl, height, width, time]);

  return <canvas style={{ width, height }} ref={canvasEl} />;
}

export default function Visualization() {
  const containerEl = useRef(null);
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const [time, setTime] = useState(0);

  useAnimationFrame((deltaTime) => {
    setTime((prevTime) => prevTime + deltaTime);
  });

  useEffect(() => {
    setHeight(containerEl.current?.clientHeight);
    setWidth(containerEl.current?.clientWidth);
  });

  return (
    <div className="w-full h-24 absolute -z-10" ref={containerEl}>
      <Canvas width={width} height={height} time={time} />
    </div>
  );
}
