import React from "react";
import ReactDOM from "react-dom";
import {setConfig} from "react-hot-loader";

export type RootElement = HTMLElement;
export const renderRoot: RootElement = document.getElementById("app");

export declare type Renderer = (app: any, rootElement?: RootElement) => any;

export const render: Renderer = (app, rootElement = renderRoot) => {
	return ReactDOM.render(app, rootElement);
};

setConfig({logLevel: "no-errors-please"});
