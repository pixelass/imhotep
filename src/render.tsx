import React from "react";
import ReactDOM from "react-dom";

const renderRoot = document.getElementById("renderRoot");

declare type Renderer = (
	app: Array<React.ReactElement<any>>
) => React.Component<any, React.ComponentState> | Element | void;

const render: Renderer = app => ReactDOM.render(app, renderRoot);

export default render;
