import { Truck, Inbox, Clock } from "lucide-react";

const defaultIcons = [Truck, Inbox, Clock];

function Services({ items = [] }) {
  // Normalise: "Transport" -> { name: "Transport" }
  const normalized = items.map((it, idx) =>
    typeof it === "string" ? { name: it, icon: defaultIcons[idx] } : it
  );

  return (
    <section className="py-12 text-center">
      <h2 className="text-3xl font-semibold mb-8">Nos Services</h2>
      <div className="flex flex-wrap justify-center gap-6">
        {normalized.map((service, index) => {
          const Icon = service.icon || defaultIcons[index % defaultIcons.length];
          return (
            <div
              key={index}
              className="bg-kargo-white shadow-lg rounded-lg p-6 w-60 hover:scale-105 transition-transform duration-300"
            >
              {Icon && <Icon className="h-8 w-8 text-kargo-orange mx-auto mb-3" />}
              <p className="text-kargo-blue font-medium text-lg">
                {service.name}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Services;
