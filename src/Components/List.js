const List = ({ id, title, removeItem, editItem }) => {
  return (
    <div className="list-item">
      <p className="title">{title}</p>
      <div className="btn-container">
        <button onClick={() => editItem(id)}>Edit</button>
        <button onClick={() => removeItem(id)}>Delete</button>
      </div>
    </div>
  );
};

export default List;
