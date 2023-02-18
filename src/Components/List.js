const List = ({ id, title ,removeItem}) => {
  return (
    <div className="list-item">
        <p className="title">{title}</p>
        <div className="btn-container">
            <button>Edit</button>
            <button onClick={()=>removeItem(id)}>Delete</button>
        </div>
    </div>
  )
};

export default List;
