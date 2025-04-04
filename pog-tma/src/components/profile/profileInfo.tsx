import { Component, createResource, For } from "solid-js";

import "./profileInfo.css"
import { fetchAssignmentsByUserID } from "../../services/assignments";

const ProfileInfo : Component = () => {
    
    const tg = window.Telegram.WebApp
    let userInfo = tg.initDataUnsafe.user || {
        id: 0,
        photo_url: "https://i.pinimg.com/736x/a8/77/39/a877397cabf3ea3c10c880912b2fc1f3.jpg",
        first_name: "dasha"
    }

    const [data] = createResource(() => userInfo.id, fetchAssignmentsByUserID)

    return (
        <div class="profile">   
            <div class="profile-container">
                <img src={userInfo.photo_url} />
                <div>{userInfo.first_name}</div>
            </div>
            <div class="assignments-list">
                {data.loading && <div>Загрузка</div>}
                {data.error && <div>Ошибка</div>}
                <For each={data()}>
                    {(e) => 
                        <div class="assignment-container">
                            <div class="formula">
                                <div class="text">Задание</div>
                                <div class="value">{e.formula}</div>
                            </div>
                            <div class="grade">
                                <div class="text">Оценка</div>
                                <div class="value">{e.grade}</div>
                            </div>
                        </div>
                    }
                </For>
            </div>
        </div>
    )
}

export default ProfileInfo