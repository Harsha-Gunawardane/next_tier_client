import useAuth from '../../hooks/useAuth'
import { Link } from 'react-router-dom'

const StudentDashboard = () => {

    const { username} = useAuth()

    const date = new Date()
    const today = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(date)

    const content = (
        <section className="studentStudentDashboard">

            <p>{today}</p>

            <h1>StudentDashboard {username}!</h1>
            {/* <Link to='/stu/profile'>Go to Profile</Link> */}
            <Link to='/employees'>Go to Employees</Link>

        </section>
    )
    return content
}
export default StudentDashboard