export async function getUsersAssignments(user_id) {
    try {
        const response = await fetch(`/api/assignments/?user_id=${user_id}`, {
            headers: {
            'Accept': 'application/json' // Явно указываем ожидаемый формат
            }
        });
    
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const data = await response.json();
        return data;
      
    } catch (error) {
        console.error('Error fetching assignments:', error);
        return `error fetching assignments: ${error}`;
    }
}

export async function getTask() {
    try {
        const response = await fetch(`/api/math/task`)
        return await response.json()
    } catch (e) {
        return `error: ${e}`
    }
}

export async function sendSolution(solution) {
    const requestBody = JSON.stringify(solution, null, 2)

    try {
        const response = await fetch( `/api/assignments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: requestBody
        })
        const result = await response.json()
        console.log("done: ", result)
    } catch (e) {
        console.error("error: ", e)
        return `error: ${e}`
    }

}