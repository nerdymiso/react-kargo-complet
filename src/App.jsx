/**import Header from "./components/Header";
import Services from "./components/Services";

function App() {
  const servicesList = ["Transport", "Livraison", "Suivi en temps réel"];

  return (
    <div>
      <Header title="Kargo Website" slogan="Ta marchandise, notre mission" />
      <Services items={servicesList} />
    </div>
  );
}

export default App;**/
function App() {
  return (
    <div className="text-center text-orange-500 text-4xl mt-10">
      Tailwind is working!
    </div>
  );
}

export default App;
