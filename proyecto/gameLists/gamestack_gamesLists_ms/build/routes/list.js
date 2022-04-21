"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var list_1 = __importDefault(require("../controllers/list"));
var router = express_1.default.Router();
router.post('/create/list', list_1.default.createList);
module.exports = router;
