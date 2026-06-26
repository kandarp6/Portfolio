import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { srConfig, githubStats } from '@config';
const githubUsername = 'kandarp6';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';
import { Icon } from '@components/icons';

const StyledGithubSection = styled.section`
  max-width: 800px;
`;

const StyledGithubWidget = styled.div`
  background-color: rgba(10, 10, 12, 0.7);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: var(--border-radius);
  padding: 30px;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 25px;
  transition: var(--transition);

  @media (max-width: 768px) {
    padding: 20px;
    gap: 20px;
  }

  @media (max-width: 480px) {
    padding: 15px;
    gap: 15px;
  }

  &:hover {
    border-color: rgba(255, 255, 255, 0.2);
    box-shadow: 0 10px 30px -10px rgba(255, 255, 255, 0.08);
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    a {
      display: flex;
      align-items: center;
      gap: 10px;
      font-family: var(--font-mono);
      font-size: var(--fz-sm);
      color: var(--green);
      
      svg {
        width: 20px;
        height: 20px;
      }
    }
  }
`;

const StyledStatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 15px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
  
  .stat-card {
    border-left: 2px solid var(--green);
    padding-left: 15px;
    
    .label {
      font-size: var(--fz-xxs);
      color: var(--slate);
      font-family: var(--font-mono);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    
    .val {
      font-size: var(--fz-xxl);
      font-weight: 600;
      color: var(--white);
      margin-top: 5px;
    }
  }
`;

const StyledContributionWrapper = styled.div`
  overflow-x: auto;
  padding-bottom: 10px;
  -webkit-overflow-scrolling: touch;
  
  /* Custom scrollbar for horizontal overflow */
  scrollbar-width: thin;
  scrollbar-color: var(--lightest-navy) var(--light-navy);
  
  &::-webkit-scrollbar {
    height: 6px;
  }
  &::-webkit-scrollbar-track {
    background: var(--light-navy);
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--lightest-navy);
    border-radius: 3px;
  }
