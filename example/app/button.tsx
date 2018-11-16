import React from "react";
import styled, {StyledComponent} from "styled-components";

const StyledButton: StyledComponent<any, {}> = styled.button`
	border-radius: 3px;
	padding: 0.5em 1em;
	font-size: 1em;
	font-family: monospace;
	background: hsl(0, 0%, 20%);
	color: hsl(0, 0%, 80%);
	border: 1px solid red;
`;

export default function Button(props): React.ReactElement<React.ButtonHTMLAttributes<{}>> {
	return <StyledButton {...props}>{props.children}</StyledButton>;
}
