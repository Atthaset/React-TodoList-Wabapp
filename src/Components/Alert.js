import { useEffect } from "react";

const Alert = ({ msg, type, setAlert, list }) => {
  useEffect(() => {
    const timeOut = setTimeout(() => {
      setAlert({ show: false, msg: "", type: "" });
    }, 1500); //หน่วง 3 วิค่อยเซ็ทค่า setAlert() เป็นค่าเริ่มต้น เพื่อให้หายไป
    return () => clearTimeout(timeOut);//เคลียร์ค่า
    // eslint-disable-next-line
  }, [list]);
  return <p className={`alert ${type}`}>{msg}</p>;
};

export default Alert;
