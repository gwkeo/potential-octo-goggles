import {Component} from 'solid-js'
import { useNavigate } from '@solidjs/router'
import ProfileInfo from '../components/profileInfo'

const ProfilePage: Component = () => {
    const navigate = useNavigate()

    window.Telegram.WebApp.BackButton
        .onClick(() => {
            navigate("/")
            window.Telegram.WebApp.BackButton.hide()
        })
        .show()

    return (
        <div>
            <h1>Профиль пользователя</h1>
            <ProfileInfo></ProfileInfo>
            <button onclick={() => navigate("/task")}>Начать тестирование</button>
        </div>
    )
}

export default ProfilePage