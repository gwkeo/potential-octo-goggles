import { Component, createResource} from "solid-js";
import { useNavigate } from "@solidjs/router";
import TaskForm from "../../components/task/taskForm";
import { fetchTask } from "../../services/tasks";

import "./taskPage.css"
import { TeX } from "../../components/TeX/TeX";

const TaskPage : Component = () => {
    const navigate = useNavigate()
    const [task] = createResource(fetchTask)

    return (
        <div>
            <h1>Тестирование</h1>
            {task.loading && <h3>Загрузка</h3>}
            {task.error && <h3>Ошибка</h3>}
            {task() && <TeX str={task()?.task || ""}></TeX>}
            <TaskForm/>
            <div class="buttons">
                <button onclick={() => navigate("/")}>Вернуться назад</button>
                <button>Отправить</button>
            </div>
        </div>
    )
}

export default TaskPage