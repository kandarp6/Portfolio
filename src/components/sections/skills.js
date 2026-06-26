import React, { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const StyledSkillsSection = styled.section`
  max-width: 900px;
`;

const StyledSkillsContainer = styled.div`
  margin-top: 30px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }

  .skill-card {
    position: relative;
    background-color: rgba(8, 8, 10, 0.85);
    border-radius: var(--border-radius);
    padding: 18px;
    transition: var(--transition);
    display: flex;
    flex-direction: column;
    gap: 12px;
    overflow: hidden;
    z-index: 1;
    border: 1px solid rgba(255, 255, 255, 0.05);

    & > * {
      position: relative;
      z-index: 2;
    }

    &::before {
      content: '';
      position: absolute;
      top: -150%;
      left: -150%;
      width: 400%;
      height: 400%;
      background: conic-gradient(
        transparent,
        rgba(255, 255, 255, 0.3) 10%,
        transparent 30%
      );
      animation: ${rotate} 5s linear infinite;
      z-index: -2;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.4s ease;
    }

    &::after {
      content: '';
      position: absolute;
      top: 1px;
      left: 1px;
      right: 1px;
      bottom: 1px;
      background-color: rgba(8, 8, 10, 0.9);
      backdrop-filter: blur(12px);
      border-radius: calc(var(--border-radius) - 1px);
      z-index: -1;
      pointer-events: none;
    }

    @media (min-width: 601px) {
      &:last-child {
        grid-column: span 2;
      }
    }

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 30px -10px rgba(255, 255, 255, 0.12);
      border-color: rgba(255, 255, 255, 0.1);
      
      &::before {
        opacity: 1;
      }
      
      .skill-label {
        color: var(--green);
      }
    }
  }

  .skill-label {
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    color: var(--lightest-slate);
    font-weight: 600;
    transition: var(--transition);
    display: flex;
    align-items: center;
    gap: 6px;

    &:before {
      content: '▹';
      color: var(--green);
      font-size: var(--fz-sm);
    }
  }
  
  .chips {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .skill-chip {
    font-family: var(--font-mono);
    font-size: var(--fz-xxs);
    padding: 4px 10px;
    border-radius: var(--border-radius);
    background-color: rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.05);
    color: var(--slate);
    transition: var(--transition);
    cursor: default;

    &:hover {
      border-color: var(--green);
      color: var(--green);
      background-color: var(--green-tint);
      transform: translateY(-2px);
    }
  }
`;

const Skills = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const skillCategories = [
    {
      category: 'Languages',
      skills: ['Python', 'Java', 'JavaScript', 'C', 'C++']
    },
    {
      category: 'Frontend',
      skills: ['React.js', 'Next.js', 'HTML5', 'CSS3', 'Tailwind CSS', 'Bootstrap']
    },
    {
      category: 'Backend & DB',
      skills: ['Node.js', 'Express.js', 'REST APIs', 'MongoDB', 'PostgreSQL', 'Supabase', 'Firebase']
    },
    {
      category: 'AI & Data',
      skills: ['Machine Learning', 'NLP', 'Data Analytics', 'Data Visualization', 'Scikit-learn', 'TensorFlow', 'TF-IDF']
    },
    {
      category: 'Tools',
      skills: ['Git', 'GitHub', 'Postman', 'VS Code', 'Vercel', 'Render']
    }
  ];

  return (
    <StyledSkillsSection id="skills" ref={revealContainer}>
      <h2 className="numbered-heading">Skills</h2>
      <StyledSkillsContainer>
        {skillCategories.map((cat, i) => (
          <div key={i} className="skill-card">
            <span className="skill-label">{cat.category}</span>
            <div className="chips">
              {cat.skills.map((skill, j) => (
                <span key={j} className="skill-chip">{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </StyledSkillsContainer>
    </StyledSkillsSection>
  );
};

export default Skills;
