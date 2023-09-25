"use strict";
import express from "express";
import cors from "cors";
import filesRoutes from "./src/files/routes.js";
const app = express();

app.use(cors());
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Authorization,X-API-KEY,Origin,X-Rquested-Widht,Content-Type,Accept,Acces-Control-Allow-Request-Method"
	);
	res.header("Access-Control-Allow-Methods", "*");
	res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
	next();
});

app.use("/", filesRoutes);
app.use("/", (req, res) => {
	res.send({ msg: "Hello!" });
});
export default app;
