import React from "react";
import Button from "./button";

interface ICounterState {
	counter: number;
}

class Counter extends React.Component<{}, ICounterState> {
	public state = {
		counter: 0
	};
	public render() {
		return (
			<div>
				<Button onClick={this.plus}>+</Button>
				<Button onClick={this.minus}>-</Button>
				<h1>{this.state.counter}</h1>
			</div>
		);
	}
	private minus = () => {
		this.setState(
			prevState => ({
				counter: prevState.counter - 1
			}),
			() => {}
		);
	};
	private plus = () => {
		this.setState(prevState => ({
			counter: prevState.counter + 1
		}));
	};
}

export default Counter;
