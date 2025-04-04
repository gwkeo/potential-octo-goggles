import { Component, createSignal } from "solid-js";
import { TeX } from "../TeX/TeX";
import "./inputTeX.css"

export const InputTeX: Component<{ placeholder: string, setter(key: string, value: string): void, field: string}> = (props) => {
    const [input, setInput] = createSignal("")
    
    function handleInput(e: Event) {
        const target = e.target as HTMLInputElement
        props.setter(props.field, target.value)
        setInput(target.value)
    }
    
    return <>
        <input placeholder={props.placeholder} onInput={handleInput}></input>
        <TeX str={input()}></TeX>
    </>
}