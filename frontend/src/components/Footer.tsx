import { Instagram, Github, Linkedin } from "lucide-react";
import { Button } from "./ui/button";

function Footer() {
  return (
    <footer
      id="footer"
      className="bg-stone-900 text-white py-16"
      aria-label="Site footer"
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Branding & Social */}
          <section aria-label="Brand description and social links">
            <div className="text-2xl font-bold mb-4">
              <span className="text-primary">Makeyourportfolio</span>
            </div>
            <p className="text-stone-300 mb-4">
              Build, customize, and share your professional portfolio online —
              no coding required.
            </p>
            <div
              className="flex flex-wrap gap-4"
              aria-label="Social media links"
            >
              <a
                href="https://www.instagram.com/modern_makeover_studio1/"
                className="text-stone-300 hover:text-primary transition-colors flex gap-1 items-center"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram size={20} /> Instagram
              </a>
              <a
                href="https://github.com/arslaan7861"
                className="text-stone-300 hover:text-primary transition-colors flex gap-1 items-center"
                aria-label="GitHub"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={20} /> GitHub
              </a>
              <a
                href="https://linkedin.com"
                className="text-stone-300 hover:text-primary transition-colors flex gap-1 items-center"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin size={20} /> LinkedIn
              </a>
            </div>
          </section>

          {/* Features */}
          <section aria-labelledby="footer-features">
            <h4 id="footer-features" className="text-lg font-semibold mb-4">
              Features
            </h4>
            <ul className="space-y-2 text-stone-300">
              {[
                "Customizable Templates",
                "Drag & Drop Editor",
                "Resume Integration",
                "Live Preview",
              ].map((feature) => (
                <li key={feature}>
                  <a
                    href="#"
                    className="hover:text-primary transition-colors duration-300"
                    aria-label={feature}
                  >
                    {feature}
                  </a>
                </li>
              ))}
            </ul>
          </section>

          {/* Resources */}
          <section aria-labelledby="footer-resources">
            <h4 id="footer-resources" className="text-lg font-semibold mb-4">
              Resources
            </h4>
            <ul className="space-y-2 text-stone-300">
              {["Documentation", "Pricing Plans", "FAQs", "Support"].map(
                (resource) => (
                  <li key={resource}>
                    <a
                      href="#"
                      className="hover:text-primary transition-colors duration-300"
                      aria-label={resource}
                    >
                      {resource}
                    </a>
                  </li>
                )
              )}
            </ul>
          </section>

          {/* Contact */}
          <section aria-labelledby="footer-contact">
            <h4 id="footer-contact" className="text-lg font-semibold mb-4">
              Contact Us
            </h4>
            <address className="not-italic space-y-2 text-stone-300">
              <p>Najibabad, Uttar Pradesh, India</p>
              <div className="flex flex-col items-start gap-1">
                <Button
                  variant="ghost"
                  asChild
                  className="px-0 hover:bg-transparent hover:text-primary"
                >
                  <a href="tel:+918699062901">+91 86990 62901</a>
                </Button>
                <Button
                  variant="ghost"
                  asChild
                  className="px-0 hover:bg-transparent hover:text-primary"
                >
                  <a href="mailto:makeyourportfolio@email.com">
                    makeyourportfolio@email.com
                  </a>
                </Button>
              </div>
            </address>
          </section>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-stone-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-stone-400 text-sm">
              © {new Date().getFullYear()} Makeyourportfolio. All rights
              reserved.
            </p>
            <nav
              className="flex space-x-6 mt-4 md:mt-0"
              aria-label="Legal navigation"
            >
              {["Privacy Policy", "Terms of Use", "Cookie Policy"].map(
                (policy) => (
                  <a
                    key={policy}
                    href="#"
                    className="text-stone-400 hover:text-primary text-sm transition-colors"
                    aria-label={policy}
                  >
                    {policy}
                  </a>
                )
              )}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
