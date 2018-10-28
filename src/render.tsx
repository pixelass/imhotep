import React from "react";
import ReactDOM from "react-dom";
import {hot, setConfig} from "react-hot-loader";

const renderRoot = document.getElementById("app");
setConfig({logLevel: "no-errors-please"});

declare type Renderer = (
	App: React.ComponentType<any>
) => React.Component<any, React.ComponentState> | Element | void;

export const render: Renderer = App =>
	{
		const HotApp = hot(module)(App);
		return ReactDOM.render(<HotApp/>, renderRoot)
	};
