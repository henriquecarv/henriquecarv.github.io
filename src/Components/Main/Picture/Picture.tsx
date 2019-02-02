import * as React from "react";
const { Component, Fragment } = React;

class Picture extends Component {
	constructor(props: Readonly<{}>) {
		super(props);
	}

	public render() {
		return (
			<Fragment>
				<section className="profile-picture">
					<img
						className="img-fluid"
						src="https://www.gravatar.com/avatar/45dc36c036a3034db00361897cd500f0.jpg?s=130"
						alt="Henrique"
					/>
				</section>
			</Fragment>
		);
	}
}

export default Picture;
