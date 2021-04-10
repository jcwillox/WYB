import { useState, useEffect } from "react";
import DataStore from "./DataStore";

export function useAuthStatus() {
  const [isLoggedIn, setLoggedIn] = useState(null);

  useEffect(() => {
    function handleAuthChange(status) {
      setLoggedIn(status);
    }
    return DataStore.users.subscribeAuthStatus(handleAuthChange);
  });

  return isLoggedIn;
}

/**
 * @param initialState {User | null}
 * @return {User | null}
 * */
export function useUserData(initialState) {
  const [userData, setUserData] = useState(initialState);

  useEffect(() => {
    function handleUserDataChange(user) {
      setUserData({ ...user });
    }
    return DataStore.users.subscribeUserData(handleUserDataChange);
  });

  return userData;
}
