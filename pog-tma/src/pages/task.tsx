import { Component } from "solid-js";
import { Router, Route, useNavigate } from "@solidjs/router";
import TaskForm from "../components/taskForm";

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