const express = require('express')
const { getFeedbacksById, postFeedbacks } = require("../controllers/feedbackController");
const { admin } = require('../middleware/authMiddleware');

const router = express.Router();


router.route('/:id').get(admin(['Owner', 'Editor', 'Viewer']), getFeedbacksById);
router.route('/:id').post(admin(['Owner', 'Editor']), postFeedbacks);

module.exports = { feedbackRoutes: router};