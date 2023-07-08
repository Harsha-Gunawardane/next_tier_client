import React from 'react'
import { Link } from 'react-router-dom'

function Landing() {
  return (
    <section className="landing">
            <header>
                <h1>Next Tier</h1>
            </header>
            <main>
                <p>Hey there !!!</p>
            </main>
            <footer>
                <br />
                <Link to="/login">Employee Login</Link>
                <br />
                <br />
                <Link to="/register">Employee Register</Link>
            </footer>
        </section>
  )
}

export default Landing