/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useScreenDimensions } from "use-screen-dimensions";

type Props = {
  children: React.ReactNode;
  ids?: string;
  bgcolor: string;
};

const ViewportWrapper: React.FC<Props> = ({ children, ids, bgcolor }) => {
  const { width } = useScreenDimensions();

  const isMobile = width < 950;
  return (
    <div
      id={ids}
      style={
        !isMobile
          ? {
            backgroundColor: bgcolor,
            width: "100%",
          }
          : { backgroundColor: bgcolor }
      }
    >
      {children}
    </div>
  );
};

export default ViewportWrapper;
