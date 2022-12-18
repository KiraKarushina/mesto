export default class UserInfo {
  constructor(
    { name, about, _id, avatar },
    profileNameSelector,
    profileJobSelector,
    profileAvatarSelector
  ) {
    this._name = name;
    this._job = about;
    this._id = _id;
    this._avatar = avatar;
    this._profileInfoName = document.querySelector(profileNameSelector);
    this._profileInfoJob = document.querySelector(profileJobSelector);
    this._avatarButton = document.querySelector(profileAvatarSelector);
  }

  getUserInfo() {
    return {
      name: this._name,
      job: this._job,
      avatar: this._avatar,
    };
  }

  setUserInfo(name, job) {
    this._name = name;
    this._job = job;
    this.fillProfileOnPage();
  }

  getID() {
    return this._id;
  }

  fillProfileOnPage() {
    this._profileInfoName.textContent = this._name;
    this._profileInfoJob.textContent = this._job;
  }

  updateAvatar(avatar) {
    this._avatarButton.src = avatar;
  }
}
