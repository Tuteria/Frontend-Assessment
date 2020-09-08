import Link from "next/link";
import { useState, useEffect } from "react";
import fetch from "isomorphic-unfetch";
import {
	Button,
	Stack,
	FormControl,
	FormLabel,
	Input,
	Text,
	Textarea,
	Select,
	CircularProgress,
	FormErrorMessage,
} from "@chakra-ui/core";
import { useRouter } from "next/router";
import ErrorMessage from "../components/ErrorMessage";

const NewNote = () => {
	// const [title, setTitle] = useState("");
	// const [body, setBody] = useState("");
	// const [category, setCategory] = useState("");
	// const [isSubmitting, setIsSubmitting] = useState(false);
	// const [isLoading, setIsLoading] = useState(false);
	// const router = useRouter();
	// const handleCreateNote = async (event) => {
	// 	event.preventDefault();
	// 	setIsSubmitting(true);
	// };
	// const validate = () => {
	// 	let err: any = {};
	// 	if (title === "") {
	// 		err.title = "Title is required";
	// 	}
	// 	return err;
	// };
	// return (
	// 	<form method="POST" onSubmit={handleCreateNote}>
	// 		<Stack maxWidth={600} margin="auto" spacing={5} marginTop={5}>
	// 			<Text>Create New Post</Text>
	// 			<FormControl>
	// 				<Input
	// 					variant="flushed"
	// 					type="text"
	// 					id="title"
	// 					placeholder="Note Title"
	// 					value={title}
	// 					onChange={({ target }) => setTitle(target.value)}
	// 				/>
	// 			</FormControl>
	// 			<FormControl>
	// 				<Select
	// 					value={category}
	// 					variant="flushed"
	// 					placeholder="Select Category"
	// 					onChange={({ target }) => setCategory(target.value)}
	// 				>
	// 					<option value="others">Others</option>
	// 					<option value="work">Work</option>
	// 					<option value="study">Study</option>
	// 					<option value="personal">Personal</option>
	// 				</Select>
	// 			</FormControl>
	// 			<FormControl>
	// 				<Textarea
	// 					value={body}
	// 					variant="flushed"
	// 					placeholder="Note Body"
	// 					onChange={({ target }) => setBody(target.value)}
	// 				/>
	// 			</FormControl>
	// 			<FormControl>
	// 				<Button
	// 					type="submit"
	// 					variantColor="blue"
	// 					width="full"
	// 					variant="outline"
	// 					size="md"
	// 				>
	// 					{isSubmitting ? (
	// 						<CircularProgress isIndeterminate size="24px" color="teal" />
	// 					) : (
	// 						"Create Note"
	// 					)}
	// 				</Button>
	// 			</FormControl>
	// 		</Stack>
	// 	</form>
	// );
	// TODO: Build form using formic
	// 	function validateName(value) {
	//     let error;
	//     if (!value) {
	//       error = "Name is required";
	//     } else if (value !== "Naruto") {
	//       error = "Jeez! You're not a fan 😱";
	//     }
	//     return error;
	//   }
	//   return (
	//     <Formik
	//       initialValues={{ name: "Sasuke" }}
	//       onSubmit={(values, actions) => {
	//         setTimeout(() => {
	//           alert(JSON.stringify(values, null, 2));
	//           actions.setSubmitting(false);
	//         }, 1000);
	//       }}
	//     >
	//       {props => (
	//         <form onSubmit={props.handleSubmit}>
	//           <Field name="name" validate={validateName}>
	//             {({ field, form }) => (
	//               <FormControl isInvalid={form.errors.name && form.touched.name}>
	//                 <FormLabel htmlFor="name">First name</FormLabel>
	//                 <Input {...field} id="name" placeholder="name" />
	//                 <FormErrorMessage>{form.errors.name}</FormErrorMessage>
	//               </FormControl>
	//             )}
	//           </Field>
	//           <Button
	//             mt={4}
	//             variantColor="teal"
	//             isLoading={props.isSubmitting}
	//             type="submit"
	//           >
	//             Submit
	//           </Button>
	//         </form>
	//       )}
	//     </Formik>
	//   );
	// }
};

export default NewNote;
