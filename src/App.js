import "./App.css";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import List from "./Components/List";
import Alert from "./Components/Alert";

function App() {
  const [menu, setMenu] = useState(""); //เก็บข้อมูลที่กรอก
  const [list, setList] = useState([]);

  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

  const [checkEditItem, setCheckEditItem] = useState(false); //เช็คว่าต้องการ Edit ไหม
  const [editId, setEditId] = useState(null);

  const submitData = (e) => {
    e.preventDefault();
    if (!menu) {
      setAlert({
        show: true,
        msg: "Please enter your information.",
        type: "error",
      });
    }
    //กรณี Edit เช็คว่าต้องการ Edit ไหม และข้อมูลไม่ได้เป็นค่าว่าง
    else if (checkEditItem && menu) {
      //อัพเดทข้อมูล จากการเช็ค id ของข้อมูลทุกตัวว่าตรงกับตัวที่ Edit ไหม
      const result = list.map((item) => {
        if (item.id === editId) {
          return { ...list, title: menu }; //ส่งข้อมูลที่เปลี่ยนกลับไปโดยอิงจาก menu ที่เปลีย่นไป
        }
        return item;
      }); //ได้ข้อมูลก้อนใหม่อยู่ใน result
      setList(result);
      setMenu(""); //หลังแก้เสร็จให้ช่องว่างเปล่า
      setCheckEditItem(false); //เปลี่ยนเพื่อให้ปุ่มจาก Edit Item เป็น Add List
      setEditId(null)//เพื่อระบุว่าไม่มี id ที่ต้องการแก้ไขแล้ว
      setAlert({ show: true, msg: "Edit successfully.", type: "success" })
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

  const editItem = (id) => {
    //เกิดขึ้นเมื่อกด Edit
    //หา id ที่ต้องการแก้ไขจากการส่ง props ไป List.js
    setCheckEditItem(true);
    setEditId(id);
    const toEditItem = list.find((item) => item.id === id);
    setMenu(toEditItem.title); //set เพื่อดึงมาโชว์ที่ช่องกรอกข้อมูล
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
            {checkEditItem ? "Edit Item" : "Add List"}
          </button>
        </div>
      </form>
      <section className="list-container">
        {list.map((data, index) => {
          return (
            <List
              key={index}
              {...data}
              removeItem={removeItem}
              editItem={editItem}
            /> //{...data} props data ใน list ส่งไปทั้งหมด ทั้ง id และ title โดยไม่ต้องนั่งระบุทีละอัน
          );
        })}
      </section>
    </section>
  );
}

export default App;
