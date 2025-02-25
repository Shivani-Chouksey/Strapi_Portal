import Contact from "@/components/pages/Contact";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Contact Page | Strapi Portal",
  description: "This is Contact Page in Strapi Portal",
  // other metadata
};

const ContactPage = () => {
  return (
    <main>
      <Contact />
    </main>
  );
};

export default ContactPage;
