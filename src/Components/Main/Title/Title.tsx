import * as React from 'react';
import { Component, Fragment } from 'react';

class Title extends Component {
	constructor(props: Readonly<{}>) {
		super(props);
	}

	render() {
		return (
			<Fragment>
				<h1 className="h1-responsive">Henrique Carvalho da Cruz</h1>
				<p>
					<a
						target="_blank"
						href="https://www.linkedin.com/title/business-technologist"
						rel="noopener"
					>
						IT/Business Technologist
					</a>
				</p>
			</Fragment>
		);
	}
}

export default Title;
