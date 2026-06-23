import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  height: 100vh;
  padding: 0;

  @media (max-height: 700px) and (min-width: 700px), (max-width: 360px) {
    height: auto;
    padding-top: var(--nav-height);
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h3 {
    margin-top: 5px;
    color: var(--slate);
    line-height: 0.9;
  }

  p {
    margin: 20px 0 0;
    max-width: 540px;
  }
`;

const StyledButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 50px;

  a {
    margin-top: 0 !important;
  }
  
  .cta-primary {
    ${({ theme }) => theme.mixins.bigButton};
  }

  .cta-secondary {
    ${({ theme }) => theme.mixins.bigButton};
    border-color: var(--slate);
    color: var(--slate);
    
    &:hover {
      border-color: var(--green);
      color: var(--green);
      box-shadow: 4px 4px 0 0 var(--green);
    }
  }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const one = <h1>Hi, my name is</h1>;
  const two = <h2 className="big-heading">Kandarp Vadher.</h2>;
  const three = (
    <h3 className="big-heading">
      I build intelligent digital experiences.
    </h3>
  );
  const sub = (
    <p style={{
      color: 'var(--green)',
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--fz-md)',
      marginTop: '15px',
      marginBottom: '15px'
    }}>
      Full Stack Developer | AI & ML Enthusiast
    </p>
  );
  const four = (
    <>
      <p>
        I'm a passionate Full Stack Developer with a strong interest in Artificial Intelligence,
        Machine Learning, and Data Analytics. I specialize in building scalable web applications,
        AI-powered solutions, and data-driven systems using React.js, Node.js, Python, and modern
        technologies. My goal is to transform innovative ideas into impactful digital products that
        solve real-world problems.
      </p>
    </>
  );
  const five = (
    <StyledButtonContainer>
      <a href="#projects" className="cta-primary">
        View Projects
      </a>
      <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="cta-secondary">
        Resume
      </a>
      <a href="#contact" className="cta-secondary">
        Contact Me
      </a>
    </StyledButtonContainer>
  );

  const items = [one, two, three, sub, four, five];

  return (
    <StyledHeroSection>
      {prefersReducedMotion ? (
        <>
          {items.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </>
      ) : (
        <TransitionGroup component={null}>
          {isMounted &&
            items.map((item, i) => (
              <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
              </CSSTransition>
            ))}
        </TransitionGroup>
      )}
    </StyledHeroSection>
  );
};

export default Hero;
