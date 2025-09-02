function Services({ items }) {
  return (
    <section className="py-12 bg-white">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Nos Services</h2>
      <div className="flex flex-wrap justify-center gap-6">
        {items.map((service, index) => (
          <div
            key={index}
            className="bg-blue-50 shadow-lg rounded-xl p-6 w-60 text-center transform transition duration-300 hover:scale-105"
          >
            <p className="text-lg font-semibold text-gray-700">{service}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Services;
