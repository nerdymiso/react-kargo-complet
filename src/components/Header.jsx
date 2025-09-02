import logo from "../assets/logo.png";

function Header({ title, slogan }) {
  return (
    <header className="text-center py-12 bg-gradient-to-r from-blue-400 to-indigo-500 text-white">
      <img
        src={logo}
        alt="Kargo Logo"
        className="mx-auto w-32 h-32 object-contain transition-transform duration-500 hover:rotate-6"
      />
      <h1 className="text-4xl font-bold mt-6">{title}</h1>
      <p className="text-lg mt-2 opacity-90">{slogan}</p>
    </header>
  );
}

export default Header;
