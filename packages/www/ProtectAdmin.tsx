import React from "react";

export function ProtectAdmin(WrappedComponent: any) {
	return class extends React.Component {
		componentDidMount(): void {
			if (typeof window === "object") {
				if (!localStorage.getItem("tuteriaAdmin"))
					window.location.href = "/admin-login";
			}
		}

		render() {
			return <WrappedComponent {...this.props} />;
		}
	};
}
