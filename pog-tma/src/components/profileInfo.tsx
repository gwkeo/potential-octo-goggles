import { Component } from "solid-js";

import "./profileInfo.css"

const ProfileInfo : Component = () => {
    const tg = window.Telegram.WebApp
    let userInfo = tg.initDataUnsafe.user

    return (
        <div>
            <img src={userInfo?.photo_url} />
            <h3>{userInfo?.first_name}</h3>
        </div>
    )
}

export default ProfileInfo