const postModel = require("../models/post.model");
const fileService = require("./file.service");

class PostService {
  async create(post, picture, author) {
    const fileName = fileService.save(picture);
    const newPost = await postModel.create({...post, picture: fileName, author});
    return newPost;
  }
  async getAll() {
    const onePosts = await postModel.find();
    return onePosts;
  }
  async getOne(id) {
    const allPosts = await postModel.findById(id);
    return allPosts;
  }
  async delete(id) {
    const post = await postModel.findByIdAndDelete(id);
    return post;
  }
  async edit(post, id) {
    if (!id) {
      throw BaseError.BadRequest("Id not found");
    }

    const updatedData = await postModel.findByIdAndUpdate(id, post, {
      new: true,
    });
    return updatedData;
  }
}
module.exports = new PostService();
