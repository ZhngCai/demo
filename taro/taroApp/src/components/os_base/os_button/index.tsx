
import { FC } from "react";
import { Button } from "@tarojs/components";
import { OSButtonProps } from "./type";
import './index.scss'

const OSButton: FC<OSButtonProps> = ({
  className,
  onClick = () => { },
  children
}) => {
  return (
    <Button className={`os-btn ${className}`} onClick={onClick}>{children}</Button>
  );
};

export default OSButton;
