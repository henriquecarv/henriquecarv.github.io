import * as React from 'react';
import { Component, Fragment } from 'react';

class Resume extends Component {
	constructor(props: Readonly<{}>) {
		super(props);
	}

	render() {
		const resumes: any = {
			Portuguese:
				'https://drive.google.com/open?id=1ZoCGhqCxEv2iSaDGkrF4uQvdefBNWdun',
			English:
				'https://drive.google.com/open?id=19gx0pp8w1YybK2uObbd3olEVoAHHUP_W',
		};

		return (
			<Fragment>
				{Object.keys(resumes)
					.sort()
					.map((propertyKey, index) => {
						const href = resumes[propertyKey];
						<a
							key={index}
							target="_blank"
							href={href}
							rel="noopener"
							className="btn btn-primary btn-lg waves-effect waves-light"
						>
							<i className="fas fa-download" aria-hidden="true" />
							Resume ({propertyKey})
						</a>;
					})}
			</Fragment>
		);
	}
}

export default Resume;
