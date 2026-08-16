import express from "express";
import { errorHandler } from "./middleware/errorHandlingMiddleware.js";
import cors from 'cors';
import apiRouter from "./routes/api.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors({
	origin: process.env.CLIENT_URL,
	credentials: true
}))

app.use(express.urlencoded({ extended: true }));

app.use("/", apiRouter)

app.use(errorHandler);
app.listen(PORT, () => {
	console.log(`Server is listening on Port ${PORT}`);
});
