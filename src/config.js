module.exports = {
  email: 'kandarpvadher9@gmail.com',

  socialMedia: [
    {
      name: 'GitHub',
      url: 'https://github.com/kandarp6',
    },
    {
      name: 'Linkedin',
      url: 'https://www.linkedin.com/in/kandarp-vadher',
    },
    {
      name: 'WhatsApp',
      url: 'https://wa.me/917623805920',
    },
  ],

  navLinks: [
    {
      name: 'About',
      url: '/#about',
    },
    {
      name: 'Skills',
      url: '/#skills',
    },
    {
      name: 'Experience',
      url: '/#jobs',
    },
    {
      name: 'Projects',
      url: '/#projects',
    },
    {
      name: 'Contact',
      url: '/#contact',
    },
  ],

  colors: {
    green: '#ffffff',
    navy: '#000000',
    darkNavy: '#030303',
  },

  githubStats: {
    useManual: true, // Set to true to use manual stats below instead of fetching from API
    totalContributions: 76,
    longestStreak: 12,
    reposCount: 8,
  },

  srConfig: (delay = 200, viewFactor = 0.25) => ({
    origin: 'bottom',
    distance: '20px',
    duration: 500,
    delay,
    rotate: { x: 0, y: 0, z: 0 },
    opacity: 0,
    scale: 1,
    easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    mobile: true,
    reset: false,
    useDelay: 'always',
    viewFactor,
    viewOffset: { top: 0, right: 0, bottom: 0, left: 0 },
  }),
};

