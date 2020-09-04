import React from "react";

export function ProtectRoute(WrappedComponent: any) {
	return class extends React.Component {
		componentDidMount(): void {
			if (typeof window === "object") {
				if (!localStorage.getItem("tuteria")) window.location.href = "/login";
			}
		}

		render() {
			return <WrappedComponent {...this.props} />;
		}
	};
}
