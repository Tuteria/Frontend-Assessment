import { Container, Row } from "react-bootstrap";
import Head from "next/head";

export default function Body({ aside, main }) {
	return (
		<div className="bg-light" id="body">
			{!aside ? "" : <aside className="shadow bg-white rounded">{aside}</aside>}
			<main>{main}</main>
		</div>
	);
}
