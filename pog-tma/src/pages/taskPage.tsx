import { Component, createResource} from "solid-js";
import { useNavigate } from "@solidjs/router";
import TaskForm from "../components/taskForm";
import { fetchTask } from "../services/tasks";

import "./taskPage.css"

const TaskPage : Component = () => {
    const navigate = useNavigate()
    const [task] = createResource(fetchTask)

    return (
        <div>
            <h1>Тестирование</h1>
            {task.loading && <h2>Загрузка</h2>}
            {task.error && <h2>Ошибка</h2>}
            {task() && <h2>{task()?.task}</h2>}
            <TaskForm/>
            <button onclick={() => navigate("/")}>Вернуться назад</button>
        </div>
    )
}

export default TaskPage