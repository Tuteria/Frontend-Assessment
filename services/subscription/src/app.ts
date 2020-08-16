import "./env";
import app from ".";

let PORT = 3000;
if (process.env.PORT !== undefined) {
	PORT = parseInt(process.env.PORT, 10);
}
app.listen(PORT, (err: Error) => {
	if (err) throw err;
	console.log(`> Running on localhost:${PORT}`);
});
