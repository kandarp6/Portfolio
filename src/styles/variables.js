import { css } from 'styled-components';

const variables = css`
  :root {
    --dark-navy: #050505;
    --navy: #050505;
    --light-navy: #0a0a0c;
    --lightest-navy: #151518;
    --navy-shadow: rgba(0, 0, 0, 0.95);
    --dark-slate: #52525b;
    --slate: #a1a1aa;
    --light-slate: #e4e4e7;
    --lightest-slate: #f4f4f5;
    --bg-glass: rgba(255, 255, 255, 0.03);
    --border-glass: rgba(255, 255, 255, 0.08);
    --shadow-premium: 0 12px 40px rgba(0, 0, 0, 0.45);
    --shadow-bevel: inset 0 1px 0 0 rgba(255, 255, 255, 0.08);
    --white: #ffffff;
    --green: #ffffff;
    --green-tint: rgba(255, 255, 255, 0.08);
    --pink: #a1a1aa;
    --blue: #d4d4d8;
    --neon-cyan: #ffffff;
    --neon-purple: #3f3f46;
    --accent-gradient: linear-gradient(135deg, #ffffff 0%, #71717a 100%);

    --font-sans: 'Calibre', 'Inter', 'San Francisco', 'SF Pro Text', -apple-system, system-ui,
      sans-serif;
    --font-mono: 'SF Mono', 'Fira Code', 'Fira Mono', 'Roboto Mono', monospace;

    --fz-xxs: 12px;
    --fz-xs: 13px;
    --fz-sm: 14px;
    --fz-md: 16px;
    --fz-lg: 18px;
    --fz-xl: 20px;
    --fz-xxl: 22px;
    --fz-heading: 32px;

    --border-radius: 4px;
    --nav-height: 100px;
    --nav-scroll-height: 70px;

    --tab-height: 42px;
    --tab-width: 120px;

    --easing: cubic-bezier(0.645, 0.045, 0.355, 1);
    --transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);

    --hamburger-width: 30px;

    --ham-before: top 0.1s ease-in 0.25s, opacity 0.1s ease-in;
    --ham-before-active: top 0.1s ease-out, opacity 0.1s ease-out 0.12s;
    --ham-after: bottom 0.1s ease-in 0.25s, transform 0.22s cubic-bezier(0.55, 0.055, 0.675, 0.19);
    --ham-after-active: bottom 0.1s ease-out,
      transform 0.22s cubic-bezier(0.215, 0.61, 0.355, 1) 0.12s;
  }
`;

export default variables;
