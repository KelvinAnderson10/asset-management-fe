import React from "react";

export const rentService = ({ doGet, doPost, doPut, doDelete }) => {
  const createRent = async (newRent) => {
    try {
      return await doPost({
        url: "api/rent",
        data: newRent,
      });
    } catch (error) {
      throw error;
    }
  };

  const deleteRent = async (id) => {
    try {
      return await doDelete({
        url: `api/rent/${id}`,
      });
    } catch (error) {
      throw error;
    }
  };

  const getRentByUserName = async (name) => {
    try {
      return await doGet({
        url: `api/rent/name/${name}`,
      });
    } catch (error) {
      throw error;
    }
  };

  const getRentById = async (id) => {
    try {
      return await doGet({
        url: `api/rent/id/${id}`,
      });
    } catch (error) {
      throw error;
    }
  };

    const getRentByRequester = async (name='',page=1) => {
      try {
        return await doGet({
          url: `api/rent/requester/search?name=${name}&page=${page}`,
        });
      } catch (error) {
        throw error;
      }
    };

  // const getRentDetailById = async (id) => {
  //   try {
  //     return await doGet({ url: `api/rent/attachment/${id}` });
  //   } catch (e) {
  //     throw e;
  //   }
  // };

  const getRentListByApproval = async (name='',page=1) => {
    try {
      return await doGet({ url: `api/rent/approver/incoming?name=${name}&page=${page}` });
    } catch (error) {
      throw error;
    }
  };

  const getImgUrl = async (id, category) => {
    try {
      return await doGet({ url: `api/rent/attachment?rentId=${id}&category=${category}` });
    } catch (error) {
      throw error;
    }
  }

  const getRentListHistory = async (name='',page=1) => {
    try {
      return await doGet({ url: `api/rent/approver/history?name=${name}&page=${page}` });
    } catch (error) {
      
    }
  }

  const approvedByLevel1 = async (id) => {
    try {
      return await doPut({ url: `api/rent/level1/${id}` });
    } catch (error) {
      throw error;
    }
  };

  const approvedByLevel2 = async (id) => {
    try {
      return await doPut({ url: `api/rent/level2/${id}` });
    } catch (error) {
      throw error;
    }
  };

  const approvedByLevel3 = async (id) => {
    try {
      return await doPut({ url: `api/rent/level3/${id}` });
    } catch (error) {
      throw error;
    }
  };

  return {
    createRent,
    deleteRent,
    getRentById,
    getRentByUserName,
    approvedByLevel1,
    approvedByLevel2,
    approvedByLevel3,
    getRentListByApproval,
    getRentListHistory,
    getImgUrl,
    getRentByRequester
  };
};
