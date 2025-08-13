import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      console.log("scrolling");

      setIsScrolled(window.scrollY > window.innerHeight / 3);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "text-gray-700 bg-background py-4 border-b shadow-sm"
            : "bg-gradient-to-b from-black/30 via-black/10 to-black/0 py-6"
        }`}
        aria-label="Main navigation"
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link
            to="/"
            className={`text-2xl font-bold ${
              isScrolled ? "text-black" : "text-white"
            }`}
            aria-label="Chandigarh Decor Homepage"
          >
            Portfolio<span className="text-primary">CMS</span>
          </Link>

          <Button
            className="bg-primary hover:bg-primary/90 text-white px-8 py-3 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl group"
            aria-label="Book a consultation"
          >
            <Link to={"/portfolio/edit/new"}>Get started</Link>
          </Button>
        </div>
      </nav>
    </header>
  );
}

export default Header;
