const express = require('express')
const { getApplications, getApplicationByQuery, getApplicationDetails, addApplicationForm, updateHireStatus } = require('../controllers/applicationController');
const { admin } = require('../middleware/authMiddleware');
const { upload } = require('../utils/storage');

const router = express.Router();

router.route('/applications/:id').get(getApplications);
router.route('/applications/tabs').get(admin(['Owner', 'Editor', 'Viewer']), getApplicationByQuery);
router.route('/applications/tabs/details/:id').get(admin(['Owner', 'Editor', 'Viewer']), getApplicationDetails)
router.route('/application-form').post(upload.array('file', 10), addApplicationForm);
router.route('/application-form/hire').put(admin(['Owner']),updateHireStatus)
module.exports = { applicationRoutes: router};