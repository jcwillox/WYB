/** @type {Array.<Place>} */
const places = [
  {
    uuid: "3aa6a532-741d-4111-b91d-aaf49c93b3fa",
    userUUID: "5bbe2111-a546-4429-bd2f-a8f03b873405",
    name: "Lake",
    description: "This place had the best sunsets!",
    category: "Shopping",
    image: require("../assets/image1.jpg"),
    created: new Date("2021-03-01T13:06:00+11:00"),
    rating: 5,
  },
  {
    uuid: "4903dc99-14ef-4e12-b211-53b611d4b696",
    userUUID: "5bbe2111-a546-4429-bd2f-a8f03b873405",
    name: "Mountains",
    category: "Hotels",
    description: "Beautiful mountain-view hotel that we found while exploring",
    image: require("../assets/image2.jpg"),
    created: new Date("2020-07-06T09:00:00+11:00"),
    rating: 2,
  },
];

/**
 * @returns {Array.<Place>} a shallow clone of the default places list
 */
export default function defaultPlaces() {
  return [...places];
}
