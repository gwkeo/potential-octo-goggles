import { Component, createSignal } from "solid-js";
import * as katex from "katex"

import "./InputTeX.css"

export const InputTeX : Component = () => {
    const [expression, setExpression] = createSignal("x^2")
    let formulae = () => {
        return katex.renderToString(expression(), {throwOnError: false})
    }

    return (
        <div>
            <input type="text" value={expression()} onInput={(e) => setExpression(e.currentTarget.value)}/>
            <div innerHTML={formulae()}></div> 
        </div>
    )
}