console.log('Tailwind config loaded!');

module.exports = {
  presets: [require('nativewind/preset')], // Ensure NativeWind preset is included
  content: [
    './App.{js,jsx,ts,tsx}', // Entry point
    './src/**/*.{js,jsx,ts,tsx}', // All source files
  ],
  theme: {
    extend: {},
  },
};
