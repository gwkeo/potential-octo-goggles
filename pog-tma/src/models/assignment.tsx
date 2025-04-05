import { Solution } from "./taskFields"

export interface Assignment {
    ID: number
    UserID: number | undefined
    formula: string
    solution: Solution
    grade: number | null
    attempts: number
    time_start: Date
    time_end: Date
}