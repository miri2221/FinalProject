import express,{application} from "express"
import * as users from '../Controller/users.js'

const router=express.Router();

router.get('/',users.getAllUser);
router.post('/',users.newUser);
router.put('/',users.updateUser);

export default router;