`;

const StyledContributionGrid = styled.div`
  display: flex;
  gap: 3px;
  width: max-content;
  
  .col {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }
  
  .cell {
    width: 10px;
    height: 10px;
    border-radius: 2px;
    background-color: #111115;
    transition: background-color 0.2s ease;
    
    &.level-0 { background-color: #111115; }
    &.level-1 { background-color: rgba(255, 255, 255, 0.15); }
    &.level-2 { background-color: rgba(255, 255, 255, 0.35); }
    &.level-3 { background-color: rgba(255, 255, 255, 0.65); }
    &.level-4 { background-color: rgba(255, 255, 255, 1); }
  }
`;

const Github = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [gridData, setGridData] = useState([]);
  const [stats, setStats] = useState({
    totalContributions: githubStats?.useManual ? githubStats.totalContributions : null,
    longestStreak: githubStats?.useManual ? githubStats.longestStreak : null,
    reposCount: githubStats?.useManual ? githubStats.reposCount : null,
  });

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }
    sr.reveal(revealContainer.current, srConfig());
  }, []);

  useEffect(() => {
    // 1. Fetch real contributions from the jogruber public proxy
    fetch(`https://github-contributions-api.jogruber.de/v4/${githubUsername}`)
      .then(response => response.json())
      .then(data => {
        const contributions = data.contributions;
        if (!contributions || contributions.length === 0) return;

        // Sort chronologically ascending (oldest first)
        contributions.sort((a, b) => a.date.localeCompare(b.date));

        // Filter out future contributions to align and show proper past working days
        const todayStr = new Date().toLocaleDateString('sv-SE');
        const pastContributions = contributions.filter(day => day.date <= todayStr);

        // Calculate total contributions
        const totalCon = data.total ? Object.values(data.total).reduce((a, b) => a + b, 0) : 0;

        // Calculate longest streak of days with count > 0 using actual historical data
        let currentStreak = 0;
        let longestStreak = 0;
        pastContributions.forEach(day => {
          if (day.count > 0) {
            currentStreak++;
            if (currentStreak > longestStreak) {
              longestStreak = currentStreak;
            }
          } else {
            currentStreak = 0;
          }
        });

        // Slice contributions to standard 52 weeks (364 days) ending today, aligned timezone-safely on a Sunday
        let startIndex = pastContributions.length - 364;
        if (startIndex < 0) startIndex = 0;

        const getDayOfWeek = (dateStr) => {
          const [y, m, d] = dateStr.split('-').map(Number);
          return new Date(y, m - 1, d).getDay();
        };

        while (startIndex > 0 && getDayOfWeek(pastContributions[startIndex].date) !== 0) {
          startIndex--;
        }

        const recentCon = pastContributions.slice(startIndex);

        // Group into columns of 7 elements (Sunday to Saturday)
        const cols = [];
        let tempCol = [];
        recentCon.forEach((day, index) => {
          tempCol.push(day.level);
          if (tempCol.length === 7 || index === recentCon.length - 1) {
            while (tempCol.length < 7) {
              tempCol.push(0); // Pad short columns
            }
            cols.push(tempCol);
            tempCol = [];
          }
        });

        setGridData(cols);
        if (!githubStats?.useManual) {
          setStats(prev => ({
            ...prev,
            totalContributions: totalCon,
            longestStreak: longestStreak,
          }));
        }
      })
      .catch(err => {
        console.error('Error fetching contributions:', err);
        // Fallback grid
        const cols = 50;
        const generated = [];
        for (let c = 0; c < cols; c++) {
          const col = [];
          for (let r = 0; r < 7; r++) {
            col.push(Math.floor(Math.random() * 5));
          }
          generated.push(col);
        }
        setGridData(generated);
      });

    // 2. Fetch repo stats from official GitHub REST API
    if (!githubStats?.useManual) {
      fetch(`https://api.github.com/users/${githubUsername}`)
        .then(response => response.json())
        .then(data => {
          if (data.public_repos !== undefined) {
            setStats(prev => ({
              ...prev,
              reposCount: data.public_repos,
            }));
          }
        })
        .catch(err => console.error('Error fetching github profile:', err));
    }
  }, []);

  return (
    <StyledGithubSection id="github" ref={revealContainer}>
      <h2 className="numbered-heading">GitHub Activity</h2>
      
      <p style={{ color: 'var(--slate)' }}>
        I actively maintain and contribute to open-source systems, web products, and machine learning pipelines. Here is a snapshot of my developer lifecycle:
      </p>

      <StyledGithubWidget>
        <div className="header">
          <a href={`https://github.com/${githubUsername}`} target="_blank" rel="noreferrer">
            <Icon name="GitHub" />
            <span>github.com/{githubUsername}</span>
          </a>
        </div>

        <StyledStatsGrid>
          <div className="stat-card">
            <div className="label">Total Contributions</div>
            <div className="val">{stats.totalContributions !== null ? stats.totalContributions.toLocaleString() : '...'}</div>
          </div>
          <div className="stat-card">
            <div className="label">Longest Streak</div>
            <div className="val">{stats.longestStreak !== null ? `${stats.longestStreak} days` : '...'}</div>
          </div>
          <div className="stat-card">
            <div className="label">Repositories</div>
            <div className="val">{stats.reposCount !== null ? `${stats.reposCount} active` : '...'}</div>
          </div>
        </StyledStatsGrid>

        <StyledContributionWrapper>
          <StyledContributionGrid>
            {gridData.map((col, i) => (
              <div className="col" key={i}>
                {col.map((level, j) => (
                  <span className={`cell level-${level}`} key={j} />
                ))}
              </div>
            ))}
          </StyledContributionGrid>
        </StyledContributionWrapper>
      </StyledGithubWidget>
    </StyledGithubSection>
  );
};

export default Github;
