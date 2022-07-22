/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            backgroundImage: {
                forest: "url(src/assets/img/hero2.jpg)"
            }
        },
    },
    plugins: [],
};
