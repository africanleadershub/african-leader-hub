import Link from "next/link";
import { Mail, Phone, Handshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getWebsiteSettings, publicContact } from "@/lib/content";

const callToActionBackground = {
  background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)), url(/background-pattern-3.jpg)",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
};

export async function InvolvementContact() {
  const contact = publicContact(await getWebsiteSettings());

  return (
    <section className="bg-[#8B4513] py-16 text-white" style={callToActionBackground}>
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold md:text-4xl">Have questions?</h2>
        <p className="mx-auto mt-4 mb-8 max-w-2xl text-xl text-gray-200">
          Get in touch with us to learn more about how you can get involved.
        </p>
        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <Mail className="mx-auto mb-4 h-10 w-10" />
            <h3 className="mb-2 text-xl font-semibold">Email us</h3>
            <a href={contact.mailHref} className="text-gray-200 hover:text-white">
              {contact.email}
            </a>
          </div>
          <div>
            <Phone className="mx-auto mb-4 h-10 w-10" />
            <h3 className="mb-2 text-xl font-semibold">Call us</h3>
            <a href={contact.telHref} className="text-gray-200 hover:text-white">
              {contact.phone}
            </a>
          </div>
          <div>
            <Handshake className="mx-auto mb-4 h-10 w-10" />
            <h3 className="mb-2 text-xl font-semibold">Visit us</h3>
            <p className="text-gray-200">{contact.location}</p>
          </div>
        </div>
        <Button asChild size="lg" className="rounded-full bg-white text-[#8B4513] hover:bg-gray-100">
          <Link href="/contact">Contact us</Link>
        </Button>
      </div>
    </section>
  );
}
