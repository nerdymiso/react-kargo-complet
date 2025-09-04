import logo from "../assets/logo.png";

function Header({ title, slogan }) {
  return (
    <header className="bg-kargo-blue text-kargo-white text-center py-12">
      <img src={logo} 
      alt="Kargo Logo" 
        //className="mx-auto w-32 h-32 object-contain transition-transform duration-500 hover:rotate-6"      
      className="mx-auto w-32 mb-4 rounded-full shadow-lg" />
      <h1 className="text-4xl font-bold mb-2">{title}</h1>
      <p className="text-lg">{slogan}</p>
    </header>
  );
}

export default Header;


      