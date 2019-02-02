import * as React from "react";
import Bio from "./Bio/Bio";
import Picture from "./Picture/Picture";
import Resume from "./Resume/Resume";
import Title from "./Title/Title";
const { Component } = React;

class Main extends Component {
	constructor(props: Readonly<{}>) {
		super(props);
	}

	public render() {
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
