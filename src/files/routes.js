"use strict";
import { Router } from "express";
import { getFiles, getFileList } from "./controller.js";
const api = Router();

api.get("/files/data", getFiles);
api.get("/files/list", getFileList);

export default api;
