import React, { useState } from "react";
import axios from "axios";
import DeleteModal from "./DeleteModal";
import ModalComponent from "./Modal";

const App: React.FC = () => {
  const [modal, setModal] = React.useState<boolean>(false);
  const [viewCompleted, setViewCompleted] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [activeItem, setActiveItem] = useState({
    title: "",
    description: "",
    completed: false,
  });
  const [taskList, setTaskList] = useState<Array<any>>([]);

  const refreshList = () => {
    axios
      .get("http://localhost:8000/api/tasks/")
      .then((res) => setTaskList((prev) => res.data))
      .catch((err) => console.log(err));
  };

  const displayCompleted = (status: boolean) => {
    if (status) {
      return setViewCompleted(true);
    }
    return setViewCompleted(false);
  };

  const toggle = () => {
    setModal((prev) => !prev);
  };

  const toggleDelete = () => {
    setModalDelete((prev) => !prev);
  };

  const handleSubmit = (item: any) => {
    toggle();
    if (item.id) {
      axios
        .put(`http://localhost:8000/api/tasks/${item.id}/`, item)
        .then((res) => refreshList());
      return;
    }
    axios
      .post("http://localhost:8000/api/tasks/", item)
      .then((res) => refreshList());
  };

  const openValidation = () => {};

  const handleDelete = (item: any) => {
    axios
      .delete(`http://localhost:8000/api/tasks/${item.id}/`)
      .then((res) => refreshList());
  };

  const createItem = () => {
    const item = { title: "", description: "", completed: false };
    setModal((prev) => !prev);
    setActiveItem(item);
  };

  const editItem = (item: any) => {
    setModal((prev) => !prev);
    setActiveItem(item);
  };

  const renderTabList = () => {
    return (
      <div className="my-5 tab-list">
        <span
          onClick={() => displayCompleted(true)}
          className={viewCompleted ? "active" : ""}
        >
          completed
        </span>
        <span
          onClick={() => displayCompleted(false)}
          className={viewCompleted ? "" : "active"}
        >
          Incompleted
        </span>
      </div>
    );
  };

  const renderItems = () => {
    const newItems = taskList.filter(
      (item) => item.completed === viewCompleted
    );
    return newItems.map((item) => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`task-title mr-2  ${
            viewCompleted ? "completed-task" : ""
          }`}
          title={item.title}
        >
          {item.title}
        </span>
        <span>
          <button onClick={() => editItem(item)} className="btn btn-info mr-2">
            Edit
          </button>
          <button onClick={toggleDelete} className="btn btn-danger mr-2">
            Delete
          </button>
          {modalDelete ? (
            <DeleteModal
              activeItem={activeItem}
              setActiveItem={setActiveItem}
              toggle={toggle}
              toggleDelete={toggleDelete}
              onDelete={handleDelete}
              onSave={handleSubmit}
              item={item}
            />
          ) : null}
        </span>
      </li>
    ));
  };

  return (
    <main className="content p-3 mb-2 bg-info">
      <h1 className="text-white text-uppercase text-center my-4">
        {" "}
        Task Tacker{" "}
      </h1>
      <div className="row">
        <div className="col-md-6 col-sma-10 mx-auto p-0">
          <div className="card p-3">
            <div className="">
              <button onClick={createItem} className="btn btn-primary">
                Add task
              </button>
            </div>
            {renderTabList()}
            <ul className="list-group list-group-flush">{renderItems()}</ul>
          </div>
        </div>
      </div>
      <footer className="my-5 mb-2 bg-info text-white text-center">
        Copyright 2023 &copy; All right Reserved
      </footer>
      {modal ? (
        <ModalComponent
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          toggle={toggle}
          onSave={handleSubmit}
        />
      ) : null}
    </main>
  );
};

export default App;
