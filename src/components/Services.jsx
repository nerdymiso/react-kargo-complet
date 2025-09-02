function Services({ items }) {
  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">Nos Services</h2>
      <div className="flex flex-wrap justify-center gap-6">
        {items.map((service, index) => (
          <div
            key={index}
            className="bg-blue-500 text-white shadow-xl rounded-xl p-6 w-60 text-center transform transition duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <p className="text-lg font-semibold">{service}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Services;
