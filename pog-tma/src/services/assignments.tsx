import { API_BASE_URL } from "../utils/config";

export async function fetchAssignmentsByUserID(userID: number) {
    const response = await fetch(API_BASE_URL + `/assignments/?user_id=${userID}`)
    if (!response.ok) {
        throw new Error('failed to fetch user assignments')
    }
    return response.json()
}