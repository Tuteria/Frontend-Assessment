import { ZetaProvider } from "@tuteria/components";
import { addDecorator } from "@storybook/react";
import * as React from "react";

addDecorator((StoryFn: Function) => (
	<ZetaProvider>
		<StoryFn />
	</ZetaProvider>
));
