import { Component } from "solid-js";

import "./profileInfo.css"

const ProfileInfo : Component = () => {
    const tg = window.Telegram.WebApp
    let userInfo = tg.initDataUnsafe.user || {
        photo_url: "https://i.pinimg.com/736x/a8/77/39/a877397cabf3ea3c10c880912b2fc1f3.jpg",
        first_name: "aaa"
    }

    return (
        <div class="profile-container">
            <img src={userInfo?.photo_url} />
            <h3>{userInfo?.first_name}</h3>
        </div>
    )
}

export default ProfileInfo