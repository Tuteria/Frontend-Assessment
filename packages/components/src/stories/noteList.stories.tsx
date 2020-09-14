import React from 'react';

import NoteList from '../ui-elements/noteList/noteList';
import * as NoteStories from './note.stories';

export default {
	component: NoteList,
	title: 'Components/NoteList',
	decorators: [story => <div style={{ margin: 'auto' }}>{story()}</div>],
};

const content = "Anim pariatur cliche reprehenderit, enim eiusmod high life " +
	"accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer " +
	"labore wes anderson cred nesciunt sapiente ea proident."

const Template = (args: any) => <NoteList {...args} />;

export const Default = Template.bind({});
// @ts-ignore
Default.args = {
	// Shaping the stories through args composition.
	// The data was inherited from the Default story in note.stories.js.
	notes: [
		{ ...NoteStories.Default.args.note, id: '1', title: 'Note 1', description: content },
		{ ...NoteStories.Default.args.note, id: '2', title: 'Note 2', description: content },
		{ ...NoteStories.Default.args.note, id: '3', title: 'Note 3', description: content },
		{ ...NoteStories.Default.args.note, id: '4', title: 'Note 4', description: content },
		{ ...NoteStories.Default.args.note, id: '5', title: 'Note 5', description: content },
		{ ...NoteStories.Default.args.note, id: '6', title: 'Note 6', description: content },
	],
};

export const Loading = Template.bind({});
// @ts-ignore
Loading.args = {
	notes: [],
	loading: true,
};

export const Empty = Template.bind({});
// @ts-ignore
Empty.args = {
	// Shaping the stories through args composition.
	// Inherited data coming from the Loading story.
	notes: [],
	loading: false,
};
