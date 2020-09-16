import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styles from './noteForm.module.css';
import classNames from "classnames/bind";
import {Button, FormControl, FormErrorMessage, FormLabel, Input, Textarea} from "@chakra-ui/core";
import {Field, Formik} from "formik";

let cx = classNames.bind(styles);


export const NoteForm = ({id = null, title = '', content = '', isEditing=false, onSubmit, onEditSave}: any) => {


	function validateTitle(value: any) {
		let error;
		if (!value) {
			error = "Title is required";
		}
		return error;
	}

	function validateDesc(value: any) {
		let error;
		if (!value) {
			error = "Description is required";
		}
		return error;
	}

	return (
		<div className={styles.noteContainer}>
			<Formik
				initialValues={{ title: title, desc:content }}
				onSubmit={(values, actions) => {
					isEditing ? onEditSave(id, values.title, values.desc) : onSubmit(values.title, values.desc)
				}}
			>
				{props => (
					<form onSubmit={props.handleSubmit}>
						<Field name="title" validate={validateTitle}>
							{({ field, form }: any) => (
								<FormControl isRequired isInvalid={form.errors.title && form.touched.title} className='formField'>
									<FormLabel htmlFor="title">Title</FormLabel>
									<Input {...field} id="title" placeholder="title" />
									<FormErrorMessage>{form.errors.title}</FormErrorMessage>
								</FormControl>
							)}
						</Field>
						<Field name="desc" validate={validateDesc}>
							{({ field, form }: any) => (
								<FormControl isRequired isInvalid={form.errors.desc && form.touched.desc} className='formField'>
									<FormLabel htmlFor="desc">Description</FormLabel>
									{/*<Input {...field} id="desc" placeholder="desc" />*/}
									<Textarea {...field} id="desc" placeholder="desc" />
									<FormErrorMessage>{form.errors.desc}</FormErrorMessage>
								</FormControl>
							)}
						</Field>
						<Button
							mt={4}
							variantColor="teal"
							// isLoading={props.isSubmitting}
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
