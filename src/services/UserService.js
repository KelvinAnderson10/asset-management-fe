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
            url: '/register', data: newUser
            
        })
    } catch (e) {
        throw e;
    }
}

  return { getUserByEmail, createUser };
};
