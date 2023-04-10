import "./../css/NavBar.css";
const NavFooter = () => {
  return (
    <nav className="navBarFooter">
      <div className="nav-wrapper green">
        <a href="" className="brand-logo center">
          Logo
        </a>
        <ul id="nav-mobile" className="left hide-on-med-and-down">
          <li>
            <a href="https://1.bp.blogspot.com/-TRfhT8aMxyk/T36E-uhnnkI/AAAAAAAAAoE/68aQMtq04vs/s1600/Funny+Dog-09.jpg">
              Dogs2Door
            </a>
          </li>
          <li>
            <a href="https://www.dumpaday.com/wp-content/uploads/2013/03/funny-horse.jpg">
              Horses2Home
            </a>
          </li>
          <li>
            <a href="https://images.saymedia-content.com/.image/t_share/MTc2NDU0MDMxNTg4MjcyMDkw/types-of-hamsters-breeds.jpg">
              Hamsters2Home
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
export default NavFooter;
