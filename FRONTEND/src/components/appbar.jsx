import '../App.css'

export default function AppBar () {

    return (
        <div>
            <nav className="app-bar">
                <div className="logo">
                    <img src='../public/logo.png' alt="Your Logo" />
                </div>
                <div>
                    <a className='HelpButton' href="">Help</a>
                </div>
            </nav>
        </div>
    );
}