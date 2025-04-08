import { Assignment } from "../models/assignment";
import { Solution } from "../models/taskFields";
import { API_BASE_URL } from "../utils/config";

export async function fetchAssignmentsByUserID(userID: number) : Promise<Assignment[]> {
    const response = await fetch(API_BASE_URL + `/assignments/?user_id=${userID}`)
    if (!response.ok) {
        throw new Error('failed to fetch user assignments')
    }
    let result : Assignment[] = await response.json()
    return result
}

export async function sendAssignment(assignment: Assignment) {
    const response = await fetch(API_BASE_URL + '/assignments/', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(assignment)
    })
    if (!response.ok) {
        throw new Error('failed to send assignment')
    }
    const data = await response.json()
    return data
}