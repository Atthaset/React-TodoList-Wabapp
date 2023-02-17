const List = ({ id, title }) => {
  return (
    <div className="list-item">
        <p className="title">{title}</p>
        <div className="btn-container">
            <button>Edit</button>
            <button>Delete</button>
        </div>
    </div>
  )
};

export default List;
