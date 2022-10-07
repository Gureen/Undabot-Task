"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 4040;
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(cors({ origin: '*' }));
app.get('/api/v1/survey', (request, response) => {
    fs.readFile('./server/store/SurveyFormData.json', 'utf-8', (error, data) => {
        if (error) {
            return response.status(500).send({
                errors: [
                    {
                        title: 'Internal Server Error',
                        detail: "Something went wrong. We're working on it!",
                    },
                ],
            });
        }
        const SurveyFormData = JSON.parse(data);
        return response.json({ data: SurveyFormData });
    });
});
app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
});
//# sourceMappingURL=server.js.map