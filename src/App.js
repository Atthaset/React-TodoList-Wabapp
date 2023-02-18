import "./App.css";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import List from "./Components/List";
import Alert from "./Components/Alert";

function App() {
  const [menu, setMenu] = useState("");
  const [list, setList] = useState([]);

  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

  const submitData = (e) => {
    e.preventDefault();
    if (!menu) {
      setAlert({
        show: true,
        msg: "Please enter your information.",
        type: "error",
      });
    } else {
      const newItem = {
        id: uuidv4(),
        title: menu,
      };
      setList([...list, newItem]); //[...list]เรียกทุกตัวใน list ต่อด้วยตัวใหม่ newItem
      setMenu("");
      setAlert({
        show: true,
        msg: "Save data successfully.",
        type: "success",
      });
    }
  };

  const removeItem = (id) => {
    //หาสมาชิกที่ไม่ตรงกับ id ที่ต้องการลบ
    //หา id ที่ต้องการจะลบจากการส่ง props ไป List.js เพื่อระบุว่าเป็นข้อมูลตัวใด
    const newList = list.filter((item) => item.id !== id);
    setList(newList); //นำชุดข้อมูลที่ผ่านการกรองมาเก็บใน list ใหม่
    setAlert({ show: true, msg: "The data has been deleted.", type: "error" });
  };

  return (
    <section className="container">
      <h1>TodoList App</h1>
      {alert.show && <Alert {...alert} setAlert={setAlert} list={list} />}
      <form className="from-group" onSubmit={submitData}>
        <div className="from-control">
          <input
            type="text"
            className="text-input"
            onChange={(e) => setMenu(e.target.value)}
            value={menu}
          />
          <button type="submit" className="submit-btn">
            Add List
          </button>
        </div>
      </form>
      <section className="list-container">
        {list.map((data, index) => {
          return (
            <List key={index} {...data} removeItem={removeItem} /> //{...data} props data ใน list ส่งไปทั้งหมด ทั้ง id และ title โดยไม่ต้องนั่งระบุทีละอัน
          );
        })}
      </section>
    </section>
  );
}

export default App;
