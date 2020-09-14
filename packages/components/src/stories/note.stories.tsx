import React from 'react';
import {Note} from "../ui-elements/note/note";

export default {
	title: 'Components/Note',
	component: Note,
	decorators: [story => <div style={{ margin: 'auto' }}>{story()}</div>],
};

const Template = (args: any) => <Note {...args} />;

export const Default = Template.bind({});
// @ts-ignore
Default.args = {
	title: "Note 1",
	content: "Anim pariatur cliche reprehenderit, enim eiusmod high life " +
		"accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer " +
		"labore wes anderson cred nesciunt sapiente ea proident."
};
