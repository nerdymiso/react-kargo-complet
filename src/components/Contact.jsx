import { Mail, Facebook, Instagram, Linkedin } from "lucide-react";

function Contact() {
  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-4">Contactez-nous</h2>
      <p className="mb-6 text-gray-700">
        Email : <a href="mailto:contact@kargo.com" className="text-[#F97316]">contact@kargo.com</a>
      </p>
      <div className="flex justify-center gap-6">
        <a href="#" className="text-gray-600 hover:text-[#F97316] transition">
          <Facebook size={28} />
        </a>
        <a href="#" className="text-gray-600 hover:text-[#F97316] transition">
          <Instagram size={28} />
        </a>
        <a href="#" className="text-gray-600 hover:text-[#F97316] transition">
          <Linkedin size={28} />
        </a>
        <a href="mailto:contact@kargo.com" className="text-gray-600 hover:text-[#F97316] transition">
          <Mail size={28} />
        </a>
      </div>
    </div>
  );
}

export default Contact;
