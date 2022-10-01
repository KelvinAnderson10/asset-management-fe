export const dashboardService = ({ doGet }) => {
  const getAllCountAsset = async () => {
    try {
      return await doGet({
        url: "/api/asset/total/count",
      });
    } catch (e) {
      throw e;
    }
  };

  const getTotalSpendingCluster = async () => {
    try {
      return await doGet({
        url: "/api/asset/dashboard/spending/cluster",
      });
    } catch (e) {
      throw e;
    }
  };

  const getTotalUnitAssetCluster = async () => {
    try {
      return await doGet({
        url: "/api/asset/dashboard/unit/cluster",
      });
    } catch (e) {
      throw e;
    }
  };
  const getTotalAssetBySubProduct = async () => {
    try {
      return await doGet({
        url: "/api/asset/dashboard/subproduct",
      });
    } catch (e) {
      throw e;
    }
  };
 

  const getTotalPO = async () => {
    try {
      return await doGet({
        url: "api/po/dashboard/totalpo",
      });
    } catch (e) {
      throw e;
    }
  };
  const getTotalPOByStatus = async () => {
    try {
      return await doGet({
        url: "api/po/dashboard/total/statuspo",
      });
    } catch (e) {
      throw e;
    }
  };
  const getAssetAlmostDeprecated = async (page) => {
    try {
      return await doGet({
        url: `api/asset/almostdeprecated/${page}`,
      });
    } catch (e) {
      throw e;
    }
  };

  const getSumAssetValue = async () => {
    try {
      return await doGet({
        url: "api/asset/dashboard/assetvalue",
      });
    } catch (e) {
      throw e;
    }
  };

  const getAllDeprecated = async () => {
    try {
      return await doGet({
        url: "api/asset/deprecated",
      });
    } catch (e) {
      throw e;
    }
  };

  const getAssetBrokenBeforeLifetime = async () => {
    try {
      return await doGet({
        url: "api/asset/dashboard/broken",
      });
    } catch (e) {
      throw e;
    }
  };


  return {getAssetBrokenBeforeLifetime, getAllDeprecated, getTotalUnitAssetCluster, getTotalPOByStatus, getTotalAssetBySubProduct, getAllCountAsset, getTotalSpendingCluster, getTotalPO,getAssetAlmostDeprecated,getSumAssetValue };
};
