import Feedback from "../models/Feedback.js";

export function saveFeedback(req, res) {
  const feedback = req.body;

  const newFeedback = new Feedback(feedback);
  newFeedback
    .save()
    .then((rsp) => {
      res.status(200).json({
        message: "Feedback Saved !",
      });
    })
    .catch((e) => {
      console.log(e);

      res.status(400).json({
        message: "Failed to save",
      });
    });
}

export function getAllFeedbacks(req, res) {
  Feedback.find()
    .then((rsp) => {
      res.status(200).json({
        allFeedBacks: rsp,
      });
    })
    .catch((e) => {
      res.status(400).json({
        e,
      });
    });
}

export function getApprovedFeedbacks(req, res) {
  Feedback.find({ status: "approved" })
    .then((rsp) => {
      res.status(200).json({
        ApprovedFeedbacks: rsp,
      });
    })
    .catch((e) => {
      res.status(400).json({
        e,
      });
    });
}

export function deleteFeedback(req, res) {
  const id = req.params.id;
  Feedback.findByIdAndDelete(id)
    .then((rsp) => {
      res.status(200).json({
        message: "Feedback Deleted",
      });
    })
    .catch((e) => {
      res.status(400).json({
        error: e,
      });
    });
}

export function updateStatus(req, res) {
  const id = req.params.id;

  Feedback.findById(id)
    .then((rsp) => {
      let newStatus = "";
      if (rsp.status == "pending") {
        newStatus = "approved";
      } else {
        newStatus = "pending";
      }

      rsp.status = newStatus;

      Feedback.updateOne({ _id: id }, rsp)
        .then((result) => {
          res.status(200).json({
            message: "updated",
          });
        })
        .catch((e) => {
          res.status(400).json({
            error: e,
          });
        });
    })
    .catch((e) => {});
}
