export function getUserData() {
    const tg = window?.Telegram?.WebApp
    let userInfo = tg.initDataUnsafe.user || {
        id: 0,
        photo_url: "https://i.pinimg.com/736x/a8/77/39/a877397cabf3ea3c10c880912b2fc1f3.jpg",
        first_name: "dasha"
    }
    return userInfo
}

export function setProfileMenuButton() {
    const tg = window?.Telegram?.WebApp
    if (!tg) {
        console.error("Telegram WebApp is not available.")
        return null
    } else {
        let mainButton = tg.MainButton
        mainButton.text = 'Начать тест'
        mainButton.show()
    
        return mainButton
    }
}

export function setTestingMenuButtons() {
    const tg = window?.Telegram?.WebApp
    if (!tg) {
        console.error("Telegram WebApp is not available.")
        return null
    } else {
        let mainButton = tg.MainButton
        mainButton.text = 'Отправить'
        mainButton.show()
    
        let secondaryButton = tg.SecondaryButton
        secondaryButton.text = 'Назад'
        secondaryButton.show()
    
        return {mainButton, secondaryButton}
    }
}
