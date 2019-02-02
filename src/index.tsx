import * as React from "react";
import * as ReactDOM from "react-dom";
import Hello from "./Components/Hello/Hello";

ReactDOM.render(<Hello />, document.getElementById("root"));

if ("serviceWorker" in navigator) {
	window.addEventListener("load", () => {
		navigator.serviceWorker
			.register("./service-worker.js")
			.then((registration) => {
				// tslint:disable-next-line:no-console
				console.log("SW registered: ", registration);
			})
			.catch((registrationError) => {
				// tslint:disable-next-line:no-console
				console.error("SW registration failed: ", registrationError);
			});
	});
}
