import logo from "../assets/logo.png";

function Header({ title, slogan }) {
  return (
    <header className="text-center py-12 bg-blue-50">
      <img
        src={logo}
        alt="Kargo Logo"
        className="mx-auto w-32 h-32 object-contain transition-transform duration-300 hover:scale-110"
      />
      <h1 className="text-4xl font-bold mt-6 text-gray-800">{title}</h1>
      <p className="text-lg text-gray-600 mt-2">{slogan}</p>
    </header>
  );
}

export default Header;
