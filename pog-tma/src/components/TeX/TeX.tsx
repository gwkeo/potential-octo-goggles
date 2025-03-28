import { renderToString } from "katex";
import { Component } from "solid-js";
import "./TeX.css"

function handleTex(str : string) {
    return renderToString(str, {throwOnError: false});
}

export const TeX: Component<{ str: string }> = (props) => {
    return <>
        <div class="tex" innerHTML={renderToString(props.str)}></div>
    </>
}