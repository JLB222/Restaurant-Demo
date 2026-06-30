import { siteConfig } from "../../config/site"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"

function Footer(props) {
    return (
        <div className="footerComponent">
            <section className="contact">
                <div className="contact-info">
                    <h3>Contact Us</h3>
                    <p>{siteConfig.address1}</p>
                    <p>{siteConfig.address2}</p>
                    <p><a href={`tel:${siteConfig.phone}`}>{siteConfig.phone}</a></p>
                    <p><a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></p>
                </div>
                <div className="socials">
                    <h3>Social Media</h3>
                    <ul>
                        <li>
                            <a href="http://www.facebook.com"><img src="null" alt="facebook icon"/></a>
                        </li>
                        <li>
                            <a href="http://www.x.com"><img src="null" alt="twitter icon"/></a>
                        </li>
                        <li>
                            <a href="http://www.bluesky.com"><img src="null" alt="bluesky icon"/></a>
                        </li>
                        <li>
                            <a href="http://www.instagram.com"><img src="null" alt="instagram icon"/></a>
                        </li>
                        <li>
                            <a href="http://www.snapchat.com"><img src="null" alt="snapchat icon"/></a>
                        </li>
                    </ul>
                </div>
                <footer>
                    <p className="copyright">&copy; 2026 {siteConfig.name}.  All Rights Reserved</p>
                </footer>
            </section>
        </div>
    )
}


export default Footer