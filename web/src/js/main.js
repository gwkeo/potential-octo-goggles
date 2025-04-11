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


    const task = await getTask()

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

    const formInputs = document.querySelectorAll('.form-input')
    formInputs.forEach(elem => {
        elem.addEventListener('input', (value) => {
            renderTex(value.target.id, value.target.value)
        })
    })

    document.querySelector('.submit').addEventListener('click', async () => {
        const formData = {
            name: document.querySelector('select.name').value,
            task: task,
            formula: document.querySelector('.form-input#task').value,
            focus1: {
              x: document.querySelector('input#focus1_x').value,
              y: document.querySelector('input#focus1_y').value
            },
            focus2: {
              x: document.querySelector('input#focus2_x').value,
              y: document.querySelector('input#focus2_y').value
            },
            center: {
              x: document.querySelector('input#center_x').value,
              y: document.querySelector('input#center_y').value
            },
            eccenter: document.querySelector('input#eccenter').value,
            parameter: document.querySelector('input#parameter').value,
            direct1: document.querySelector('input#direct1').value,
            direct2: document.querySelector('input#direct2').value,
            semiaxis_a: document.querySelector('input#semiaxis_a').value,
            semiaxis_b: document.querySelector('input#semiaxis_b').value,
            asymptote1: document.querySelector('input#asymptote1').value,
            asymptote2: document.querySelector('input#asymptote2').value
          }

        console.log(formData)
        await sendSolution(formData)
    })
}

function renderTask(task) {
    const taskContent = document.querySelector('.task')

    taskContent.innerHTML = `${renderToString("x=y", {throwOnError: false})}`
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