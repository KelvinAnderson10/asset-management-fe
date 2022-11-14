import React from "react";

export const notificationService = ({ doGet, doPost, doPut }) => {
  const getNotif = async (name) => {
    try {
      return await doGet({ url: `/api/notification/${name}` });
    } catch (e) {
      throw e;
    }
  };

  const readNotif = async (id) => {
    try {
      return await doPut({url : `/api/notification/read/${id}`});
    } catch (e) {
      throw e
    }
  }

  const createNotif = async (newNotif) => {
    try {
      return await doPost({
        url: "/api/notification",
        data: newNotif,
      });
    } catch (e) {
      throw e;
    }
  };

  const createPushNotif = async (newNotif) => {
    try {
      return await doPost({
        url: "/api/notification/push",
        data: newNotif,
      });
    } catch (e) {
      throw e;
    }
  };

  const countNotificationByUser = async (name) => {
    try {
      return await doGet({ url: `/api/notification/total/${name}` });
    } catch (e) {
      throw e;
    }
  };

  return { createPushNotif, getNotif, createNotif, countNotificationByUser, readNotif };
};
