"use client";

import { useEffect, useRef } from "react";

interface Opts {
  smoothing: number;
  fftSize: number;
  minDecibels: number;
  scale: number;
  glow: number;
  color1: [number, number, number];
  color2: [number, number, number];
  color3: [number, number, number];
  fillOpacity: number;
  lineWidth: number;
  blend: GlobalCompositeOperation;
  shift: number;
  width: number;
  amp: number;
  easeFactory: number;
  historySize: number;
}

const opts: Opts = {
  smoothing: 0.8,
  minDecibels: -90,
  amp: 2,
  scale: 2,
  width: 30,
  shift: 200,
  fftSize: 11, // 2^11 = 2048
  glow: 50,
  color1: [255, 90, 90],
  color2: [188, 53, 53],
  color3: [255, 135, 135],
  fillOpacity: 0,
  lineWidth: 5,
  blend: "screen",
  easeFactory: 0.45,
  historySize: 20,
};

const useVisualizer = (
  status: string,
  previewAudioStream: MediaStream | null,
  canvasRef: React.RefObject<HTMLCanvasElement>,
) => {
  const dataHistoryRef = useRef<number[][]>([]);

  useEffect(() => {
    if (status === "recording" && previewAudioStream) {
      const audioCtx = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      const analyser = audioCtx.createAnalyser();
      const source = audioCtx.createMediaStreamSource(previewAudioStream);
      source.connect(analyser);

      const WIDTH = 2000;
      const HEIGHT = 600;
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      analyser.fftSize = 2 ** opts.fftSize;
      const bufferLength = analyser.frequencyBinCount * 2;
      const dataArray = new Uint8Array(bufferLength);

      const drawCurve = (
        points: [number, number][],
        context: CanvasRenderingContext2D,
      ) => {
        context.beginPath();
        context.moveTo(points[0][0], points[0][1]);

        for (let i = 1; i < points.length - 2; i++) {
          const xc = (points[i][0] + points[i + 1][0]) / 2;
          const yc = (points[i][1] + points[i + 1][1]) / 2;
          context.quadraticCurveTo(points[i][0], points[i][1], xc, yc);
        }

        context.quadraticCurveTo(
          points[points.length - 2][0],
          points[points.length - 2][1],
          points[points.length - 1][0],
          points[points.length - 1][1],
        );
      };

      const easeValue = (current: number, target: number, factor: number) =>
        current + (target - current) * factor;

      const draw = () => {
        requestAnimationFrame(draw);

        analyser.getByteTimeDomainData(dataArray);

        canvas.width = WIDTH;
        canvas.height = HEIGHT;

        ctx.fillStyle = `rgba(200, 200, 200, 0)`;
        ctx.fillRect(0, 0, WIDTH, HEIGHT);

        const currentData = Array.from(dataArray);
        dataHistoryRef.current.push(currentData);
        if (dataHistoryRef.current.length > opts.historySize) {
          dataHistoryRef.current.shift();
        }

        const easedData = currentData.map((value, index) => {
          const history = dataHistoryRef.current.map((data) => data[index]);
          return history.reduce(
            (acc, val) => easeValue(acc, val, opts.easeFactory),
            value,
          );
        });

        for (let channel = 0; channel < 3; channel++) {
          const color = (opts as any)[`color${channel + 1}`] as [
            number,
            number,
            number,
          ];

          ctx.fillStyle = `rgba(${color.join(", ")}, ${opts.fillOpacity})`;
          ctx.strokeStyle = ctx.shadowColor = `rgb(${color.join(", ")})`;
          ctx.lineWidth = opts.lineWidth;
          ctx.shadowBlur = opts.glow;
          ctx.globalCompositeOperation = opts.blend;

          const points: [number, number][] = [];
          const sliceWidth = (WIDTH * 1.0) / bufferLength;
          let x = channel * opts.shift;

          for (let i = 0; i < bufferLength; i++) {
            const v = easedData[i] / 128.0;
            const y = (v * HEIGHT) / 2;
            points.push([x, y]);
            x += sliceWidth;
          }

          drawCurve(points, ctx);
          ctx.stroke();
        }
      };

      analyser.smoothingTimeConstant = opts.smoothing;
      analyser.minDecibels = opts.minDecibels;
      analyser.maxDecibels = 0;

      draw();
    }
  }, [status, previewAudioStream, canvasRef]);
};

export default useVisualizer;
