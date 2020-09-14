import { addDecorator } from "@storybook/react";
import * as React from "react";
import { ThemeProvider, CSSReset } from '@chakra-ui/core';

addDecorator((StoryFn: Function) => (
	<ThemeProvider>
		<CSSReset />
		<StoryFn />
	</ThemeProvider>
));
