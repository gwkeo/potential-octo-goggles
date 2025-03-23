import { renderToString } from "katex";
import { Component, createSignal, For} from "solid-js";
import { useNavigate } from "@solidjs/router";

import "./taskForm.css"

const TaskForm : Component = () => {
    const navigate = useNavigate()

    const params = {
        "name" : {
            "text" : "Название кривой",
            "options" : ["Парабола", "Гипербола", "Эллипс"]
        },
        "focus_1" : {
            "text": "Фокус 1"
        },
        "focus_2" : {
            "text": "Фокус 2"
        },
        "EC_center" : {
            "text": "Эксцентриситет"
        },
        "parameter" : {
            "text": "Параметр"
        },
        "direct_1" : {
            "text": "Прямая 1"
        },
        "direct_2" : {
            "text": "Прямая 2"
        },
        "semiaxis_a" : {
            "text": "Большая полуось"
        },
        "semiaxis_b" : {
            "text": "Малая полуось"
        },
        "center" : {
            "text": "Центр"
        }
    }

    const fields = [
        'formula',
        'focus1', 
        'focus2', 
        'eccenter', 
        'parameter', 
        'direct1', 
        'direct2', 
        'semiaxis_a', 
        'semiaxis_b',
        'assymptotle1',
        'assymptotle2',
        'center' ]
    
    const [inputs, setInputs] = createSignal<{ [key: string] : string }>()

    const handleInput = (key: string, value: string) => {
        setInputs({ ...inputs(), [key]: value})
    }

    const handleTex = (i: string) => {
        return renderToString(inputs()?.[i] || "", {throwOnError: false})
    }

    const handleSubmit = () => {
        console.log(JSON.stringify(inputs()))
    }

    return (
        <div>
            <select name="" id="">
                <For each={params.name.options}>
                    {(elem) => <option>{elem}</option>}
                </For>
            </select>
            <For each={Object.entries(params)}>
                {([, value]) => <div class="content">
                    <input placeholder={value.text} type="text" onInput={(e) => handleInput(value.text, (e.currentTarget as HTMLInputElement).value)}/>
                    <div class="tex" innerHTML={handleTex(value.text)}></div>
                </div>
            }
            </For>

        </div>
    )
}

export default TaskForm