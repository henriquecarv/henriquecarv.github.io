import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Hello from './Components/Hello/Hello';

ReactDOM.render(<Hello />, document.getElementById('root'));

if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		navigator.serviceWorker
			.register('./service-worker.js')
			.then((registration) => {
				console.log('SW registered: ', registration);
			})
			.catch((registrationError) => {
				console.error('SW registration failed: ', registrationError);
			});
	});
}
