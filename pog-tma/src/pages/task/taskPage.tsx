import { Component, createResource, For, Task} from "solid-js";
import { useNavigate } from "@solidjs/router";
import { createStore } from "solid-js/store";
import { fetchTask } from "../../services/tasks";
import { InputTeX } from "../../components/inputTeX/inputTeX";
import { TeX } from "../../components/TeX/TeX";
import { sendAssignment } from "../../services/assignments";

import "./taskPage.css"
import { TaskFields } from "../../models/taskFields";

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
    
    const [task] = createResource(fetchTask)
    const [inputs, setInputs] = createStore({} as TaskFields)

    const handleCoordinateInput = (field: string, e: Event, type: string) => {
        const target = e.target as HTMLInputElement
        field = field.split('.')[0]
        if (type === 'x') {
            setInputs(field, (point: object) => ({...point, x: target.value}))

        } else {
            setInputs(field, (point: object) => ({...point, y: target.value}))

        }
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
                <button ontouchstart={() => console.log(JSON.stringify(inputs))}>Отправить</button>
            </div>
        </div>
    )
}

export default TaskPage