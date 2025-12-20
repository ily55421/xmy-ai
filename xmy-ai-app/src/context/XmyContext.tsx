import React, { createContext, useContext, useState } from "react";
import { initXmy, Xmy } from "./XmyType";

const XmyContext = createContext(initXmy);
export function useXmy() {
  return useContext(XmyContext);
}


export function XmyProvider({ children }: { children: React.ReactNode }) {
  const [xmyState, setXmyState] = useState<Xmy>(initXmy)

  return <XmyContext.Provider value={{...xmyState, setState: setXmyState}}>
    {children}
  </XmyContext.Provider>
}
