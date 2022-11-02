export const apiClientFactory = (client) => {
  const doPost = async ({ url = "", data = null }) => {
    try {
      const response = await client.post(url, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const doGet = async ({ url = "" , params = {}}) => {
    try {
      const response = await client.get(url, {params : params});
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const doPut = async ({ url = "", data = null }) => {
    console.log(data);
    try {
      const response = await client.put(url, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const doDelete = async ({ url = "" }) => {
    try {
      const response = await client.delete(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  };



  return { doPost, doGet, doPut, doDelete};
};
