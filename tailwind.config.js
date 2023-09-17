/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./page.html", "./person.html", "./lenta.html"],
  theme: {
    extend: {
		keyframes: {
			show: {
				'0%': {transform: 'translateX(100%)', opacity: '0'},
				'100%': {transform: 'translateX(0%)', opacity:'1'} 
			},
			back: {
				'0%': {transform: 'translateX(0%)', opacity: '1'},
				'100%': {transform: 'translateX(100%)', opacity:'0'} 
			}
		},
		animation: {
			show: 'show 1s ease-in-out 1',
			back: 'back 1s ease-in-out 1',
		}
	},
  },
  plugins: [],
}

