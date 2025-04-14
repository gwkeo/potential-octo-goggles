export async function getUsersAssignments(user_id) {
    try {
        const response = await fetch(`/api/assignments/?user_id=${user_id}`, {
            headers: {
            'Accept': 'application/json'
            }
        });
    
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const data = await response.json();
        return data;
      
    } catch (error) {
        console.error('Error fetching assignments:', error);
        return null;
    }
}

export async function getTask() {
    try {
        const response = await fetch(`/api/math/task`)
        return await response.json()
    } catch (e) {
        return null
    }
}

export async function sendSolution(solution) {
    const requestBody = JSON.stringify(solution)

    try {
        const response = await fetch( `/api/assignments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: requestBody
        })
        const result = await response.json()
        return result
    } catch (e) {
        return `error: ${e}`
    }

}