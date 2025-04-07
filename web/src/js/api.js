export async function getUsersAssignments(user_id) {
    try {
        const response = await fetch(`http://localhost:8080/assignments/?user_id=${user_id}`, {
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
    const response = await fetch('http://localhost:8080/math/task')
    return await response.json()
}