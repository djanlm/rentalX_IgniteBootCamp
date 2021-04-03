//const express = require("express"); sem typescript nós importavamos usando essa sintaxe
import express from "express";
import swaggerUi from "swagger-ui-express"; //swagger é usado pra fazer documentação

import { router } from "./routes";
import swaggerFile from './swagger.json';

import "./database";

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.listen(3333, () => console.log("Server is running!"));

