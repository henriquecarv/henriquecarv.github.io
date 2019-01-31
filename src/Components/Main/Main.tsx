import * as React from 'react';
import { Component } from 'react';
import Picture from './Picture/Picture';
import Title from './Title/Title';
import Bio from './Bio/Bio';
import Resume from './Resume/Resume';

class Main extends Component {
	constructor(props: Readonly<{}>) {
		super(props);
	}

	render() {
		return (
			<div className="h-100 bg-photo">
				<div className="h-100 body">
					<Picture />
					<br />
					<Title />
					<Bio />
					<Resume />
				</div>
			</div>
		);
	}
}

export default Main;
