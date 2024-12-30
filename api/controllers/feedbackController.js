const asyncHandler = require('express-async-handler');
const { fileReader, addFeedback } = require('../helpers/utils');

exports.getFeedbacksById = asyncHandler( async(req, res) => {
    const { id } = req.params;
    const { feedbacks } = await fileReader("feedbacks");
    const filteredByIdFeedbacks = feedbacks.filter(item =>  item.applicationId === id) 
    return res.status(200).json({feedbacks: filteredByIdFeedbacks});
})

exports.postFeedbacks = asyncHandler( async(req, res) => {
    const { feedback } = req.body;
    const feedbacks = await fileReader('feedbacks');
    const allFeedbacks = feedbacks.feedbacks;

    if (allFeedbacks && allFeedbacks.length > 0) {
        const sameApps = allFeedbacks.filter(
          (item) => item.applicationId === feedback.applicationId
        );
        if (sameApps.length > 0) {
          const sameUser = sameApps.find(
            (item) => item.from === feedback.from
          );
          if (sameUser) {
            res.status(400);
            throw new Error("Feedback already exists for this position.");
          }
        }
      }
    await addFeedback("feedbacks", feedback);
    return res.status(200).json({
        error: false,
        message: "feedback saved successfully",
        feedback,
      });
})