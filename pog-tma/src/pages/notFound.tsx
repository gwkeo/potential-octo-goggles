import { Component } from "solid-js";

function NotFound() {
    return (
        <div>
            Not found
            {document.URL}
        </div>
    )
}

export default NotFound