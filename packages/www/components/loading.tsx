import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import ContainerDimensions from "react-container-dimensions";

export default class Loading extends Component {
	render = () => (
		<div className="text-primary v-parent h-100">
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
