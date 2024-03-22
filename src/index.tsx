import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Popup from "./popup";
import "./common/styles/reset.less";

ReactDOM.render(
	<BrowserRouter>
			<Popup />
	</BrowserRouter>,
	document.getElementById("root")
);
