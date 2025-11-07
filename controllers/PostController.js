import PostModel from "../models/Post.js";

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().populate("user").exec();
    res.json(posts);
  } catch (err) {
    res.status(500).json({
      message: "Not available to find posts",
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;

    const doc = await PostModel.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        $inc: { viewsCount: 1 },
      },
      {
        returnDocument: "after",
      }
    );

    if (!doc) {
      return res.status(404).json({
        message: "The post was not found",
      });
    }

    res.json(doc);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Not available to find the post",
    });
  }
};

export const remove = async (req, res) => {
  try {
    const postId = req.params.id;
    const doc = await PostModel.deleteOne({
      _id: postId,
    });

    if (!doc) {
      return res.status(404).json({
        message: "The post was not found",
      });
    }

    res.json(doc);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Not available to find the post",
    });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,
      user: req.userId,
    });

    const post = await doc.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({
      message: "Not available to create a post",
    });
  }
};

export const update = async (req, res) => {
  try {
    const postId = req.params.id;
    const doc = await PostModel.updateOne(
      {
        _id: postId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        tags: req.body.tags,
        user: req.userId,
      }
    );
    res.json({
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: "Not available to update the post",
    });
  }
};
