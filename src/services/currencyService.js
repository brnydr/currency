export default class CurencyService {
  static async getCurrency(countryCode) {
    try {
      const response = await fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/${countryCode}`);
      if (!response.ok) {
        let errorMessage = `${response.status} (${response.statusText})`;
        throw Error(errorMessage);
      }
      return response.json();
    }
    catch(error){
      return error;
    };
  };
}
