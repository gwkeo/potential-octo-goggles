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
        "focus" : {
            "text": "Фокус 1"
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
            <For each={[...fields]}>
                {(element, i) => 
                <div class="content">
                    <input placeholder={element} type="text" onInput={(e) => handleInput(element, (e.currentTarget as HTMLInputElement).value)}/>
                    <div class="tex" innerHTML={handleTex(element)}></div>
                </div>
            }</For>

        </div>
    )
}

export default TaskForm