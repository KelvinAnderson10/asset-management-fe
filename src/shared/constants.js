export const LOGIN_ACTION_TYPE = {
  LOGIN: "USER_LOGIN",
  LOGOUT: "USER_LOGOUT",
};

export const EVENT = {
  CREATE_ASSET_CATEGORY: "inserted new asset category data",
  UPDATE_ASSET_CATEGORY: "updated asset category data",
  DELETE_ASSET_CATEGORY: "deleted asset category data",
  CREATE_LOCATION: "inserted new location data",
  UPDATE_LOCATION: "updated location data",
  DELETE_LOCATION: "deleted location data",
  CREATE_VENDOR: "inserted new vendor data",
  UPDATE_VENDOR: "updated vendor data",
  DELETE_VENDOR: "deleted vendor data",
  CREATE_ASSET: "inserted new asset data",
  UPDATE_ASSET: "updated asset data",
  DELETE_ASSET: "deleted asset data",
  IMPORT_DATA: "imported excel data",
  CREATE_USER: "inserted new user data",
  UPDATE_USER: "updated user data",
  DELETE_USER: "deleted asset data",
  UPDATE_SETTING: "updated variable setting"
};

export const STATUS = {
  CREATE_PO: "Pending",
  APPROVE_GA_IT: "Approved",
  ACCEPT: "Delivered",
  REJECT: "Denied",
};

export const NOTIF = {
  REQUEST: {
    TITLE: "Pending Request",
    BODY: "Incoming Request From",
  },
  APPROVED: {
    TITLE: "Request Approved",
    BODY: "Your Request Has Been Approved !",
  },
  REJECTED:{
    TITLE: "Request Denied",
    BODY: "Sorry, Your Request Has Been Denied !",
  }
};

export const PUSHNOTIF = {
  REQUEST: {
    TITLE: "👋 Hi, ",
    BODY: "📝 Incoming Request From ",
  },
  APPROVED: {
    TITLE: "Hi 👋",
    BODY: "Your Request Has Been Approved !",
  },
  REJECTED:{
    TITLE: "Hi 👋",
    BODY: "Sorry, Your Request Has Been Denied !",
  }
};
