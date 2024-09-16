"use server";

import { revalidatePath } from "next/cache";
import { Post, User } from "./models";
import { connectToDb } from "./utils";
import { signIn, signOut } from "./auth";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const updateCurso = async (formData) => {
  const { id, nome, descricao } = Object.fromEntries(formData);

  try {
    const updatedCurso = await prisma.curso.update(
      {
        where: { id: id },
        data: {
          nome,
          descricao,
        },
      });

    console.log("updated curso in db");
    revalidatePath("/cursos");
    revalidatePath("/admin");
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

  export const addCurso = async (formData) => {
    const { nome, descricao } = Object.fromEntries(formData);

    try {
      const newCurso = await prisma.curso.create(
        {
          data: {
            nome,
            descricao
          }
        }
      )

      revalidatePatch("/cursos");
      revalidatePath("/admin");
    } catch (error) {
      console.log(error);
      return { error: "Error adding curso" };
    }
  }

  export const deleteCurso = async (formData) => {
    const { id } = Object.fromEntries(formData);

    try {
      await prisma.curso.delete({
        where: { id: id },
      });
    } catch (err) {
      console.log(err);
      return { error: "Something went wrong!" };
    }
  };

  export const addPost = async (prevState, formData) => {
    const { title, desc, slug, userId } = Object.fromEntries(formData);

    try {
      connectToDb();
      const newPost = new Post({
        title,
        desc,
        slug,
        userId,
      });

      await newPost.save();
      console.log("saved to db");
      revalidatePath("/blog");
      revalidatePath("/admin");
    } catch (err) {
      console.log(err);
      return { error: "Something went wrong!" };
    }
  };

  export const deletePost = async (formData) => {
    const { id } = Object.fromEntries(formData);

    try {
      connectToDb();

      await Post.findByIdAndDelete(id);
      console.log("deleted from db");
      revalidatePath("/blog");
      revalidatePath("/admin");
    } catch (err) {
      console.log(err);
      return { error: "Something went wrong!" };
    }
  };

  export const addUser = async (prevState, formData) => {
    const { username, email, password, img } = Object.fromEntries(formData);

    try {
      connectToDb();
      const newUser = new User({
        username,
        email,
        password,
        img,
      });

      await newUser.save();
      console.log("saved to db");
      revalidatePath("/admin");
    } catch (err) {
      console.log(err);
      return { error: "Something went wrong!" };
    }
  };

  export const deleteUser = async (formData) => {
    const { id } = Object.fromEntries(formData);

    try {
      connectToDb();

      await Post.deleteMany({ userId: id });
      await User.findByIdAndDelete(id);
      console.log("deleted from db");
      revalidatePath("/admin");
    } catch (err) {
      console.log(err);
      return { error: "Something went wrong!" };
    }
  };

  export const handleGithubLogin = async () => {
    "use server";
    await signIn("github");
  };

  export const handleLogout = async () => {
    "use server";
    await signOut();
  };

  export const register = async (previousState, formData) => {
    const { username, email, password, img, passwordRepeat } =
      Object.fromEntries(formData);

    if (password !== passwordRepeat) {
      return { error: "Passwords do not match" };
    }

    try {
      connectToDb();

      const user = await User.findOne({ username });

      if (user) {
        return { error: "Username already exists" };
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        img,
      });

      await newUser.save();
      console.log("saved to db");

      return { success: true };
    } catch (err) {
      console.log(err);
      return { error: "Something went wrong!" };
    }
  };

  export const login = async (prevState, formData) => {
    const { username, password } = Object.fromEntries(formData);

    try {
      await signIn("credentials", { username, password });
    } catch (err) {
      console.log(err);

      if (err.message.includes("CredentialsSignin")) {
        return { error: "Invalid username or password" };
      }
      throw err;
    }
  };