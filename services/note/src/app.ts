// import "./env";
import { PrismaClient } from "@prisma/client";
import app from ".";

const prisma = new PrismaClient();

app.locals.prisma = prisma;
let PORT = 3000;
if (process.env.PORT !== undefined) {
  PORT = parseInt(process.env.PORT, 10);
}
app.listen(PORT, () => {
  console.log(`> Running on localhost:${PORT}`);
});