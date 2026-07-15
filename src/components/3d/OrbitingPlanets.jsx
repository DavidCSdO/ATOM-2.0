"use client";

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export default function OrbitingPlanets({
  planets = [],
  xCurve = 63,
  yCurve = -47,
  speed = 1.2,
  direction = 'anticlockwise',
  orbitWidthPct = 67,
}) {
  const containerRef = useRef(null);
  const [positions, setPositions] = useState([]);
  const dimsRef = useRef({ W: 0, H: 0 });
  const reqRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const resizeObserver = new ResizeObserver((entries) => {
      const r = entries[0]?.contentRect;
      if (!r) return;
      dimsRef.current = { W: r.width, H: r.height };
    });
    resizeObserver.observe(el);

    const start = performance.now();
    const revsPerSec = Math.max(0, Math.min(20, speed)) * 0.05;
    const dir = direction === 'anticlockwise' ? -1 : 1;

    const tick = (now) => {
      const { W, H } = dimsRef.current;
      if (W && H && revsPerSec > 0) {
        const elapsed = (now - start) / 1000;
        const orbitPhi = dir * 2 * Math.PI * revsPerSec * elapsed;

        const totalW = (Math.max(0, Math.min(100, orbitWidthPct)) / 100) * W;
        const a = totalW / 2;
        const b = a * 0.35; // fixed ellipse ratio

        const theta0 = Math.atan2(H, W);
        const cosT = Math.cos(theta0);
        const sinT = Math.sin(theta0);
        const cx = W / 2;
        const cy = H / 2;
        const n = planets.length;

        const newPositions = [];
        for (let i = 0; i < n; i++) {
          const phi = (i / n) * Math.PI * 2 + orbitPhi;
          const ex = a * Math.cos(phi);
          const ey = b * Math.sin(phi);

          const x = ex * cosT - ey * sinT;
          const y = ex * sinT + ey * cosT;

          const left = cx + x;
          const top = cy + y;
          const zIndex = Math.round(y);

          newPositions.push({ left, top, scale: 1, zIndex });
        }
        setPositions(newPositions);
      }
      reqRef.current = requestAnimationFrame(tick);
    };

    reqRef.current = requestAnimationFrame(tick);

    return () => {
      resizeObserver.disconnect();
      if (reqRef.current) cancelAnimationFrame(reqRef.current);
    };
  }, [planets, speed, direction, orbitWidthPct]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        overflow: 'visible',
        zIndex: 5,
        perspective: '1200px',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transformStyle: 'preserve-3d',
          transform: `rotateY(${xCurve}deg) rotateX(${-yCurve}deg)`,
        }}
      >
        {planets.map((planet, i) => {
          const pos = positions[i] || { left: 0, top: 0, scale: 1, zIndex: 0 };
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                willChange: 'left, top, transform',
                transition: 'width 0.3s ease',
                left: `${pos.left}px`,
                top: `${pos.top}px`,
                width: planet.width,
                aspectRatio: '1',
                transform: `translate(-50%, -50%) rotateX(${yCurve}deg) rotateY(${-xCurve}deg) scale(${pos.scale})`,
                zIndex: pos.zIndex,
              }}
            >
              <Image
                src={planet.src}
                alt={planet.alt}
                fill
                sizes="50vw"
                quality={100}
                style={{
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 0 20px rgba(0, 0, 0, 0.6))',
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
