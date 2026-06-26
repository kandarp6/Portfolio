import React, { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import LightRays from './LightRays';

const float1 = keyframes`
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.05); }
  66% { transform: translate(-20px, 20px) scale(0.98); }
  100% { transform: translate(0px, 0px) scale(1); }
`;

const float2 = keyframes`
  0% { transform: translate(0px, 0px) scale(1); }
  50% { transform: translate(-40px, 40px) scale(0.95); }
  100% { transform: translate(0px, 0px) scale(1); }
`;

const StyledBackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -10;
  background-color: var(--navy);
  overflow: hidden;
  pointer-events: none;

  /* Tech Grid Overlay */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-size: 60px 60px;
    background-image: 
      linear-gradient(to right, rgba(255, 255, 255, 0.008) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255, 255, 255, 0.008) 1px, transparent 1px);
    mask-image: radial-gradient(circle at 50% 50%, black 25%, transparent 80%);
    pointer-events: none;
    z-index: 1;
  }

  /* Large Radial Vignette Overlay */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 50% 50%, transparent 20%, rgba(5, 5, 5, 0.8) 95%);
    pointer-events: none;
    z-index: 4; /* On top of the canvas (z-index 3) to mask edges */
  }
`;

const GlowingOrb = styled.div`
  position: absolute;
  border-radius: 50%;
  filter: blur(140px);
  opacity: 0.05;
  pointer-events: none;
  z-index: 2;
`;

const OrbCyan = styled(GlowingOrb)`
  top: 5%;
  left: 10%;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, #ffffff 0%, transparent 70%);
  animation: ${float1} 22s infinite ease-in-out;
`;

const OrbPurple = styled(GlowingOrb)`
  bottom: 10%;
  right: 10%;
  width: 450px;
  height: 450px;
  background: radial-gradient(circle, #71717a 0%, transparent 70%);
  animation: ${float2} 28s infinite ease-in-out;
`;

const StyledCanvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 3;
  opacity: 0.6;
`;

/* Subtle Film Grain Noise Overlay (2% Opacity) */
const NoiseOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  opacity: 0.02;
  pointer-events: none;
  z-index: 5;
`;

const Background = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 25 : 55;
    const connectionDistance = 120;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        // Make movements extremely slow
        this.vx = (Math.random() - 0.5) * 0.12;
        this.vy = (Math.random() - 0.5) * 0.12;
        // Make stars tiny
        this.radius = Math.random() * 0.8 + 0.3;
        // Barely visible star color
        this.color = Math.random() > 0.5 ? 'rgba(255, 255, 255, 0.15)' : 'rgba(161, 161, 170, 0.08)';
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Wrap/Bounce borders
        if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
        if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };
    initParticles();

    const drawConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        // Connect to other particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            // Keep connection lines extremely faint
            const alpha = (1 - dist / connectionDistance) * 0.018;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.lineWidth = 0.3;
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw background particles
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      
      drawConnections();
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <StyledBackgroundContainer>
      <OrbCyan />
      <OrbPurple />
      <LightRays
        raysOrigin="top-center"
        raysColor="#ffffff"
        raysSpeed={0.5}
        lightSpread={1.3}
        rayLength={2.0}
        pulsating={true}
        followMouse={true}
        mouseInfluence={0.12}
        noiseAmount={0.03}
        distortion={0.05}
        fadeDistance={1.3}
      />
      <StyledCanvas ref={canvasRef} />
      <NoiseOverlay />
    </StyledBackgroundContainer>
  );
};

export default Background;
