import { siteConfig } from "../../config/site"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"

function Header(props) {
    return (
        <div className="headerComponent">
            <h1>Welcome to {siteConfig.name}!</h1>
            <header>
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/menu">Menu</Link></li>
                    </ul>
                </nav>  
            </header>
        </div>

    )
}

export default Header