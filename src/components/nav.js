import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled, { css, keyframes } from 'styled-components';
import { navLinks } from '@config';
import { loaderDelay } from '@utils';
import { useScrollDirection, usePrefersReducedMotion } from '@hooks';
import { Menu } from '@components';
import { IconLogo } from '@components/icons';

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.6); }
  70% { box-shadow: 0 0 0 6px rgba(16, 185, 129, 0); }
  100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
`;

const StyledHeader = styled.header`
  position: fixed;
  top: 24px;
  left: 0;
  width: 100%;
  height: 48px;
  z-index: 11;
  padding: 0 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  pointer-events: none; /* Let clicks pass through transparent regions */
  box-sizing: border-box;

  @media (max-width: 768px) {
    top: 16px;
    height: 40px;
    padding: 0 24px;
  }

  @media (prefers-reduced-motion: no-preference) {
    transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1);

    ${props =>
    props.scrollDirection === 'down' &&
      !props.scrolledToTop &&
      css`
        transform: translateY(-110px);
        opacity: 0;
      `};

    ${props =>
    props.scrollDirection === 'up' &&
      !props.scrolledToTop &&
      css`
        transform: translateY(0);
        opacity: 1;
      `};
  }
`;

const StyledLogoWrapper = styled.div`
  display: flex;
  align-items: center;
  pointer-events: auto; /* Enable clicks on the logo */
  z-index: 12;

  .logo {
    display: flex;
    justify-content: center;
    align-items: center;

    a {
      color: var(--white);
      width: 42px;
      height: 42px;
      position: relative;
      z-index: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: var(--transition);

      @media (max-width: 768px) {
        width: 32px;
        height: 32px;
      }

      .logo-container {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        svg {
          width: 36px;
          height: 36px;
          fill: none;

          @media (max-width: 768px) {
            width: 26px;
            height: 26px;
          }

          polygon {
            fill: transparent !important;
          }
        }
      }

      &:hover,
      &:focus {
        outline: 0;
        color: var(--slate);
        transform: scale(1.05);
      }
    }
  }
`;

const StyledMenuWrapper = styled.div`
  display: flex;
  align-items: center;
  pointer-events: auto; /* Enable clicks on mobile menu */
  z-index: 12;
`;

const StyledNav = styled.nav`
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 48px;
  background-color: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 50px;
  padding: 0 32px;
  backdrop-filter: blur(28px) saturate(170%);
  background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.03), transparent);
  box-shadow: 
    inset 0 1px 0 0 rgba(255, 255, 255, 0.08),
    0 12px 40px rgba(0, 0, 0, 0.45);
  color: var(--lightest-slate);
  font-family: var(--font-sans);
  z-index: 12;
  pointer-events: auto; /* Enable clicks inside the navigation pill */
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  opacity: ${props => (props.isMounted ? 1 : 0)};
  transform: ${props => (props.isMounted ? 'translate(-50%, 0)' : 'translate(-50%, -10px)')};

  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.15);
    transform: translate(-50%, -1px);
    box-shadow: 
      inset 0 1px 0 0 rgba(255, 255, 255, 0.12),
      0 16px 48px rgba(0, 0, 0, 0.55);
  }

  @media (max-width: 768px) {
    display: none; /* Hide glass pill completely on mobile since links are hidden */
  }

  /* Scrolled down state */
  ${props =>
    !props.scrolledToTop &&
    css`
      background-color: rgba(10, 10, 12, 0.65);
      border-color: rgba(255, 255, 255, 0.12);
      box-shadow: 
        inset 0 1px 1px 0 rgba(255, 255, 255, 0.08),
        0 16px 32px -8px rgba(0, 0, 0, 0.8);
    `};
