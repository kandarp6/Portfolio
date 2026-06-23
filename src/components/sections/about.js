import React, { useEffect, useRef } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledAboutSection = styled.section`
  max-width: 900px;

  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 50px;

    @media (max-width: 768px) {
      display: block;
    }
  }
`;
const StyledText = styled.div`
  p {
    margin-bottom: 15px;
  }
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
    background-color: var(--light-navy);
    border: 1px solid var(--lightest-navy);
    border-radius: var(--border-radius);
    padding: 18px;
    transition: var(--transition);
    display: flex;
    flex-direction: column;
    gap: 12px;

    @media (min-width: 601px) {
      &:last-child {
        grid-column: span 2;
      }
    }

    &:hover {
      border-color: var(--green);
      transform: translateY(-3px);
      box-shadow: 0 10px 20px -15px var(--navy-shadow), 0 0 15px var(--green-tint);
      
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
    background-color: var(--navy);
    border: 1px solid var(--lightest-navy);
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

const StyledPic = styled.div`
  position: relative;
  max-width: 300px;

  @media (max-width: 768px) {
    margin: 50px auto 0;
    width: 70%;
  }

  .wrapper {
    ${({ theme }) => theme.mixins.boxShadow};
    display: block;
    position: relative;
    width: 100%;
    border-radius: var(--border-radius);
    background-color: var(--green);

    &:hover,
    &:focus {
      outline: 0;
      transform: translate(-4px, -4px);

      &:after {
        transform: translate(8px, 8px);
      }

      .img {
        filter: none;
        mix-blend-mode: normal;
      }
    }

    .img {
      position: relative;
      border-radius: var(--border-radius);
      mix-blend-mode: multiply;
      filter: grayscale(100%) contrast(1);
      transition: var(--transition);
    }

    &:before,
    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius);
      transition: var(--transition);
    }

    &:before {
      top: 0;
      left: 0;
      background-color: var(--navy);
      mix-blend-mode: screen;
    }

    &:after {
      border: 2px solid var(--green);
      top: 14px;
      left: 14px;
      z-index: -1;
    }
  }
`;

const About = () => {
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
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">About Me</h2>

      <div className="inner">
        <StyledText>
          <div>
            <p>
              I am an Information Technology Engineering student with a strong passion for Full Stack Development, Artificial Intelligence, Machine Learning, and Data Analytics.
            </p>

            <p>
              Currently, I am working as a <strong>Data Analytics &amp; Data Science Intern</strong> at{' '}
              <a href="https://graphura.com" target="_blank" rel="noreferrer">Graphura India Private Limited</a>, where I work with real-world datasets, predictive analytics, and AI-driven solutions.
            </p>

            <p>
              My experience includes developing full-stack web applications, building NLP-based systems, implementing machine learning models, and creating modern user-centric digital products.
            </p>

            <p>
              I enjoy solving real-world problems through technology and continuously expanding my knowledge in AI, Machine Learning, Data Science, and modern web development.
            </p>

            <p>Here are some of the technologies and areas I’ve been working with:</p>
          </div>

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
        </StyledText>

        <StyledPic>
          <div className="wrapper">
            <StaticImage
              className="img"
              src="../../images/me.png"
              width={500}
              quality={95}
              formats={['AUTO', 'WEBP', 'AVIF']}
              alt="Headshot"
            />
          </div>
        </StyledPic>
      </div>
    </StyledAboutSection>
  );
};

export default About;
