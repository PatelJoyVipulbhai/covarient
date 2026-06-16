/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./App.tsx", "./components/**/*.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        lime: {
          DEFAULT: '#8EE000',
          dim: '#5C8A1A',
          glow: 'rgba(142, 224, 0, 0.12)',
          glow2: 'rgba(142, 224, 0, 0.06)',
        },
        dark: '#000000',
        darkSecondary: '#0a0a0a',
        card: '#111111',
        card2: '#141414',
        borderSubtle: 'rgba(255, 255, 255, 0.08)',
        customMuted: '#888888',
        customText: '#FFFFFF',
      },
      fontFamily: {
        space: ['SpaceGrotesk_600SemiBold', 'SpaceGrotesk_700Bold', 'sans-serif'],
        sans: ['Inter_400Regular', 'Inter_600SemiBold', 'sans-serif'],
        mono: ['JetBrainsMono_400Regular', 'monospace'],
      }
    },
  },
  plugins: [],
}