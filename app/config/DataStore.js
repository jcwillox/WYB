import { v4 as uuid4 } from "uuid";

const users = [
  {
    uuid: "5bbe2111-a546-4429-bd2f-a8f03b873405",
    email: "1@b.c",
    name: "User 1",
    password: "1234",
    image: require("../assets/user1.png"),
  },
  {
    uuid: "63c410f8-e0ed-4933-b85f-a36c0a8a7acc",
    email: "2@b.c",
    name: "User 2",
    password: "1234",
    image: require("../assets/user2.png"),
  },
  {
    uuid: "1c6ef043-68db-4fb1-94ae-84ccd05a2c3b",
    email: "3@b.c",
    name: "User 3",
    password: "1234",
  },
];

/** @type {Array.<Place>} */
let places = [
  {
    uuid: "3aa6a532-741d-4111-b91d-aaf49c93b3fa",
    userUUID: "5bbe2111-a546-4429-bd2f-a8f03b873405",
    name: "Bunnings",
    category: "Shopping",
    image: {
      uri:
        "https://s3-ap-southeast-2.amazonaws.com/tud-media/assets/images/5d399e73-67d4-44be-bb43-972e23f6d4b8/5d399e73-67d4-44be-bb43-972e23f6d4b8-1280.webp",
    },
    rating: 5,
  },
  {
    uuid: "4903dc99-14ef-4e12-b211-53b611d4b696",
    userUUID: "5bbe2111-a546-4429-bd2f-a8f03b873405",
    name: "Bunnings",
    category: "Shopping",
    image: {
      uri:
        "https://s3-ap-southeast-2.amazonaws.com/tud-media/assets/images/5d399e73-67d4-44be-bb43-972e23f6d4b8/5d399e73-67d4-44be-bb43-972e23f6d4b8-1280.webp",
    },
    rating: 2,
  },
];

/**
 * @typedef Category
 * @type {Object}
 * @property {string} name
 * @property {string} [icon]
 * @property {string} [color]
 * */

/** @type {Array.<Category>} */
let categories = [
  {
    name: "Shopping",
  },
  {
    name: "Restaurants",
  },
  {
    name: "Hotels",
  },
];

// restaurants
// hotels
//

// /** @param fields {{image, password: string, name: string, uuid: string, email: string}} */

class DataClass {
  /** @param fields {Map<string, any>} */
  static parse(fields) {
    return Object.assign(new this(), fields);
  }
}

class User extends DataClass {
  uuid;
  email;
  name;
  password;
  image;
}

class Place extends DataClass {
  uuid;
  userUUID;
  name;
  image;
  category;
  rating;
}

/**
 * @callback authListener
 * @param status {boolean}
 * */

/**
 * @callback userDataListener
 * @param user {User}
 * */

/** @type {User} */
let currentUser;
/** @type {Array.<authListener>} */
let authListeners = [];
/** @type {Array.<userDataListener>} */
let userDataListeners = [];

export default {
  places: {
    /** @param place {Place} */
    add(place) {
      places.push(place);
    },
    /** @param place {Place} */
    remove(place) {
      places = places.filter((item) => item !== place);
    },
    all() {
      return places.filter((place) => place.userUUID === currentUser.uuid);
    },
    /** @param category {string | Set} */
    byCategory(category) {
      if (typeof category === "string") {
        category = new Set([category]);
      }
      return places.filter(
        (place) =>
          place.userUUID === currentUser.uuid && category.has(place.category)
      );
    },
  },
  users: {
    /**
     * @return User
     */
    current() {
      return currentUser;
    },
    fromUUID(uuid) {
      return users.find((user) => user.uuid === uuid);
    },
    fromEmail(email) {
      return users.find((user) => user.email === email);
    },
    add({ email, name, password }) {
      users.push({ uuid: uuid4(), email, name, password });
    },
    /** Update user details and fire callbacks */
    edit({ email, name, password, image }) {
      let details = { email, name, password, image };
      console.log(details);
      for (const key in details) {
        if (details[key]) currentUser[key] = details[key];
      }
      setTimeout(() => {
        userDataListeners.forEach((callback) => callback(currentUser));
      }, 0);
      console.log("Current", currentUser);
      console.log("Users", users);
    },
    /** @param callback {userDataListener} */
    subscribeUserData(callback) {
      userDataListeners.push(callback);
      console.log("user listeners (sub)", userDataListeners);
      return () => {
        userDataListeners = userDataListeners.filter(
          (item) => item !== callback
        );
        console.log("user listeners (unsub)", userDataListeners);
      };
    },
    login({ email, password }) {
      let user = this.fromEmail(email);
      if (user && user.password === password) {
        currentUser = user;
        // run this in the future to allow the calling function to complete it's cleanup
        setTimeout(() => {
          authListeners.forEach((callback) => callback(true));
        }, 0);
        return true;
      }
      return false;
    },
    logout() {
      currentUser = null;
      authListeners.forEach((callback) => callback(false));
    },
    subscribeAuthStatus(callback) {
      authListeners.push(callback);
      console.log("auth listeners (sub)", authListeners);
      return () => {
        authListeners = authListeners.filter((item) => item !== callback);
        console.log("auth listeners (unsub)", authListeners);
      };
    },
  },
};
