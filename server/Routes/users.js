import express,{application} from "express"
import * as users from '../Controller/users.js'

const router=express.Router();

router.get('/',users.getAllUser);
router.get('/getByEmail', users.getUserByEmail);
router.get('/getByName', users.getUsersByName);
//להרצה--http://localhost:4000/users/getByEmail?email=5705654sh@gmail.com
router.post('/',users.addNewUser);
//router.put('/',users.updateUser);

export default router;