import { getUsersAssignments, getTask } from "./api"
import { getUserData } from "./telegram"
import { renderToString } from "katex"
import { fieldsConfig } from "./models"

document.addEventListener('DOMContentLoaded', async () => {
    if (document.querySelector('.tg-info')) {
        await initMainPage()
    } else if (document.querySelector('.form')) {
        await initFormPage()
    }
})

async function initMainPage() {
    const userData = getUserData()
    renderTelegram(userData)

    const assignments = await getUsersAssignments(userData.id)
    renderAssignments(assignments)
}

async function initFormPage() {
    const task = await getTask()
    renderTask(task)

    const formInputs = document.querySelectorAll('.form-input')
    formInputs.forEach(elem => {
        elem.addEventListener('input', (value) => {
            console.log(value.target.value)
        })
    })
}

function renderTask(task) {
    const taskContent = document.querySelector('.task')
    taskContent.innerHTML = `${renderToString(task.task, {throwOnError: false})}`
}

function renderInput(key, value) {

}

function renderTelegram(data) {
    const tgInfo = document.querySelector('.tg-info')
    tgInfo.innerHTML = 
    `<div>
    <img src="${data.photo_url}" alt="">
    <div class="name">${data.first_name}</div>
    </div>`
}

function renderAssignments(data) {
    const userInfo = document.querySelector('.assignments-info')
    for (let i = 0; i < data.length; i++) {
        console.log(data[i])
        userInfo.innerHTML += `
        <div class="assignment">
        <div class="formula">${data[i].formula}</div>
        <div class="grade">${data[i].grade}</div>
        <div>${data.time_start}</div>
        </div>`
    }
}