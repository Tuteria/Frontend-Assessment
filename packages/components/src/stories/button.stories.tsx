import React from "react";
import { action } from "@storybook/addon-actions";
import { Button } from "@storybook/react/demo";

export default {
	title: "Components/Button",
};

export const Text = () => (
	<Button onClick={action("clicked")}>Hello Button</Button>
);

