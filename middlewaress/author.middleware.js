const BaseError = require("../errors/base.error");
const postModel = require("../models/post.model");

module.exports = async function (req, res, next) {
  try {
    const post = await postModel.findById(req.params.id);
    const authorId = req.user._doc._id;

    if (post.author !== authorId) {
      return next(
        BaseError.BadRequest("Faqatv user bu postni ozgartira oladi")
      );
    }
    next();
  } catch (error) {
    return next(
        BaseError.BadRequest("Faqatv user bu postni ozgartira oladi")
      );
  }
};
