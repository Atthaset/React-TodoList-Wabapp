import "./App.css";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import List from "./Components/List";

function App() {
  const [menu, setMenu] = useState("");
  const [list, setList] = useState([]);

  const submitData = (e) => {
    e.preventDefault();
    const newItem = {
      id: uuidv4(),
      title: menu,
    };
    setList([...list, newItem]); //[...list]เรียกทุกตัวใน list ต่อด้วยตัวใหม่ newItem
    setMenu("")
  };

  return (
    <section className="container">
      <h1>TodoList App</h1>
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
        {list.map((data,index)=>{
          return(
            <List key={index} {...data}/> //{...data} props data ใน list ส่งไปทั้งหมด ทั้ง id และ title โดยไม่ต้องนั่งระบุทีละอัน 
          )
        })}
      </section>
    </section>
  );
}

export default App;
