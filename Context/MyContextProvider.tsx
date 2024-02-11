import { MyContext } from "./MyContext";
import React, { useState } from "react";
function MyContextProvider(props: any) {
  const [openForm, setOpenForm] = useState<number>(1);

  // console.log(openForm);
  return (
    <MyContext.Provider value={{ openForm, setOpenForm }}>
      {props.children}
    </MyContext.Provider>
  );
}
export default MyContextProvider;
