import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledLearningSection = styled.section`
  max-width: 800px;
`;

const StyledLearningGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 15px;
  margin-top: 30px;
`;

const StyledLearningCard = styled.div`
  background-color: var(--light-navy);
  border: 1px solid var(--lightest-navy);
  padding: 20px;
  border-radius: var(--border-radius);
  transition: var(--transition);
  cursor: default;

  h3 {
    margin: 0 0 10px;
    font-size: var(--fz-md);
    color: var(--white);
    font-family: var(--font-mono);
  }

  p {
    margin: 0;
    font-size: var(--fz-xs);
    color: var(--slate);
  }

  &:hover {
    border-color: var(--green);
    transform: translateY(-5px);
    box-shadow: 0 10px 20px -15px var(--navy-shadow);
  }
`;

const Learning = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const topics = [
    {
      title: 'Generative AI',
      desc: 'Exploring prompt engineering, diffusion models, and neural architecture fine-tuning.'
    },
    {
      title: 'Large Language Models',
      desc: 'Studying transformer architectures, retrieval-augmented generation (RAG), and model fine-tuning.'
    },
    {
      title: 'Advanced NLP',
      desc: 'Implementing BERT embeddings, text generation transformers, and sentiment classification.'
    },
    {
      title: 'Cloud Deployment',
      desc: 'Deploying machine learning models and web backends on AWS and Google Cloud Platform.'
    },
    {
      title: 'System Design',
      desc: 'Learning high-availability system architecture, caching, microservices, and database scaling.'
    },
    {
      title: 'AI Agents',
      desc: 'Building autonomous software agents that integrate with third-party tools and APIs.'
    }
  ];

  return (
    <StyledLearningSection id="learning" ref={revealContainer}>
      <h2 className="numbered-heading">Currently Exploring</h2>
      <p style={{ color: 'var(--slate)' }}>
        Staying ahead of the curve is crucial in today’s fast-evolving tech landscape. Here are the core domains I am actively exploring and researching:
      </p>
      
      <StyledLearningGrid>
        {topics.map((topic, i) => (
          <StyledLearningCard key={i}>
            <h3>{topic.title}</h3>
            <p>{topic.desc}</p>
          </StyledLearningCard>
        ))}
      </StyledLearningGrid>
    </StyledLearningSection>
  );
};

export default Learning;
