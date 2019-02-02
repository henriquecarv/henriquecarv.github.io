import * as React from "react";
const { Component } = React;

class Hello extends Component {
	constructor(props: Readonly<{}>) {
		super(props);
	}

	public render() {
		return <h1>Hello World</h1>;
	}
}

export default Hello;
