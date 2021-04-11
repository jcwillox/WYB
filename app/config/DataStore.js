import { v4 as uuid4 } from "uuid";
import { Colors } from "react-native-paper";
import defaultPlaces from "./places";
import defaultUsers from "./users";
import { callFuture } from "../utils/utils";

/* USERS */

/**
 * User type definition
 * @typedef User
 * @type {Object}
 * @property {string} uuid
 * @property {string} email
 * @property {string} name
 * @property {string} password
 * @property {string} [image]
 */

/** @type {Array.<User>} */
const users = defaultUsers();

/** @type {User | null} */
let currentUser;

/**
 * @callback userDataListener
 * @param user {User}
 */

/** @type {Array.<userDataListener>} */
let userDataListeners = [];
function updateUserListeners() {
  userDataListeners.forEach((callback) => callback(currentUser));
}

/**
 * @callback authListener
 * @param status {boolean}
 */

/** @type {Array.<authListener>} */
let authListeners = [];
function updateAuthListeners(status) {
  authListeners.forEach((callback) => callback(status));
}

const usersStore = {
  /** @return User | null */
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
    for (const key in details) {
      if (details[key]) {
        currentUser[key] = details[key];
      }
    }
    callFuture(updateUserListeners);
  },

  login({ email, password }) {
    let user = this.fromEmail(email);
    if (user && user.password === password) {
      currentUser = user;
      callFuture(updateAuthListeners, true);
      return true;
    }
    return false;
  },
  logout() {
    currentUser = null;
    callFuture(updateAuthListeners, false);
  },
  /** @param callback {userDataListener} */
  subscribeUserData(callback) {
    userDataListeners.push(callback);
    console.debug("user listeners (sub)", userDataListeners);
    return () => {
      userDataListeners = userDataListeners.filter((item) => item !== callback);
      console.debug("user listeners (unsub)", userDataListeners);
    };
  },
  /** @param callback {authListener} */
  subscribeAuthStatus(callback) {
    authListeners.push(callback);
    console.debug("auth listeners (sub)", authListeners);
    return () => {
      authListeners = authListeners.filter((item) => item !== callback);
      console.debug("auth listeners (unsub)", authListeners);
    };
  },
};

/* PLACES */

/**
 * Place type definition
 * @typedef Place
 * @type {Object}
 * @property {string} uuid
 * @property {string} userUUID
 * @property {string} name
 * @property {string} description
 * @property {Date} created
 * @property {any} [image]
 * @property {string} [image.uri]
 * @property {string} [category]
 * @property {number} [rating]
 */

/** @type {Array.<Place>} */
let places = defaultPlaces();

/**
 * @callback placesListListener
 * @param places {Array.<Place>}
 */

/** @type {Array.<placesListListener>} */
let placesListListeners = [];
function updatePlacesListeners() {
  let places = placesStore.all();
  placesListListeners.forEach((callback) => callback(places));
}

const placesStore = {
  /** @param place {Place} */
  add({ uuid, name, image, category, rating, description }) {
    let details = { name, image, category, rating, description };
    // if a `uuid` was specified update the
    // record instead of adding a new one
    if (uuid) {
      let place = placesStore.fromUUID(uuid);
      for (const key in details) {
        if (details[key]) {
          place[key] = details[key];
        }
      }
    } else {
      places.push({
        uuid: uuid4(),
        userUUID: currentUser.uuid,
        ...details,
      });
    }
    callFuture(updatePlacesListeners);
  },
  /** @param place {Place} */
  remove(place) {
    places = places.filter((item) => item !== place);
    callFuture(updatePlacesListeners);
  },
  all() {
    if (!currentUser) return [];
    return places.filter((place) => place.userUUID === currentUser.uuid);
  },
  reset() {
    places = defaultPlaces();
    callFuture(updatePlacesListeners);
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
  fromUUID(uuid) {
    return places.find((place) => place.uuid === uuid);
  },
  /** @param callback {placesListListener} */
  subscribePlacesList(callback) {
    placesListListeners.push(callback);
    console.debug("places listeners (sub)", placesListListeners);
    return () => {
      placesListListeners = placesListListeners.filter(
        (item) => item !== callback
      );
      console.debug("places listeners (unsub)", placesListListeners);
    };
  },
};

/* CATEGORIES */

/**
 * Category type definition
 * @typedef Category
 * @type {Object}
 * @property {string} name
 * @property {string} [icon]
 * @property {string} [color]
 */

/** @type {Array.<Category>} */
let categories = [
  { name: "Shopping", color: Colors.amber800 },
  { name: "Restaurants", color: Colors.green600 },
  { name: "Hotels", color: Colors.cyan600 },
];

const categoriesStore = {
  all() {
    return categories;
  },
  byName(name) {
    return categories.find((category) => category.name === name);
  },
};

export default {
  categories: categoriesStore,
  places: placesStore,
  users: usersStore,
};
