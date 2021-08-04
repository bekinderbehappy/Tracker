import './styles/Home.css'
import Summary from './Summary'
import NewRecord from './NewRecord'


export default function Home() {
    return (
        <div className="Home">
            <div className="home_box">
                <Summary />
            </div>
            <div className="home_box">
                <NewRecord />
            </div>
        </div>
    );
}