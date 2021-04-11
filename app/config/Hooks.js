import { useState, useEffect } from "react";
import DataStore from "./DataStore";

/** @return {boolean | null} */
export function useAuthStatus() {
  const [isLoggedIn, setLoggedIn] = useState(null);

  useEffect(() =>
    DataStore.users.subscribeAuthStatus((status) => setLoggedIn(status))
  );

  return isLoggedIn;
}

/**
 * @param initialState {User | null}
 * @return {User | null}
 */
export function useUserData(initialState) {
  const [userData, setUserData] = useState(initialState);

  useEffect(() =>
    DataStore.users.subscribeUserData((user) => setUserData({ ...user }))
  );

  return userData;
}

/**
 * @param initialState {Array.<Place> | null}
 * @return {Array.<Place> | null}
 */
export function usePlacesList(initialState) {
  const [places, setPlaces] = useState(initialState);

  useEffect(() =>
    DataStore.places.subscribePlacesList((places) => setPlaces([...places]))
  );

  return places;
}
