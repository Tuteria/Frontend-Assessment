import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styles from './userForm.module.css';
import classNames from "classnames/bind";
import {FormControl, FormLabel, Input, FormErrorMessage, Button, Checkbox} from "@chakra-ui/core";
import {Field, Formik} from "formik";

let cx = classNames.bind(styles);


export const UserForm = ({onSubmit}: any) => {

	return (
		<div className={styles.userContainer}>
			<Formik
				initialValues={{ name: "", email: "", pass: "" }}
				onSubmit={(values) => {
					onSubmit(values.name, values.email, values.pass)
				}}
			>
				{props => (
					<form onSubmit={props.handleSubmit}>
						<Field name="name">
							{({ field, form }: any) => (
								<FormControl isRequired isInvalid={form.errors.name && form.touched.name} className='formField'>
									<FormLabel htmlFor="name">Username</FormLabel>
									<Input {...field} id="name" placeholder="name" />
									<FormErrorMessage>{form.errors.name}</FormErrorMessage>
								</FormControl>
							)}
						</Field>
						<Field name="email">
							{({ field, form }: any) => (
								<FormControl isRequired isInvalid={form.errors.email && form.touched.email} className='formField'>
									<FormLabel htmlFor="email">Email</FormLabel>
									<Input {...field} id="email" placeholder="title" type="email" />
									<FormErrorMessage>{form.errors.email}</FormErrorMessage>
								</FormControl>
							)}
						</Field>
						<Field name="pass">
							{({ field, form }: any) => (
								<FormControl isRequired isInvalid={form.errors.pass && form.touched.pass} className='formField'>
									<FormLabel htmlFor="pass">Password</FormLabel>
									<Input {...field} id="pass" placeholder="pass" type="password" />
									<FormErrorMessage>{form.errors.desc}</FormErrorMessage>
								</FormControl>
							)}
						</Field>
						<Button
							mt={4}
							variantColor="teal"
							className='formBtn'
							type="submit"
						>
							Submit
						</Button>
					</form>
				)}
			</Formik>
		</div>
	);
}
