
const Navbar = () => {
    return (
        <nav>
        <div className="valign-wrapper pink">
          <a href="" className="brand-logo center">Cats 4 You</a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><a href="">Home</a></li>
            <li><a href="">Contact</a></li>
            <li><a href="">About</a></li>
          </ul>
          
          <a className="btn blue"><i className="material-icons right">shopping_cart</i>button</a>

            <span className="new badge blue">0</span>
        </div>
      </nav>

    

    );
}
export default Navbar;
