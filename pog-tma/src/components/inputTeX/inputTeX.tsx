import { Component, createSignal } from "solid-js";
import { TeX } from "../TeX/TeX";

export const InputTeX: Component<{ placeholder: string, setter(key: string, value: string): void}> = (props) => {
    const [input, setInput] = createSignal("")
    
    function handleInput(e: Event) {
        const target = e.target as HTMLInputElement
        props.setter("smt", target.value)
        setInput(target.value)
    }
    
    return <>
        <input placeholder={props.placeholder} onInput={handleInput}></input>
        <TeX str={input()}></TeX>
    </>
}