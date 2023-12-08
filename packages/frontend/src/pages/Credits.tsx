
function Credits() {
  return (
    <>
			<h2 className="text-3xl font-semibold mb-2">Team</h2>
			<ul className="mb-8">
				<li>[Your Name] - Lead Engineer</li>
			</ul>

			<h2 className="text-3xl font-semibold mb-6">Tech stack</h2>
			<ul className="mb-8 flex gap-8 text-center text-sm font-mono lowercase">
				<li>
					<a href="https://colyseus.io" className="flex flex-col hover:underline">
						<svg version="1.2" viewBox="0 0 120 134" className="text-white m-auto w-12 h-12 mb-2" fill="currentColor"> <defs> <linearGradient id="cfg1" x2="1" gradientUnits="userSpaceOnUse" gradientTransform="matrix(119.53,94.81,-119.798,151.033,13.09,4.21)"> <stop offset="0" stopColor="#a32fe0"></stop> <stop offset="1" stopColor="#5945e3"></stop> </linearGradient> <linearGradient id="cfg2" x2="1" gradientUnits="userSpaceOnUse" gradientTransform="matrix(119.53,94.8,-124.011,156.362,16.8,-0.46)"> <stop offset="0" stopColor="#a32fe0"></stop> <stop offset="1" stopColor="#5945e3"></stop> </linearGradient> <linearGradient id="cfg3" x2="1" gradientUnits="userSpaceOnUse" gradientTransform="matrix(119.53,94.8,-57.693,72.743,-14.54,39.05)"> <stop offset="0" stopColor="#a32fe0"></stop> <stop offset="1" stopColor="#5945e3"></stop> </linearGradient> </defs>  <g id="Layer_1-2"> <g id="Layer"> <path id="Layer" className="cf1" d="m19.8 48.5c3.4 2.8 7.5 5.5 12.5 7.9 3.7-7 17.7-24.8 57.4-19.6l-3.5-13.6c-49.3-4.2-63.5 19-66.4 25.3z"></path> <path id="Layer" className="cf2" d="m11 41.3c5.5-10 24.4-30.6 71.4-26.1l-6-14.8c0 0-49.3-5.7-74.2 26.6 0.9 2.6 3.3 8.2 8.8 14.3z"></path> <path id="Layer" className="cf3" d="m100.4 71.7q-11.9 1.2-22.1 1.2c-48 0-69.2-18.8-78.3-32.3v62c0 0.1 3.9 40.2 120.4 28.5 0 0-20-59.4-20-59.4z"></path> </g> </g> </svg>
						<span className="mt-auto">Colyseus</span>
					</a>
				</li>

				<li>
					<a href="https://react.dev/" className="flex flex-col hover:underline">
						<svg viewBox="-10.5 -9.45 21 18.9" fill="none" xmlns="http://www.w3.org/2000/svg" className="m-auto w-12 h-12 mb-2"><circle cx="0" cy="0" r="2" fill="currentColor"></circle><g stroke="currentColor" strokeWidth="1" fill="none"><ellipse rx="10" ry="4.5"></ellipse><ellipse rx="10" ry="4.5" transform="rotate(60)"></ellipse><ellipse rx="10" ry="4.5" transform="rotate(120)"></ellipse></g></svg>
						<span>React</span>
					</a>
				</li>

				{/* <li>
					<a href="https://react.dev/" className="flex flex-col hover:underline">
						<svg viewBox="0 0 38 38" className="m-auto w-12 h-12 mb-2"><path d="M13.582 20.41c-1.39 0-2.523-1.142-2.523-2.542s1.133-2.542 2.523-2.542c1.39 0 2.523 1.142 2.523 2.542 0 1.399-1.134 2.542-2.523 2.542zM7.524 25.457c-1.388-.003-2.518-1.15-2.514-2.55a2.537 2.537 0 012.532-2.534c1.389.003 2.519 1.15 2.514 2.551a2.538 2.538 0 01-2.532 2.533zM30.486 25.457a2.538 2.538 0 01-2.543-2.523c-.007-1.402 1.118-2.553 2.505-2.56a2.538 2.538 0 012.542 2.522c.008 1.401-1.118 2.553-2.504 2.561z" fill="currentColor" /> <path d="M25.757 15.474c-.686-.214-1.419-.303-2.138-.381-1.112-.12-1.555-.554-1.743-1.668-.106-.622-.254-1.26-.523-1.825-.513-1.075-1.715-1.557-2.922-1.282-1.02.233-1.867 1.248-1.914 2.29-.054 1.188.626 2.203 1.794 2.553.555.167 1.145.25 1.724.293 1.063.077 1.418.394 1.705.878.182.306.357.607.357 1.517 0 .911-.177 1.212-.357 1.517-.287.484-.642.8-1.705.879-.58.042-1.17.126-1.724.293-1.168.351-1.848 1.364-1.794 2.554.047 1.041.895 2.056 1.914 2.289 1.207.276 2.409-.207 2.922-1.282.27-.564.417-1.203.523-1.825.189-1.114.632-1.547 1.743-1.668.72-.078 1.452-.168 2.138-.382 1.041-.325 1.667-1.296 1.667-2.375 0-1.078-.626-2.048-1.667-2.375z" fill="#F44250" /></svg>
						<span>React Router</span>
					</a>
				</li> */}

				<li>
					<a href="https://tailwind.dev" className="flex flex-col hover:underline">
						<svg xmlns="http://www.w3.org/2000/svg" className="m-auto w-12 h-12 mb-2" fill="currentColor" viewBox="0 0 54 33"><g clipPath="url(#prefix__clip0)"><path fill="#38bdf8" fillRule="evenodd" d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z" clipRule="evenodd"/></g><defs><clipPath id="prefix__clip0"><path fill="#fff" d="M0 0h54v32.4H0z"/></clipPath></defs></svg>
						<span className="mt-auto">TailwindCSS</span>
					</a>
				</li>

				<li>
					<a href="https://vitejs.dev/" className="flex flex-col hover:underline">
						<svg className="m-auto w-12 h-12 mb-2" viewBox="0 0 410 404" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M399.641 59.5246L215.643 388.545C211.844 395.338 202.084 395.378 198.228 388.618L10.5817 59.5563C6.38087 52.1896 12.6802 43.2665 21.0281 44.7586L205.223 77.6824C206.398 77.8924 207.601 77.8904 208.776 77.6763L389.119 44.8058C397.439 43.2894 403.768 52.1434 399.641 59.5246Z" fill="url(#paint0_linear)"/> <path d="M292.965 1.5744L156.801 28.2552C154.563 28.6937 152.906 30.5903 152.771 32.8664L144.395 174.33C144.198 177.662 147.258 180.248 150.51 179.498L188.42 170.749C191.967 169.931 195.172 173.055 194.443 176.622L183.18 231.775C182.422 235.487 185.907 238.661 189.532 237.56L212.947 230.446C216.577 229.344 220.065 232.527 219.297 236.242L201.398 322.875C200.278 328.294 207.486 331.249 210.492 326.603L212.5 323.5L323.454 102.072C325.312 98.3645 322.108 94.137 318.036 94.9228L279.014 102.454C275.347 103.161 272.227 99.746 273.262 96.1583L298.731 7.86689C299.767 4.27314 296.636 0.855181 292.965 1.5744Z" fill="url(#paint1_linear)"/> <defs> <linearGradient id="paint0_linear" x1="6.00017" y1="32.9999" x2="235" y2="344" gradientUnits="userSpaceOnUse"> <stop stopColor="#41D1FF"/> <stop offset="1" stopColor="#BD34FE"/> </linearGradient> <linearGradient id="paint1_linear" x1="194.651" y1="8.81818" x2="236.076" y2="292.989" gradientUnits="userSpaceOnUse"> <stop stopColor="#FFEA83"/> <stop offset="0.0833333" stopColor="#FFDD35"/> <stop offset="1" stopColor="#FFA800"/> </linearGradient> </defs> </svg>
						<span>Vite</span>
					</a>
				</li>

			</ul>
    </>
  )
}

export default Credits
