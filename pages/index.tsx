import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addTask,
  removeTask,
  completeTask,
  removeCompletedTasks,
} from "../features/todoSlice";
import { useState } from "react";

const Home: NextPage = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [activeMode, setActiveMode] = useState(false);
  // const [toggle, setToggle] = useState(true);

  let tasks = activeMode
    ? useSelector((state: any) =>
        state.tasks.filter((task: any) => task.active === true)
      )
    : useSelector((state: any) => state.tasks);

  const onAddHandler = () => {
    dispatch(addTask(title));
  };

  const handleKeypress = (e: any) => {
    if (e.keyCode === 13 || e.code === "Enter") {
      onAddHandler();
      setTitle("");
    }
  };

  const onRemoveHandler = (taskId: string) => {
    dispatch(removeTask(taskId));
  };

  const onActiveHandler = (taskId: string) => {
    dispatch(completeTask(taskId));
  };

  const onRemoveCompletedTasks = () => {
    dispatch(removeCompletedTasks());
  };

  // const onEditHandler = (item: any) => {
  //   alert(item.title);
  //   setToggle(false);
  // };

  return (
    <div className={styles.container}>
      <Head>
        <title>Todo List</title>
        <meta name="description" content="Developed by Ehsan Safari" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <input
          name="title"
          type="text"
          placeholder="Enter task and press Enter"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          onKeyPress={handleKeypress}
          className={styles.mainInput}
        />
        <ul className={styles.list}>
          {tasks &&
            tasks?.map((item: any) => {
              return (
                <li key={item.id} className={styles.card}>
                  <div className={styles.taskTitle}>
                    <input
                      className={styles.checkInput}
                      type="checkbox"
                      onClick={() => onActiveHandler(item.id)}
                      checked={!item.active}
                    />
                    {/* {toggle ? ( */}
                    <b
                      // onDoubleClick={() => onEditHandler(item)}
                      className={item.active ? "" : styles.done}
                    >
                      {item.title}
                    </b>
                    {/* ) : (
                      <input
                        onKeyDown={(event) => {
                          if (event.key === "Enter" || event.key === "Escape") {
                            setToggle(true);
                            event.preventDefault();
                            event.stopPropagation();
                          }
                        }}
                        value={item.title}
                        onChange={(e) => setEdittingValue(e.target.value)}
                      />
                    )} */}
                  </div>
                  <i>{item.active ? "active" : "done"}</i>
                  <button
                    onClick={() => onRemoveHandler(item.id)}
                    className={styles.delBtn}
                  >
                    X
                  </button>
                </li>
              );
            })}
        </ul>
        <div className={styles.footerLine}>
          <p className={styles.footerParag}>
            {tasks && tasks?.filter((item: any) => item.active === true).length}{" "}
            items left
          </p>
          <p className={styles.btns}>
            <button
              onClick={() => setActiveMode(false)}
              className={!activeMode ? styles.bold : ""}
            >
              All &nbsp;
            </button>
            <button
              onClick={() => setActiveMode(true)}
              className={activeMode ? styles.bold : ""}
            >
              Active
            </button>
          </p>
          <button onClick={onRemoveCompletedTasks} className={styles.clearBtn}>
            Clear Completed
          </button>
        </div>
      </main>
    </div>
  );
};

export default Home;
