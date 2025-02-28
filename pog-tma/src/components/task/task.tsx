import { renderToString } from "katex";
import { Component, createSignal, For, onMount } from "solid-js";

import "./task.css"

export const Task : Component = () => {
    onMount(() => {
        if (window?.Telegram?.WebApp) {
            let app = window.Telegram.WebApp
            app.MainButton
                .setText("Отправить")
                .onClick(handleSubmit)
                .show()
            
            app.BackButton.onClick(() => app.showAlert("back button pressed"))
        }
    })

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
            <div class="footer-bar">
                <button class="cancel" onclick={() => {console.log("return back")}}>back</button>
                <button class="submit" onclick={() => {handleSubmit()}}>Submit</button>
            </div>

        </div>
    )
}