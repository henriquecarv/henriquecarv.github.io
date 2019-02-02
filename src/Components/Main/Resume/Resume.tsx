import * as React from "react";
const { Component, Fragment } = React;

class Resume extends Component {
	constructor(props: Readonly<{}>) {
		super(props);
	}

	public render() {
		const resumes: any = {
			English: "https://drive.google.com/open?id=19gx0pp8w1YybK2uObbd3olEVoAHHUP_W",
			Portuguese: "https://drive.google.com/open?id=1ZoCGhqCxEv2iSaDGkrF4uQvdefBNWdun",
		};

		const resumeAnchors = Object.keys(resumes)
			.sort()
			.map((propertyKey, index) => {
				const href = resumes[propertyKey];
				return (
					<a
						key={index}
						target="_blank"
						href={href}
						rel="noopener"
						className="btn btn-primary btn-lg waves-effect waves-light"
					>
						<i className="fas fa-download" aria-hidden="true" />
						Resume ({propertyKey})
					</a>
				);
			});

		return <Fragment>{resumeAnchors}</Fragment>;
	}
}

export default Resume;
