import Link from "next/link";

const Navbar = () => {
	return (
		<nav className="navbar">
			<Link href="/">
				<a className="navbar-brand">Notes App</a>
			</Link>
			<Link href="/admin/login">
				<a className="create">Admin</a>
			</Link>
			<Link href="/notes/new">
				<a className="create">Create Note</a>
			</Link>
		</nav>
	);
};

export default Navbar;
