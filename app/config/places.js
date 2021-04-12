/** @type {Array.<Place>} */
const places = [
  {
    uuid: "bd6d226e-23cd-469a-9dbb-059227067bf4",
    userUUID: "63c410f8-e0ed-4933-b85f-a36c0a8a7acc",
    name: "Mike's Pizza",
    category: "Restaurants",
    description: "Mike really knows how to cook a pizza, love it!",
    image: require("../assets/mikes-pizza.jpg"),
    created: new Date("2020-09-08T12:57:00+11:00"),
    rating: 5,
  },
  {
    uuid: "4903dc99-14ef-4e12-b211-53b611d4b696",
    userUUID: "63c410f8-e0ed-4933-b85f-a36c0a8a7acc",
    name: "Mountains",
    category: "Attractions",
    description:
      "The spectacular night sky we captured while visiting Moena in Italy!",
    image: require("../assets/mountain.jpg"),
    created: new Date("2020-07-06T09:00:00+11:00"),
    rating: 5,
  },
  {
    uuid: "3aa6a532-741d-4111-b91d-aaf49c93b3fa",
    userUUID: "63c410f8-e0ed-4933-b85f-a36c0a8a7acc",
    name: "Sunset ☀",
    description: "This place had the best sunsets!",
    category: "Attractions",
    image: require("../assets/sunset.jpg"),
    created: new Date("2021-03-02T13:12:00+11:00"),
    rating: 4,
  },
  {
    uuid: "bff7f1df-a1ba-40f6-82cb-8d2b285c43f5",
    userUUID: "5bbe2111-a546-4429-bd2f-a8f03b873405",
    name: "Dave's Bar 🍹",
    category: "Restaurants",
    description: "A fantastic bar we found in Toronto, Canada.",
    image: require("../assets/daves-bar.jpg"),
    created: new Date("2020-08-06T09:00:00+11:00"),
    rating: 4,
  },
  {
    uuid: "3aa6a532-741d-4111-b91d-aaf49c93b3fa",
    userUUID: "5bbe2111-a546-4429-bd2f-a8f03b873405",
    name: "Sunset ☀",
    description: "A beautiful sunset over at Anaheim in the US.",
    category: "Attractions",
    image: require("../assets/sunset.jpg"),
    created: new Date("2021-03-01T13:06:00+11:00"),
    rating: 4,
  },
  {
    uuid: "4903dc99-14ef-4e12-b211-53b611d4b696",
    userUUID: "5bbe2111-a546-4429-bd2f-a8f03b873405",
    name: "Mountains",
    category: "Attractions",
    description:
      "The spectacular night sky we captured while visiting Moena in Italy!",
    image: require("../assets/mountain.jpg"),
    created: new Date("2020-07-06T09:00:00+11:00"),
    rating: 5,
  },
  {
    uuid: "bd6d226e-23cd-469a-9dbb-059227067bf4",
    userUUID: "5bbe2111-a546-4429-bd2f-a8f03b873405",
    name: "Mike's Pizza",
    category: "Restaurants",
    description: "Some of the best pizza I've ever had.",
    image: require("../assets/mikes-pizza.jpg"),
    created: new Date("2020-08-08T13:00:00+11:00"),
    rating: 4,
  },
  {
    uuid: "4aa6a532-741d-4111-b91d-aaf49c93b3fa",
    userUUID: "5bbe2111-a546-4429-bd2f-a8f03b873405",
    name: "Orange Cafe",
    description: "Fanciest looking coffee shop I've ever been too",
    category: "Attractions",
    image: require("../assets/coffee-shop.jpg"),
    created: new Date("2020-08-02T15:56:00+11:00"),
    rating: 4,
  },
];

/**
 * @returns {Array.<Place>} a shallow clone of the default places list
 */
export default function defaultPlaces() {
  return [...places];
}
