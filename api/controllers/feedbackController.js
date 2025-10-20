const asyncHandler = require('express-async-handler');
const Feedback = require('../model/feedbackModel');

exports.getFeedbacksById = asyncHandler( async(req, res) => {
    const { id } = req.params;
    const feedbacks = await Feedback.find({ applicationId: id });
    return res.status(200).json({feedbacks});
})

exports.postFeedbacks = asyncHandler( async(req, res) => {
    const { id: applicationId } = req.params;
    const { feedback } = req.body;
    const allFeedbacks = await Feedback.find({ applicationId });

    if (allFeedbacks.length > 0) {
        const sameUser = allFeedbacks.find(item => item.from === feedback.from);
        if (sameUser) {
            return res.status(400).json({ error: true, message: "Feedback already exists for this position." });
        }
      }

    const newFeedback = await Feedback.create(feedback);
    return res.status(200).json({
        error: false,
        message: "feedback saved successfully",
        feedback: newFeedback,
      });
})