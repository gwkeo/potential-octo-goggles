import { Component, createSignal } from "solid-js";
import {renderToString} from "katex"

import "./InputTeX.css"

export const InputTeX : Component<{value: string; onInput: (value: string) => void}> = (props) => {
    const [expression, setExpression] = createSignal("x^2")
    let formulae = () => {
        props.onInput(expression())
        return renderToString(expression(), {throwOnError: false})
    }

    return (
        <div>
            <input type="text" value={expression()} onInput={(e) => setExpression(e.currentTarget.value)}/>
            <div innerHTML={formulae()}></div>
        </div>
    )
}