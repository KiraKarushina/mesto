export default class UserInfo {
  constructor({ name, job, id }) {
    this._name = name;
    this._job = job;
    this._id = id;
  }

  getUserInfo() {
    return {
      name: this._name,
      job: this._job,
    };
  }

  setUserInfo(name, job) {
    this._name = name;
    this._job = job;
  }

  getID() {
    return this._id;
  }
}
