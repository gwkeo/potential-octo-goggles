import { renderToString } from "katex";
import { Component, createSignal, For} from "solid-js";
import { useNavigate } from "@solidjs/router";

import "./taskForm.css"

const TaskForm : Component = () => {
    const navigate = useNavigate()

    const fields = ['name', 
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
            <For each={[...fields]}>
                {(element, i) => 
                <div class="content">
                    <div>{element}</div>
                    <input placeholder="Пример, x^2" type="text" onInput={(e) => handleInput(element, (e.currentTarget as HTMLInputElement).value)}/>
                    <div class="tex" innerHTML={handleTex(element)}></div>
                </div>
            }</For>

        </div>
    )
}

export default TaskForm