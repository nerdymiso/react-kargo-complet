function Services({ items }) {
  return (
    <section style={{ textAlign: "center", padding: "20px" }}>
      <h2>Nos Services</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {items.map((service, index) => (
          <li
            key={index}
            style={{
              background: "#f5f5f5",
              margin: "10px auto",
              padding: "10px",
              borderRadius: "8px",
              width: "200px",
            }}
          >
            {service}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Services;
