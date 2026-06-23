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
      name: 'Experience',
      url: '/#jobs',
    },
    {
      name: 'Work',
      url: '/#projects',
    },
    {
      name: 'Contact',
      url: '/#contact',
    },
  ],

  colors: {
    green: '#06b6d4', // Premium cyan accent
    navy: '#0b0f19',  // Dark obsidian grey
    darkNavy: '#030712', // Obsidian black
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

