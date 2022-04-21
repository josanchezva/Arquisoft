import express from 'express';
import controller from '../controllers/list';

const router = express.Router();

router.post('/create/list', controller.createList);
router.get('/get/list', controller.getListbyId);
router.get('/get/user/lists', controller.getAllUserLists);

export = router;
