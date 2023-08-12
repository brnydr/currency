export default class CurencyService {
  static async getRates(countryCode1, countryCode2, amount) {
    const response = await fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/pair/${countryCode1}/${countryCode2}/${amount}`);
    return response.json();
  }
}

