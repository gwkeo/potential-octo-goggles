import { getUsersAssignments, getTask, sendSolution } from "./api"
import { getUserData, setProfileMenuButton, setTestingMenuButtons } from "./telegram"
import { renderToString } from "katex"
import { fieldsConfig, curves, buttonActivationTypes } from "./models"
import { BASE_ROUTE, FORM_ROUTE } from "./routes"

document.addEventListener('DOMContentLoaded', async () => {
    updateNavbarHeight()
    const tg = window?.Telegram?.WebApp

    if (tg && tg?.themeParams) {
        applyTheme(tg.themeParams);
    }
    
    tg?.onEvent('themeChanged', () => {
        applyTheme(tg.themeParams);
    });
    
    if (document.querySelector('.tg-info')) {
        await initMainPage()
    } else if (document.querySelector('.form')) {
        await initFormPage()
    }
})

function updateNavbarHeight() {
    const navbar = document.querySelector('.nav');
    const height = navbar.offsetHeight;
    document.documentElement.style.setProperty('--nav-height', `${height + 10}px`);
}

async function initMainPage() {

    const userData = getUserData()
    renderTelegram(userData)

    const assignments = await getUsersAssignments(userData.id)
    renderAssignments(assignments)

    let mainButton = setProfileMenuButton()
    if (mainButton) {
        mainButton.onClick(() => {
            window.location.href = FORM_ROUTE
        })
    } else {
        alert("main button not laoded")
    }
}

function applyTheme(themeParams) {
    const root = document.documentElement;

    root.style.setProperty('--default-light-color', themeParams.bg_color || '#f8f8f8');
    root.style.setProperty('--default-dark-color', themeParams.text_color || '#1f1f1f');
    root.style.setProperty('--default-secondary-light-color', themeParams.secondary_bg_color || '#f6fafd');
    root.style.setProperty('--default-secondary-dark-color', themeParams.hint_color || '#313131');
    root.style.setProperty('--default-blue', themeParams.button_color || '#0084ff');
}

async function initFormPage() {
    
    let task = await getTask()
    if (task) {
        renderTask(task)
    }

    const time_start = new Date().toISOString()
    
    renderTaskInputs()
    const formInputs = document.querySelectorAll('.form-input')

    formInputs.forEach(elem => {
        elem.addEventListener('input', (value) => {
            renderTex(value.target.id, value.target.value)
        })
    })
    
    let {mainButton, secondaryButton} = setTestingMenuButtons()
    if (!mainButton && !secondaryButton) {
        alert("Telegram buttons not laoded")
    }

    secondaryButton.onClick(() => {
        window.location.href = BASE_ROUTE
    })
    
    mainButton.onClick(async () => {
        const time_end = new Date().toISOString()
        try {
            await handleSubmit(task, time_start, time_end)
        } catch (e) {
            alert("Ошибка во время отправки формы: ", err)
        }
    })

    buttonActivationTypes.forEach( (type) => {
        document.querySelector('.help-button').addEventListener(type, () => {
            renderHelpMessage()
        })
    })

    buttonActivationTypes.forEach( (type) => {
        document.querySelector('.modal-button').addEventListener(type, () => {
            document.querySelector('.overlay').classList.remove('show')
        })
    })
}

async function handleSubmit(task, time_start, time_end) {
    const solution = {
        name: document.querySelector('select.name').value || "",
        task: task.task,
        formula: document.querySelector('.form-input#formula').value || "",
        focus1: {
          x: document.querySelector('input#focus1_x').value || "",
          y: document.querySelector('input#focus1_y').value || ""
        },
        focus2: {
          x: document.querySelector('input#focus2_x').value || "",
          y: document.querySelector('input#focus2_y').value || ""
        },
        center: {
          x: document.querySelector('input#center_x').value || "",
          y: document.querySelector('input#center_y').value || ""
        },
        eccenter: document.querySelector('input#eccenter').value || "",
        parameter: document.querySelector('input#parameter').value || "",
        direct1: document.querySelector('input#direct1').value || "",
        direct2: document.querySelector('input#direct2').value || "",
        semiaxis_a: document.querySelector('input#semiaxis_a').value || "",
        semiaxis_b: document.querySelector('input#semiaxis_b').value || "",
        asymptote1: document.querySelector('input#asymptote1').value || "",
        asymptote2: document.querySelector('input#asymptote2').value || ""
      }
      
    let userData = getUserData()
    let formData = {
        user_id: userData.id,
        formula: task.task,
        solution: solution,
        time_start: time_start,
        time_end:time_end
    }

    console.log(formData)
    let response = await sendSolution(formData)
    console.log(response.Message)
    if (!response.OK) {
        alert(response.Message)
    } else {
        alert(response.Message)
    }
}

