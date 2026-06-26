import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { navDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';
import { Hyperspeed } from '@components';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 140px 0 0 0;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;

  /* Break out of parent constraints to span full viewport width */
  max-width: none !important;
  width: 100vw;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;

  @media (max-width: 768px) {
    padding-top: 110px;
  }
`;

const StyledContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  max-width: 1000px;
  z-index: 1;
  position: relative;
  box-sizing: border-box;

  /* Match main padding on different screen sizes to keep alignment */
  padding: 0 150px;

  @media (min-width: 1300px) {
    padding: 0;
  }
  @media (max-width: 1080px) {
    padding: 0 100px;
  }
  @media (max-width: 768px) {
    padding: 0 50px;
  }
  @media (max-width: 480px) {
    padding: 0 25px;
  }
`;



const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const AnimatedWrapper = styled.div`
  opacity: 0;
  animation: ${slideUp} 750ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
  animation-delay: ${props => props.delay || '0ms'};
  width: 100%;
`;

const StyledIntro = styled.p`
  margin: 0 0 20px 4px;
  color: rgba(255, 255, 255, 0.6);
  font-family: var(--font-mono);
  font-size: clamp(13px, 1.5vw, 15px);
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
`;

const StyledName = styled.h1`
  margin: 0;
  color: var(--white);
  font-size: clamp(40px, 7vw, 76px);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.02em;
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.6);
`;

const StyledHeadline = styled.h2`
  margin: 12px 0 0 0;
  color: rgba(255, 255, 255, 0.65);
  font-size: clamp(28px, 4.5vw, 52px);
  font-weight: 600;
  line-height: 1.15;
  letter-spacing: -0.01em;
  max-width: 900px;
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.6);
`;



const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.5); }
  70% { box-shadow: 0 0 0 5px rgba(16, 185, 129, 0); }
  100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
`;

const StyledBadgeContainer = styled.div`
  margin: 28px 0;
  display: flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 30px;
  padding: 8px 20px;
  backdrop-filter: blur(8px);
  box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
  width: fit-content;
  user-select: none;

  .badge-text {
    font-family: var(--font-mono);
    font-size: clamp(13px, 1.2vw, 15px);
    font-weight: 600;
    color: var(--white);
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
`;

const StyledButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 10px;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: stretch;
    width: 100%;
  }

  a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 48px;
    border-radius: 24px;
    font-size: 15px;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    text-decoration: none;
    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    box-sizing: border-box;
    cursor: pointer;

    @media (max-width: 600px) {
      width: 100%;
    }
  }

  .cta-primary {
    background-color: var(--white);
    color: #050505;
    padding: 0 28px;
    box-shadow: 0 4px 14px rgba(255, 255, 255, 0.1);

    &:hover,
    &:focus-visible {
      outline: none;
      transform: translateY(-3px) scale(1.02);
      box-shadow: 0 12px 24px rgba(255, 255, 255, 0.15);
    }
  }

  .cta-secondary {
    background-color: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    color: var(--white);
    padding: 0 28px;
    backdrop-filter: blur(8px);
    box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.05);

    &:hover,
    &:focus-visible {
      outline: none;
      background-color: rgba(255, 255, 255, 0.08);
      border-color: rgba(255, 255, 255, 0.2);
      transform: translateY(-3px) scale(1.02);
      box-shadow: 0 12px 24px rgba(0, 0, 0, 0.4);
    }
  }
`;

const StyledHyperspeedContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: auto;
  z-index: 0;
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const content = (
    <>
      <AnimatedWrapper delay={prefersReducedMotion ? '0ms' : '100ms'}>
        <StyledIntro>Hi, my name is</StyledIntro>
      </AnimatedWrapper>

      <AnimatedWrapper delay={prefersReducedMotion ? '0ms' : '250ms'}>
        <StyledName>Kandarp Vadher.</StyledName>
      </AnimatedWrapper>

      <AnimatedWrapper delay={prefersReducedMotion ? '0ms' : '400ms'}>
        <StyledHeadline>I build intelligent digital experiences.</StyledHeadline>
      </AnimatedWrapper>

      <AnimatedWrapper delay={prefersReducedMotion ? '0ms' : '550ms'}>
        <StyledBadgeContainer>
          <span className="badge-text">Full Stack Developer | AI & ML Enthusiast</span>
        </StyledBadgeContainer>
      </AnimatedWrapper>

      <AnimatedWrapper delay={prefersReducedMotion ? '0ms' : '700ms'}>
        <StyledButtonContainer>
          <a href="#projects" className="cta-primary">
            View Projects &rarr;
          </a>
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="cta-secondary">
            Resume
          </a>
          <a href="#contact" className="cta-secondary">
            Contact Me
          </a>
        </StyledButtonContainer>
      </AnimatedWrapper>
    </>
  );

  return (
    <StyledHeroSection>

      <StyledHyperspeedContainer>
        <Hyperspeed
          effectOptions={{
            globalSpeed: 0.18,
            distortion: 'turbulentDistortion',
            length: 400,
            roadWidth: 10,
            islandWidth: 2,
            lanesPerRoad: 4,
            fov: 90,
            fovSpeedUp: 150,
            speedUp: 3.5,
            carLightsFade: 0.4,
            totalSideLightSticks: 20,
            lightPairsPerRoadWay: 40,
            shoulderLinesWidthPercentage: 0.05,
            brokenLinesWidthPercentage: 0.1,
            brokenLinesLengthPercentage: 0.5,
            lightStickWidth: [0.12, 0.5],
            lightStickHeight: [1.3, 1.7],
            movingAwaySpeed: [60, 80],
            movingCloserSpeed: [-120, -160],
            carLightsLength: [12, 80],
            carLightsRadius: [0.05, 0.14],
            carWidthPercentage: [0.3, 0.5],
            carShiftX: [-0.8, 0.8],
            carFloorSeparation: [0, 5],
            colors: {
              roadColor: 0x080808,
              islandColor: 0x0a0a0a,
              background: 0x000000,
              shoulderLines: 0xffffff,
              brokenLines: 0xffffff,
              leftCars: [0xd856bf, 0x6750a2, 0xc247ac],
              rightCars: [0x03b3c3, 0x0e5ea5, 0x324555],
              sticks: 0x03b3c3,
            }
          }}
        />
      </StyledHyperspeedContainer>

      {prefersReducedMotion ? (
        <StyledContentWrapper>
          {content}
        </StyledContentWrapper>
      ) : (
        isMounted && (
          <StyledContentWrapper>
            {content}
          </StyledContentWrapper>
        )
      )}

    </StyledHeroSection>
  );
};

export default Hero;
