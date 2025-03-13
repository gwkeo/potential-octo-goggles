import { A } from "@solidjs/router"

function Home() {

    return (
        <>
            <h1>Home</h1>
            <A href="/profile">Profile</A>
        </>
    )
}

export default Home