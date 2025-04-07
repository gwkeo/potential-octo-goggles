export function getUserData() {
    const tg = window?.Telegram?.WebApp
    let userInfo = tg.initDataUnsafe?.user || {
        id: 0,
        photo_url: "https://i.pinimg.com/736x/a8/77/39/a877397cabf3ea3c10c880912b2fc1f3.jpg",
        first_name: "dasha"
    }
    return userInfo
}