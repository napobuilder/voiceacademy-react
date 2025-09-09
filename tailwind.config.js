/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'accent-blue': '#002366',
        'accent-orange': '#E08A1B',
        'accent-orange-hover': '#EEA850',
        'fondo': '#F8F9FA',
        'fondo-seccion': '#FFFFFF',
        'secondary-bg': '#2A8D95',
        'texto-principal': '#1A1A2E',
        'texto-secundario': '#5A5A6D',
        'error': '#D93025',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        'suave': '0 10px 30px rgba(0, 0, 0, 0.05)',
        'intensa': '0 15px 40px rgba(0, 35, 102, 0.2)',
        'funnel': '0 20px 50px rgba(0, 35, 102, 0.1)',
        'whatsapp': '0 4px 15px rgba(37, 211, 102, 0.4)',
        'hover-intense': '0 20px 50px rgba(0, 35, 102, 0.25)',
      },
      borderRadius: {
        'custom': '12px',
      },
    },
  },
  plugins: [],
}
