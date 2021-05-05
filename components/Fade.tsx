import { FC } from "react";
import { Fade } from "react-awesome-reveal";

export const CustomFade: FC = ({ children }) => {
  return <Fade>{children}</Fade>;
};

export default CustomFade;
