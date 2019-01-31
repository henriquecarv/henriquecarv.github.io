import * as React from 'react';
import { Component } from 'react';

class Bio extends Component {
	constructor(props: Readonly<{}>) {
		super(props);
	}

	render() {
		return (
			<article className="bio">
				<p>
					Blockchain/Artificial Intelligence Enthusiast & Software Developer at{' '}
					<a target="_blank" href="https://jussi.com.br/" rel="noopener">
						Jüssi
					</a>
				</p>
				<p>
					Graduated from{' '}
					<a target="_blank" href="http://fatecriopreto.edu.br/" rel="noopener">
						FATEC - Rio Preto{' '}
					</a>{' '}
					with a year and a half studying abroad program at the
					<a target="_blank" href="http://web.plattsburgh.edu/">
						State University of New York in Plattsburgh
					</a>
				</p>
				<p>
					I'm also{' '}
					<a
						target="_blank"
						rel="noopener"
						href="https://www.vegansociety.com/go-vegan/why-go-vegan"
					>
						Vegan
					</a>
					, who likes to
					<a
						target="_blank"
						rel="noopener"
						href="https://www.youtube.com/channel/UC851UKcQ2kBaJd-4SzHVa4A"
					>
						play guitar{' '}
					</a>{' '}
					and workout with my friends in my free time
				</p>
			</article>
		);
	}
}

export default Bio;
