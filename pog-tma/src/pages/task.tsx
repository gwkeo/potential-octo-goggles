import { Component } from "solid-js";
import { useNavigate } from "@solidjs/router";
import TaskForm from "../components/taskForm";

import "./task.css"

const Task : Component = () => {
    const navigate = useNavigate()

    return (
        <div>
            <h1>Тестирование</h1>
            <TaskForm/>
            <button onclick={() => navigate("/")}>Вернуться назад</button>
        </div>
    )
}

export default Task