import React from "react";
import { action } from "@storybook/addon-actions";
import { Button } from "@storybook/react/demo";
import {Spinner as Loader} from "@chakra-ui/core"

export default {
	title: "Components/Loader",
};

export const Text = () => (
  <Loader/>
);

