import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledLeadershipSection = styled.section`
  max-width: 800px;
`;

const StyledList = styled.ul`
  ${({ theme }) => theme.mixins.fancyList};
  font-size: var(--fz-lg);
  
  li {
    margin-bottom: 15px;
    line-height: 1.5;
    color: var(--light-slate);
    
    strong {
      color: var(--white);
    }
  }
`;

const Leadership = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const items = [
    '<strong>Team collaboration & mentoring</strong>: Experience coordinating team-based development and leading collaborative code sessions.',
    '<strong>Internship coordination</strong>: Coordinating internship operations, aligning technical tasks, and facilitating smooth team onboarding.',
    '<strong>Active project contributor</strong>: Contributing to multiple technical, open-source, and AI-focused academic initiatives.',
    '<strong>Problem solving & innovation</strong>: A passionate focus on designing scalable solutions for complex systems and driving technical innovation.'
  ];

  return (
    <StyledLeadershipSection id="leadership" ref={revealContainer}>
      <h2 className="numbered-heading">Leadership &amp; Activities</h2>
      <StyledList>
        {items.map((item, i) => (
          <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
        ))}
      </StyledList>
    </StyledLeadershipSection>
  );
};

export default Leadership;
