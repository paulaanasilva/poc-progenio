import { Post, User } from "./models";
import { connectToDb } from "./utils"
import {unstable_noStore as noStore} from "next/cache"


/*
// TEMPORARY DATA
const users = [
  { id: 1, name: "John" },
  { id: 2, name: "Jane" },
];

const posts = [
  { id: 1, title: "Post 1", body: "Post 1......", userId: 1 },
  { id: 2, title: "Post 2", body: "Post 2......", userId: 1 },
  { id: 3, title: "Post 3", body: "Post 3......", userId: 2 },
  { id: 4, title: "Post 4", body: "Post 4......", userId: 2 },
];
*/

/*
export const getPosts = async () => {
  return posts;
}

export const getPost = async (id) => {
  const post = posts.find((post) => post.id === parseInt(id));
  return post;
}

export const getUsers = async (id) => {
  return users.find((user) => user.id === parseInt(id));
}
*/

export const getPosts = async () => {
  try {
    connectToDb();
    const posts = await Post.find();
    return posts;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting posts");
  }
}

export const getUsers = async () => {
  noStore();
  try {
    connectToDb();
    const users = await User.find();
    return users;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting posts");
  }
}

export const getPost = async (slug) => {
  try {
    connectToDb();
    const post = await Post.findOne({ slug });
    return post;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting posts");
  }
}

export const getUser = async (id) => {
  try {
    connectToDb();
    const user = await User.findById(id);
    return user;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting posts");
  }
}

