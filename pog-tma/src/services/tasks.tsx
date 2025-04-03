import { API_BASE_URL } from "../utils/config"
import { Task } from "../models/task"

export async function fetchTask() : Promise<Task> {
    const response = await fetch(API_BASE_URL + "/math/task")
    if (!response.ok) {
        throw new Error(`failed to fetch task`)
    }
    const data : Task = await response.json()
    return data
}

export async function sendTask(task: Task) {
    const response = await fetch(API_BASE_URL + "/math/task", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(task)
    })
    if (!response.ok) {
        throw new Error(`failed to send task`)
    }
    const data = await response.json()
    return data
}