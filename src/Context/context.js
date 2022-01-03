import React, { createContext, useState, useContext } from "react";

export const Context = createContext();

// export function UseContext() {
//   const context = useContext(Context);
//   return context;
// }

export function ContextProvider({ children }) {
  const [username, setUsername] = useState("");
  const [id, setId] = useState("");
  const [socket, setSocket] = useState(null)
  const value = { username, setUsername, id, setId, socket, setSocket};

  return <Context.Provider value={value} >{children}</Context.Provider>;
}
//export default UseContext;