`;

const StyledLinks = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }

  ol {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0;
    margin: 0;
    list-style: none;

    li {
      margin: 0 20px;
      position: relative;
      font-size: 17px;
      font-weight: 500;

      a {
        padding: 8px 6px;
        color: var(--slate);
        transition: var(--transition);

        &:hover,
        &:focus {
          color: var(--white);
        }
      }
    }
  }

  .right-controls {
    display: flex;
    align-items: center;
    margin-left: 24px;
    padding-left: 24px;
    border-left: 1px solid rgba(255, 255, 255, 0.08);
  }



  .resume-button {
    display: inline-block;
    padding: 8px 10px;
    font-size: 17px;
    font-weight: 600;
    color: var(--white);
    text-decoration: none;
    transition: var(--transition);
    cursor: pointer;

    &:hover,
    &:focus-visible {
      outline: none;
      color: var(--slate);
      transform: translateY(-1px);
    }
  }
`;

const Nav = ({ isHome }) => {
  const [isMounted, setIsMounted] = useState(!isHome);
  const scrollDirection = useScrollDirection('down');
  const [scrolledToTop, setScrolledToTop] = useState(true);
  const prefersReducedMotion = usePrefersReducedMotion();

  const handleScroll = () => {
    setScrolledToTop(window.pageYOffset < 50);
  };

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => {
      setIsMounted(true);
    }, 100);

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const timeout = isHome ? loaderDelay : 0;
  const fadeClass = isHome ? 'fade' : '';
  const fadeDownClass = isHome ? 'fadedown' : '';

  const Logo = (
    <StyledLogoWrapper>
      <div className="logo" tabIndex="-1">
        {isHome ? (
          <a href="/" aria-label="home">
            <div className="logo-container">
              <IconLogo />
            </div>
          </a>
        ) : (
          <Link to="/" aria-label="home">
            <div className="logo-container">
              <IconLogo />
            </div>
          </Link>
        )}
      </div>
    </StyledLogoWrapper>
  );

  const ResumeLink = (
    <a className="resume-button" href="/resume.pdf" target="_blank" rel="noopener noreferrer">
      Resume
    </a>
  );



  return (
    <StyledHeader scrollDirection={scrollDirection} scrolledToTop={scrolledToTop}>
      {prefersReducedMotion ? (
        <>
          {Logo}

          <StyledNav scrolledToTop={scrolledToTop} isMounted={isMounted}>
            <StyledLinks>
              <ol>
                {navLinks &&
                  navLinks.map(({ url, name }, i) => (
                    <li key={i}>
                      <Link to={url}>{name}</Link>
                    </li>
                  ))}
              </ol>
              <div className="right-controls">
                {ResumeLink}
              </div>
            </StyledLinks>
          </StyledNav>

          <StyledMenuWrapper>
            <Menu />
          </StyledMenuWrapper>
        </>
      ) : (
        <>
          <TransitionGroup component={null}>
            {isMounted && (
              <CSSTransition classNames={fadeClass} timeout={timeout}>
                {Logo}
              </CSSTransition>
            )}
          </TransitionGroup>

          <StyledNav scrolledToTop={scrolledToTop} isMounted={isMounted}>
            <StyledLinks>
              <ol>
                <TransitionGroup component={null}>
                  {isMounted &&
                    navLinks &&
                    navLinks.map(({ url, name }, i) => (
                      <CSSTransition key={i} classNames={fadeDownClass} timeout={timeout}>
                        <li key={i} style={{ transitionDelay: `${isHome ? i * 100 : 0}ms` }}>
                          <Link to={url}>{name}</Link>
                        </li>
                      </CSSTransition>
                    ))}
                </TransitionGroup>
              </ol>

              <div className="right-controls">
                <TransitionGroup component={null}>
                  {isMounted && (
                    <CSSTransition classNames={fadeDownClass} timeout={timeout}>
                      <div style={{ transitionDelay: `${isHome ? navLinks.length * 100 : 0}ms` }}>
                        {ResumeLink}
                      </div>
                    </CSSTransition>
                  )}
                </TransitionGroup>
              </div>
            </StyledLinks>
          </StyledNav>

          <TransitionGroup component={null}>
            {isMounted && (
              <CSSTransition classNames={fadeClass} timeout={timeout}>
                <StyledMenuWrapper>
                  <Menu />
                </StyledMenuWrapper>
              </CSSTransition>
            )}
          </TransitionGroup>
        </>
      )}
    </StyledHeader>
  );
};

Nav.propTypes = {
  isHome: PropTypes.bool,
};

export default Nav;
