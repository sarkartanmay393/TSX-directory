import React, { useContext } from "react";
import useStoreContext from "./useStoreContext";

export const storeContext = React.createContext();
export default function StoreProvider({ children }) {
  const value = useStoreContext();

  return (
    <storeContext.Provider value={value}>{children}</storeContext.Provider>
  );
}
