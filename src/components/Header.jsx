import logo from "../assets/logo.png";

function Header({ title, slogan }) {
  return (
    <header style={{ textAlign: "center", padding: "20px" }}>
      <img src={logo} alt="Kargo Logo" width="120" />
      <h1>{title}</h1>
      <p>{slogan}</p>
    </header>
  );
}

export default Header;
