const expressAsyncHandler = require("express-async-handler");
const Comment = require("../../models/comment/Comment") 
const validateMongodbId = require("../../utils/validateMongodbID");


const createCommentCtrl = expressAsyncHandler(async (req, res) => {  
   const user = req.user
   const {postId,description} = req.body
  try {
      const comment = await Comment.create({
        post: postId,
        user: user,
        description: description
      });
      res.json(comment)
    } catch (error) {
      res.json(error)
    }
  });

const fetchAllCommentsCtrl = expressAsyncHandler(async (req, res) => {
    try {
      const comments = await Comment.find({}).sort("-created");
      res.json(comments);
    } catch (error) {
      res.json(error);
    }
  });

const fetchCommentCtrl = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    try {
      const comment = await Comment.findById(id);
      res.json(comment);
    } catch (error) {
      res.json(error);
    }
  });

const updateCommentCtrl = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    try {
      const update = await Comment.findByIdAndUpdate(
        id,
        {
          user: req?.user,
          description: req?.body?.description,
        },
        {
          new: true,
          runValidators: true,
        }
      );
      res.json(update);
    } catch (error) {
      res.json(error);
    }
  });

const deleteCommentCtrl = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    try {
      const comment = await Comment.findByIdAndDelete(id);
      res.json(comment);
    } catch (error) {
      res.json(error);
    }
  });


module.exports = {
    createCommentCtrl,
    deleteCommentCtrl,
    updateCommentCtrl,
    fetchAllCommentsCtrl,
    fetchCommentCtrl
}