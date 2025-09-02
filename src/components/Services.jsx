import { FaTruck, FaBoxOpen, FaClock } from "react-icons/fa";

const serviceIcons = [FaTruck, FaBoxOpen, FaClock];

function Services({ items }) {
  return (
    <section className="py-16 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Nos Services</h2>
      <div className="flex flex-wrap justify-center gap-8">
        {items.map((service, index) => {
          const Icon = serviceIcons[index];
          return (
            <div
              key={index}
              className="bg-white shadow-lg rounded-xl p-8 w-64 text-center transform transition duration-500 hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-r hover:from-blue-400 hover:to-indigo-500 hover:text-white"
            >
              <Icon className="text-4xl mb-4 mx-auto" />
              <p className="text-lg font-semibold">{service}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Services;
