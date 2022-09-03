import React from "react";

export const userService = ({ doGet,doPost }) => {
  const getUserByEmail = async (email) => {
    try {
      return await doGet({ url: `/login/${email}` });
    } catch (e) {
      throw e;
    }
  };

  const createUser = async (newUser) => {
    try {
        return await doPost({
            url: '/api/register', data: newUser
            
        })
    } catch (e) {
        throw e;
    }
}
const getUserByName = async (name) => {
  try {
    return await doGet({ url: `/api/user/${name}` });
  } catch (e) {
    throw e;
  }
};

const getAllUser = async () => {
  try {
    return await doGet({ url: `/api/user` });
  } catch (e) {
    throw e;
  }
};

  return { getUserByEmail, createUser,getUserByName, getAllUser };
};
