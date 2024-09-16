import { PrismaClient } from "@prisma/client";
import { Post, User } from "./models";
import { connectToDb } from "./utils"
import {unstable_noStore as noStore} from "next/cache"


const prisma = new PrismaClient();

//Função para a tabela curso
export const getCursos = async () => {
  try {
    const cursos = await prisma.curso.findMany();
    return cursos;
  } catch (error) {
    console.log(error);
    throw new Error("Error getting cursos");
  }
}

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

