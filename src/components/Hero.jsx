import { Truck, ArrowRight, Inbox, Clock } from "lucide-react";
import Services from "./Services";

function Hero() {
  return (
    <div>
      {/* Section Hero */}
      <section className="bg-[#0a1d40] text-white h-[60vh] md:h-[50vh] flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-5xl font-bold mb-4">Simplifiez votre transport</h1>

        <p className="text-xl mb-6 max-w-2xl">
          La solution moderne pour vos livraisons et suivis en temps réel
        </p>

        <button className="bg-[#F97316] px-6 py-3 rounded-full font-semibold hover:bg-orange-600 transition flex items-center gap-2 mx-auto">
          <Truck size={20} />
          Démarrer Maintenant
          <ArrowRight size={18} />
        </button>
      </section>

      {/* Section Services */}
      <Services
        items={[
          { name: "Transport rapide", icon: Truck },
          { name: "Gestion de colis", icon: Inbox },
          { name: "Suivi en temps réel", icon: Clock },
        ]}
      />
    </div>
  );
}

export default Hero;
