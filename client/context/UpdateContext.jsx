// Create context and use states
import { createContext, useContext, useState } from "react";

// Create context
const NewContext = createContext();

// Create a context for updates
const UpdateContext = ({ children }) => {
  const [update, setUpdate] = useState(null);
  return (
    <NewContext.Provider value={{ update, setUpdate }}>
      {children}
    </NewContext.Provider>
  );
};

// Export the update context
export default UpdateContext;