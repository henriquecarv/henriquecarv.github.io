import { cube } from './math';
import './style.scss';

const component = () => {
	const element = document.createElement('pre');

	element.innerHTML = ['Hello webpack', `5 cubed is equal to ${cube(5)}`].join(
		'\n\n',
	);

	return element;
};

let element = component();

document.body.appendChild(element);

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
