import { getUsersAssignments } from "./api"
import { getUserData } from "./telegram"

document.addEventListener('DOMContentLoaded', async () => {
    const tgInfo = document.querySelector('.tg-info')
    const userData = getUserData()
    tgInfo.innerHTML = 
    `<div>
    <img src="${userData.photo_url}" alt="">
    <div class="name">${userData.first_name}</div>
    </div>`

    const data = await getUsersAssignments(userData.id)
    const userInfo = document.querySelector('.assignments-info')
    for (let i = 0; i < data.length; i++) {
        console.log(data[i])
        userInfo.innerHTML += `
        <div class="assignment">
        <div class="formula">${data[i].formula}</div>
        <div class="grade">${data[i].grade}</div>
        </div>`
    }
})