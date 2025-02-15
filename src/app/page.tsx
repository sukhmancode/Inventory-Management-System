import { BackgroundPaths } from "./Components/Hero";
import { Navbar } from "./Components/Navbar";
import { Pricing } from "./Components/Pricing";
import { Testimonials } from "./Components/Testimonials";


export default function Home() {
  return (
    <div className="bg-gradient-to-b from-white to-black/20 dark:bg-neutral-950">
      <Navbar/>
      <BackgroundPaths/>
      <Testimonials/>
      <Pricing/>
    </div>
  );
}
