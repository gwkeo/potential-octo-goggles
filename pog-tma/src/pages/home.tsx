import { A } from "@solidjs/router"

function Home() {
    const getTask = async () => {
        const res = await fetch("http://localhost:8080/math/task")
        return res.json()
    }

    return (
        <>
            <h1>aa</h1>
            <A href="/profile">Profile</A>
            <button onclick={async () => console.log(await getTask())}>fafaf</button>
        </>
    )
}

export default Home