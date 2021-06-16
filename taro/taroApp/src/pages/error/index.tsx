import { FC } from "react";
import './index.scoped.scss'

const OSError: FC = () => {
  return (
    <div className='error'>
      <div className='logo'></div>
      <p className='error_con1'>无法查看数据</p>
      <p className='error_con2'>请重新打开或者重新登陆</p>
    </div>
  );
};

export default OSError;
