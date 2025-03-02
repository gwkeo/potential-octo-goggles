import { Component } from "solid-js";

export const Profile : Component = () => {
    let chat = window.Telegram.WebApp.initDataUnsafe.chat

    return (
        <div class="main">
            <div class="user-id">{chat?.id}</div>
            <div class="user-stats">
            </div>
        </div>
    )
}