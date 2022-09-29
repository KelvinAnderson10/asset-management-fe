import React from "react";

export const notificationService = ({
  doGet,
  doPost,
  firestoreNotification,
  expoNotification,
}) => {
  const readNotif = async (name) => {
    try {
      return await doGet({ url: `/api/notification/${name}` });
    } catch (e) {
      throw e;
    }
  };

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
      return await expoNotification({
        url: "send",
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
  const storeNotificationFirestore = async (data = {}) => {
    try {
      return await firestoreNotification({ url: "notifications", data: data });
    } catch (e) {
      throw e;
    }
  };


  return { createPushNotif, readNotif, createNotif, countNotificationByUser,storeNotificationFirestore };
};
