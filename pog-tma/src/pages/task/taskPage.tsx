import { Component, createResource, For, createSignal, onMount} from "solid-js";
import { useNavigate } from "@solidjs/router";
import { createStore } from "solid-js/store";
import { fetchTask } from "../../services/tasks";
import { InputTeX } from "../../components/inputTeX/inputTeX";
import { TeX } from "../../components/TeX/TeX";

import "./taskPage.css"
import { Solution } from "../../models/taskFields";
import { sendAssignment } from "../../services/assignments";
import { Assignment } from "../../models/assignment";

const TaskPage : Component = () => {
    const navigate = useNavigate()
    const curveNames = ['Эллипс', 'Парабола', 'Гипербола']
    const fields = [
        {"name": "task", "placeholder": "Каноническое уравнение"},
        {"name": "focus1.point", "placeholder": "Фокус 1"},
        {"name": "focus2.point", "placeholder": "Фокус 2"},
        {"name": "ec_center", "placeholder": "Эксцентриситет"},
        {"name": "parameter", "placeholder": "Параметр"},
        {"name": "direct1", "placeholder": "Директрисы 1"},
        {"name": "direct2", "placeholder": "Директрисы 2"},
        {"name": "semi_axis1", "placeholder": "Полуось 1"},
        {"name": "semi_axis2", "placeholder": "Полуось 2"},
        {"name": "assymptote1", "placeholder": "Ассимптота 1"},
        {"name": "assymptote2", "placeholder": "Ассимптота 2"},
        {"name": "center.point", "placeholder": "Центр"}
    ]
    
    const [attempts, setAttempts] = createSignal(0)
    const [startingDate, setStartingDate] = createSignal(Date.now())
    const [inputs, setInputs] = createStore({} as Solution)
    const [assignment, setAssignment] = createStore({} as Assignment)
    const [task] = createResource(fetchTask)
    const [result] = createResource(() => assignment, sendAssignment)
    
    onMount(() => {
        setStartingDate(() => Date.now())
    })
    
    const handleCoordinateInput = (field: string, e: Event, type: string) => {
        const target = e.target as HTMLInputElement
        field = field.split('.')[0]
        if (type === 'x') {
            setInputs(field, (point: object) => ({...point, x: target.value}))
            
        } else {
            setInputs(field, (point: object) => ({...point, y: target.value}))
            
        }
    }
    
    const handleSubmit = () => {
        setAttempts(() => attempts() + 1)
        const app = window.Telegram.WebApp.initDataUnsafe
        const solution = inputs
        setAssignment({
            ID: 0, UserID: 
            app.user?.id, 
            formula: task()!.task,
            solution: solution,
            grade: 0,
            attempts: attempts(),
            time_start: new Date(startingDate()),
            time_end: new Date(Date.now()),
        })
    }
    
    return (
        <div>
            <h1>Тестирование</h1>
            {task.loading && <h3>Загрузка</h3>}
            {task.error && <h3>Ошибка</h3>}
            {task() && <TeX str={task()?.task || ""}></TeX>}
            <select value={inputs.name} onchange={(e) => setInputs('name', e.currentTarget.value)}>
                <For each={curveNames}>
                    {(key) => 
                        <option value={key}>{key}</option>
                    }
                </For>
            </select>
            <For each={fields}>
                {(field) => 
                    <div>
                        {field.name.split('.')[1] === 'point' ? (
                            <div class="points">
                                <input type="text" placeholder={field.placeholder + " (x)"} oninput={(e) => handleCoordinateInput(field.name, e, "x")}/>
                                <input type="text" placeholder={field.placeholder + " (y)"} oninput={(e) => handleCoordinateInput(field.name, e, "y")}/>
                            </div>
                        ) : (
                            <InputTeX placeholder={field.placeholder} setter={setInputs} field={field.name}></InputTeX>
                        )}
                        
                    </div>
                }
            </For>
            <div class="buttons">
                <button onclick={() => navigate("/")}>Вернуться назад</button>
                <button ontouchstart={handleSubmit}>Отправить</button>
            </div>

            <div class="output">
                {result.loading && <></>}
                {result.error && <div>Ошибка {result.error}</div>}
                {result()}
            </div>
        </div>
    )
}

export default TaskPage