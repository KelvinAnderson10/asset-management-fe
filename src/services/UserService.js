import React from "react";

export const userService = ({ doGet,doPost,doDelete,doPut }) => {
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
    return await doGet({ url: `/api/user/name/${name}` });
  } catch (e) {
    throw e;
  }
};
const getUserByNameLike = async (name) => {
  try {
    return await doGet({ url: `/api/user/name?name=${name}` });
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

const updateUser = async (name,newUser) => {
  try {
      return await doPut({
          url: `/api/user/${name}`, data: newUser
          
      })
  } catch (e) {
      throw e;
  }
}

const findGMByCluster = async (cluster) => {
  try {
    return await doGet({ url: `/api/user/gm/${cluster}` });
  } catch (e) {
    throw e;
  }
};

const findSpvByDepartment = async (department) => {
  try {
    return await doGet({ url: `/api/user/spv/${department}` });
  } catch (e) {
    throw e;
  }
};

const findVPTrad = async () => {
  try {
    return await doGet({ url: `/api/user/VPTrad` });
  } catch (e) {
    throw e;
  }
};


const findITApprover = async () => {
  try {
    return await doGet({ url: `/api/user/IT` });
  } catch (e) {
    throw e;
  }
};

const findGAApprover = async () => {
  try {
    return await doGet({ url: `/api/user/GA` });
  } catch (e) {
    throw e;
  }
};

const deleteUser = async (name) => {
  try {
      return await doDelete({url: `/api/user/${name}`
   })
  } catch (e) {
      throw e;
  }
}

const findUserByLocationId = async (locationId) => {
  try {
    return await doGet({ url: `/api/user/location/${locationId}` });
  } catch (e) {
    throw e;
  }
}

  return {getUserByNameLike, updateUser, deleteUser,getUserByEmail, createUser,getUserByName, getAllUser, findGAApprover,findGMByCluster,findITApprover,findSpvByDepartment,findVPTrad, findUserByLocationId };
};
