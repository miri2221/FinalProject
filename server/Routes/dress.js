import express from 'express'
// import express,{application} from "express"
import * as dress from '../Controller/dress.js'

const router=express.Router();

router.get('/', dress.getAllDress);
router.get('/getByColor', dress.getByColor);
router.get('/getBySize', dress.getBySize);
router.get('/getByPrice',dress.getByPrice);
router.post('/', dress.addNewDress);

export default router;