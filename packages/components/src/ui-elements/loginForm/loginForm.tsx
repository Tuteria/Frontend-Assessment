import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styles from './loginForm.module.css';
import classNames from "classnames/bind";
import {Button, Checkbox, FormControl, FormErrorMessage, FormLabel, Input, useToast} from "@chakra-ui/core";
import {Field, Formik} from "formik";

let cx = classNames.bind(styles);


export const LoginForm = ({onSubmit}: any) => {
	const toast = useToast();



	function validateUsername(value: any) {
		let error;
		if (!value) {
			error = "Username is required";
		}
		return error;
	}

	function validatePassword(value: any) {
		let error;
		if (!value) {
			error = "Password is required";
		}
		return error;
	}

	return (
		<div className={styles.noteContainer}>
			<Formik
				initialValues={{ name: "", pass: "" }}
				onSubmit={(values, actions) => {
					// setTimeout(() => {
					// 	alert(JSON.stringify(values, null, 2));
					// 	actions.setSubmitting(false);
					// }, 1000);
					onSubmit(values.name, values.pass)
				}}
			>
				{props => (
					<form onSubmit={props.handleSubmit}>
						<Field name="name" validate={validateUsername}>
							{({ field, form }: any) => (
								<FormControl isRequired isInvalid={form.errors.name && form.touched.name} className='formField'>
									<FormLabel htmlFor="name">Username</FormLabel>
									<Input {...field} id="name" placeholder="name" />
									<FormErrorMessage>{form.errors.name}</FormErrorMessage>
								</FormControl>
							)}
						</Field>
						<Field name="pass" validate={validatePassword}>
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
