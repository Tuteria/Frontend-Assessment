import React from 'react';

import { Header } from '../ui-elements/header/header';

export default {
	title: 'Components/Header',
	component: Header,
};

const Template = (args: any) => <Header {...args} />;

export const AdminLoggedIn = Template.bind({});
// @ts-ignore
AdminLoggedIn.args = {
	user: {name: "Dika", isAdmin: true},
};

export const LoggedIn = Template.bind({});
// @ts-ignore
LoggedIn.args = {
	user: {name: "Dika", isAdmin: false},
};

export const LoggedOut = Template.bind({});
// @ts-ignore
LoggedOut.args = {};