function renderHelpMessage() {
    document.querySelector('.overlay').classList.add('show')
    document.querySelector('.modal-title').innerText = 'Помощь'
    document.querySelector('.modal-content').innerHTML = `<div>
        <p>Система принимает дроби и корни в следующем ТеХ формате:</p>
        <p>\\frac{}{} для дробей</p>
        <p>\\sqrt{} для корней</p>
        <p>Для отсутствующего параметра соответстующее поле должно быть пустым</p>
        <p>Каноническое уравнение для вырожденных случаев: два уравнения прямой через запятую.</p>
        <p>Правая часть канонического уравнения для сопряжённой гиперболы: -1. </p>
        <p>Для директрис ОБЯЗАТЕЛЬНО указывать ось: x=значение; y=значение.</p>
    </div>`
}

function renderTaskInputs() {
    const container = document.querySelector('.container')
    fieldsConfig.forEach(elem => {
        if (elem.group) {
            
            const inputs = document.createElement('div')
            inputs.className = 'group-elements'
            const groupTitle = document.createElement('h2')
            groupTitle.innerText = elem.group
            inputs.append(groupTitle)
            elem.fields.forEach(field => {
                const inputFields = document.createElement('div')
                inputFields.className = 'field'
                inputFields.id = field.id

                const input = document.createElement('input')
                input.setAttribute('type', 'text')
                input.setAttribute('inputmode', 'text')
                input.setAttribute('enterkeyhint', 'done')
                input.setAttribute('autocomplete', 'off')

                input.className = 'form-input'
                input.id = field.id
                input.placeholder = field.label

                const tex = document.createElement('div')
                tex.className = 'tex'
                tex.id = field.id
                inputFields.append(input, tex)
                inputs.append(inputFields)
            });
            container.append(inputs)
        } else if (elem.type == "select") {
            const select = document.createElement('select')
            select.className = 'name'
            curves.forEach(curve => {
                const option = document.createElement('option')
                option.innerText = curve
                select.appendChild(option)
            });

            const separatorDiv = document.createElement('div')
            separatorDiv.className = 'group-elements'
            
            separatorDiv.appendChild(select)
            container.appendChild(separatorDiv)
        } else {
            const formulaInput = document.createElement('div')
            formulaInput.className = 'group-elements'

            const input = document.createElement('input')
            input.setAttribute('placeholder', elem.label)
            input.className = 'form-input'
            input.id = 'formula'

            const tex = document.createElement('div')
            tex.className = 'tex'
            tex.id = 'formula'

            formulaInput.append(input, tex)
            container.append(formulaInput)
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
    if (data) {
        tgInfo.innerHTML = 
        `<div class="profile-info">
            <img src="${data.photo_url}" alt="">
            <div class="name">${data.first_name}</div>
        </div>`
    } else {
        tgInfo.innerHTML = '<div class="profile-info">Загрузка</div>'
    }
}

function renderAssignments(data) {
    const userInfo = document.querySelector('.assignments-info')
    if (data == null) {
        userInfo.innerHTML = `Список пуст!`
    } else {

        data.sort((a,b) => {
            let aa = new Date(a.time_start)
            let bb = new Date(b.time_start)

            return bb - aa
        })

        for (let i = 0; i < data.length; i++) {
            console.log(data[i])
            userInfo.innerHTML += `
            <div class="assignment">
                <p class="formula">Задача: ${data[i].formula}</p>
                <p class="grade">Статус: ${data[i].grade === 1.0 ? "решена верно" : "не выполнена"}</p>
                <p>Число попыток: ${data[i].attempts}</p>
                <p>Дата и время: ${new Date(data[i].time_start).toLocaleString()}</p>
            </div>`
        }
    }
}