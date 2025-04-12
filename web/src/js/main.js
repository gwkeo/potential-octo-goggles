import { getUsersAssignments, getTask, sendSolution } from "./api"
import { getUserData } from "./telegram"
import { renderToString } from "katex"
import { fieldsConfig, curves } from "./models"
import { BASE_ROUTE, FORM_ROUTE } from "./routes"

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

    document.querySelector('.go-to-form').addEventListener('click', () => {
        window.location.href = FORM_ROUTE
    })
}

async function initFormPage() {

    document.querySelector('.back-to-main').addEventListener('click', () => {
        window.location.href = BASE_ROUTE
    })

    let task = await getTask()
    renderTask(task)

    renderTaskInputs()

    const formInputs = document.querySelectorAll('.form-input')
    formInputs.forEach(elem => {
        elem.addEventListener('input', (value) => {
            renderTex(value.target.id, value.target.value)
        })
    })

    document.querySelector('.submit').addEventListener('click', async () => {
        await submitHandler(task)
    })
}

async function submitHandler(task) {
    const solution = {
        name: document.querySelector('select.name').value || "0",
        task: task.task,
        formula: document.querySelector('.form-input#task').value || "0",
        focus1: {
          x: document.querySelector('input#focus1_x').value || "0",
          y: document.querySelector('input#focus1_y').value || "0"
        },
        focus2: {
          x: document.querySelector('input#focus2_x').value || "0",
          y: document.querySelector('input#focus2_y').value || "0"
        },
        center: {
          x: document.querySelector('input#center_x').value || "0",
          y: document.querySelector('input#center_y').value || "0"
        },
        eccenter: document.querySelector('input#eccenter').value || "0",
        parameter: document.querySelector('input#parameter').value || "0",
        direct1: document.querySelector('input#direct1').value || "0",
        direct2: document.querySelector('input#direct2').value || "0",
        semiaxis_a: document.querySelector('input#semiaxis_a').value || "0",
        semiaxis_b: document.querySelector('input#semiaxis_b').value || "0",
        asymptote1: document.querySelector('input#asymptote1').value || "0",
        asymptote2: document.querySelector('input#asymptote2').value || "0"
      }
      
    let userData = getUserData()
    let formData = {
        user_id: userData.id,
        formula: task.task,
        solution: solution,
        grade: 0
    }

    console.log(formData)
    await sendSolution(formData)
}

function renderTaskInputs() {
    const container = document.querySelector('.container')
    fieldsConfig.forEach(elem => {
        if (elem.group) {
            const groupTitle = document.createElement('h2')
            groupTitle.innerText = elem.group

            const inputs = document.createElement('div')
            inputs.className = 'group-elements'
            elem.fields.forEach(field => {
                const inputFields = document.createElement('div')
                inputFields.className = 'field'
                inputFields.id = field.id

                const input = document.createElement('input')
                input.className = 'form-input'
                input.id = field.id
                input.placeholder = field.label

                const tex = document.createElement('div')
                tex.className = 'tex'
                tex.id = field.id
                inputFields.append(input, tex)
                inputs.append(inputFields)
            });
            container.append(groupTitle, inputs)
        } else if (elem.type == "select") {
            const select = document.createElement('select')
            select.className = 'name'
            curves.forEach(curve => {
                const option = document.createElement('option')
                option.innerText = curve
                select.appendChild(option)
            });

            container.appendChild(select)
        } else {
            const input = document.createElement('input')
            input.className = 'form-input'
            input.id = 'task'

            const tex = document.createElement('div')
            tex.className = 'tex'
            tex.id = 'task'

            container.append(input, tex)
        }
    })
}

function renderTask(task) {
    const taskContent = document.querySelector('.task')
    const result = renderToString(task.task, {throwOnError: false})
    taskContent.innerHTML = `${result}`
}

function renderTex(key, value) {
    const tex = document.querySelector(`.tex#${key}`)
    tex.innerHTML = `<div>${renderToString(value, {throwOnError: false})}</div>`
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
    if (data == null) {
        userInfo.innerHTML = `Список пуст! Хихихаха`
    } else {
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
}