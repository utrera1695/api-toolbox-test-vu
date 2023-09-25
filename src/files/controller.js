"use strict";
import axios from "axios";
import { response } from "express";
import fs from "fs";
const url = "https://echo-serv.tbxnet.com/v1/";
const headers = {
	accept: "application/json",
	authorization: "Bearer aSuperSecretKey",
};
axios.defaults.headers = headers;
axios.defaults.baseURL = url;

const getSecretFileList = async () => {
	try {
		return await axios
			.get("secret/files")
			.then((response) => {
				return response.data;
			})
			.catch((error) => {
				return null;
			});
	} catch (error) {
		throw error;
	}
};

const csvToJson = async (csv) => {
	//console.log(csv);
	const splitJumpLine = csv.split("\n");
	splitJumpLine.splice(0, 1);
	/* convert result to json  */
	if (splitJumpLine.length <= 0) return [];
	const data = await splitJumpLine.map((a) => {
		return a.split(",");
	});
	if (data) {
		const transform = {
			file: data[0][0],
			lines: data.map((a) => {
				return {
					text: a[1] || null,
					number: a[2] || null,
					hex: a[3] || null,
				};
			}),
		};

		return transform;
	} else return [];
};
const getSecretFileData = async (fileName) => {
	try {
		return await axios
			.get(`secret/file/${fileName}`)
			.then(async (response) => {
				/* read and transform csv */
				return await csvToJson(response.data);
			})
			.catch((error) => {
				return null;
			});
	} catch (error) {
		throw error;
	}
};

const getFiles = async (req, res) => {
	try {
		/* search when send query filename */
		if (req.query.filename) {
			try {
				const data = await getSecretFileData(req.query.filename);
				if (!data) res.status(404).send(response);
				else res.status(200).send([data]);
			} catch (error) {
				res.status(500).send({ error: error.message });
			}
		} else {
			/* search all */
			const response = await getSecretFileList();
			if (response) {
				try {
					const files = response.files;
					const mapedFiles = await Promise.all(
						files.map(async (file) => {
							try {
								const data = await getSecretFileData(file);
								if (!data) return;
								return data;
							} catch (error) {}
						})
					);
					/* remove null data and array emptys */
					const result = mapedFiles
						.reduce((a, b) => a.concat(b))
						.filter((a) => {
							return a;
						});
					return res.status(200).send(result);
				} catch (error) {
					res.status(500).send({ error: error.message });
				}
			} else {
				res.status(400).send(response);
			}
		}
	} catch (error) {
		res.status(500).send({ error: error.message });
	}
};

const getFileList = async (req, res) => {
	try {
		const response = await getSecretFileList();
		if (response) res.status(200).send(response);
		else res.status(400).send(response);
	} catch (error) {
		res.status(500).send({ error: error });
	}
};

export {
	getFiles,
	getFileList,
	getSecretFileData,
	getSecretFileList,
	csvToJson,
};
