export default class UserService {
  static async getData(url, parameters) {
    const response = await fetch(url + parameters);
    const result = await response.json();
    return result.users;
  }
}