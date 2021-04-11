/** @type {Array.<User>} */
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

/**
 * @returns {Array.<User>} a shallow clone of the default users list
 */
export default function defaultUsers() {
  return [...users];
}
