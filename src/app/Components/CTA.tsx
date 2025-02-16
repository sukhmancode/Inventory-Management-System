import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


  export const CallToAction = () => {
    return (
      <section className="flex justify-cente">
       <div className="container p-4 md:flex items-center justify-center">
          <div className="md:w-[678px]">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter bg-gradient-to-b from-black to-[#001E80] text-transparent bg-clip-text mt-6 text-center">Sign up for free today</h1>
            <p className="text-xl text-[#010D3E] tracking-tight mt-6 text-center">Celebrate the joy of accomplishment with an app designed to track your progress and motivate your efforts.</p>
            <div className="flex gap-1 items-center mt-8 justify-center">
              <div className="flex items-center gap-4 flex-col">
                <Input placeholder="Enter your email" className="w-[500px] border-black"/>
                <Button>Submit</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  };
  