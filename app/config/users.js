/** @type {Array.<User>} */
const users = [
  {
    uuid: "5bbe2111-a546-4429-bd2f-a8f03b873405",
    email: "sarah@mail.com",
    name: "Sarah Mobsby",
    password: "1234",
    image: require("../assets/user1.jpg"),
  },
  {
    uuid: "63c410f8-e0ed-4933-b85f-a36c0a8a7acc",
    email: "katie@mail.com",
    name: "Katie McCubbin",
    password: "1234",
    image: require("../assets/user2.jpg"),
  },
  {
    uuid: "1c6ef043-68db-4fb1-94ae-84ccd05a2c3b",
    email: "justin@mail.com",
    name: "Justin Parkhill",
    password: "1234",
  },
];

/**
 * @returns {Array.<User>} a shallow clone of the default users list
 */
export default function defaultUsers() {
  return [...users];
}
