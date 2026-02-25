import "../assets/Styles/footer.css"
export default function Footer(){
    return(
        <section className="footer">
            <footer className="footer">
  <div className="footer-container">
    
    <div className="footer-section">
      <h2 className="logo">Fly<span>Drones</span></h2>
      <p>
        Premium drones and accessories built for performance,
        adventure, and cinematic excellence.
      </p>
    </div>

    <div className="footer-section">
      <h3>Shop</h3>
      <ul>
        <li><a href="/drones">Drones</a></li>
        <li><a href="/accessories">Accessories</a></li>
        <li><a href="/deals">Deals</a></li>
        <li><a href="/new">New Arrivals</a></li>
      </ul>
    </div>

    <div className="footer-section">
      <h3>Support</h3>
      <ul>
        <li><a href="/contact">Contact Us</a></li>
        <li><a href="/shipping">Shipping Info</a></li>
        <li><a href="/returns">Returns</a></li>
        <li><a href="/faq">FAQ</a></li>
      </ul>
    </div>

    <div className="footer-section">
      <h3>Follow Us</h3>
      <div className="socials">
        <a href="#">Instagram</a>
        <a href="#">Facebook</a>
        <a href="#">YouTube</a>
      </div>
    </div>

  </div>

  <div className="footer-bottom">
    <p>© 2026 FlyDrones. All rights reserved.</p>
  </div>
</footer>
        </section>
    )
}