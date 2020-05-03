import express from "express";
import Additional from '../../controllers/additional';

const route = express.Router();

route.post('/search',Additional.search)

export default route;