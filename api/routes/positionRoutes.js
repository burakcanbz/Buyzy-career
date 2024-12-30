const express = require('express')
const { openPositions, openPositionDetail, updatePosition, deletePosition, addPosition, openPositionPaginated } = require('../controllers/positionController');
const { upload } = require('../utils/storage');
const { admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').get(openPositions);
router.route('/positions').get(admin(['Owner']), openPositionPaginated);
router.route('/:id').get(openPositionDetail).delete(admin(['Owner']), deletePosition);
router.route('/add-position').post(admin(['Owner']), upload.array('file', 10), addPosition)
router.route('/update-position/:id').put(admin(['Owner']), upload.array('file', 10), updatePosition)

module.exports = { positionRoutes: router};