import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import ContainerDimensions from "react-container-dimensions";

export default class Loading extends Component {
	render = () => (
		// <ContainerDimensions>
		// 	{({ height, width }) => (
		// 		<div className="v-align border border-danger" style={{ height: height * 0.8, width }}>
		// 			<FontAwesomeIcon
		// 				icon={faSpinner}
		// 				className="text-primary fa-3x fa-pulse load-icon"
		// 			/>
		// 		</div>
		// 	)}
		// </ContainerDimensions>
		<div className="text-primary v-parent h-75">
			<div className="v-child text-center">
				<FontAwesomeIcon
					icon={faSpinner}
					className="text-primary fa-pulse load-icon"
					style={{ fontSize: "5em" }}
				/>
			</div>
		</div>
	);
}
