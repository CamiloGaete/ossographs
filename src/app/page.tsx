import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import Products from "@/components/Products";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import About from "@/components/About";
import Reviews from "@/components/Reviews";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { useCartStore } from "@/store/cart";

export default function Home() {
  const cartCount = useCartStore((s) =>
    s.items.reduce((a, i) => a + i.quantity, 0)
  );
  const setCartOpen = useCartStore((s) => s.setCartOpen);

  return (
    <>
      <Navbar cartCount={cartCount} onCartClick={() => setCartOpen(true)} />
      <main>
        <Hero />
        <Categories />
        <Products />
        <Services />
        <Portfolio />
        <About />
        <Reviews />
        <Contact />
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}
