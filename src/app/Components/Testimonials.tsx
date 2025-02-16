"use client"
import { motion } from "framer-motion";

const testimonials = [
  {
    
    text: "As a seasoned designer always on the lookout for innovative tools, Framer.com instantly grabbed my attention.",
    name: "Jamie Rivera",
    username: "@jamietechguru00",
  },
  { 
    text: "Our team's productivity has skyrocketed since we started using this tool.",  // Adjusted path
    name: "Josh Smith",
    username: "@jjsmith",
  },
  {
    text: "This app has completely transformed how I manage my projects and deadlines.",  // Adjusted path
    name: "Morgan Lee",
    username: "@morganleewhiz",
  },
  {
    text: "I was amazed at how quickly we were able to integrate this app into our workflow.",  // Adjusted path
    name: "Casey Jordan",
    username: "@caseyj",
  },
  {
    text: "Planning and executing events has never been easier. This app helps me keep track of all the moving parts, ensuring nothing slips through the cracks.",  // Adjusted path
    name: "Taylor Kim",
    username: "@taylorkimm",
  },
  {
    text: "The customizability and integration capabilities of this app are top-notch.",  // Adjusted path
    name: "Riley Smith",
    username: "@rileysmith1",
  },
  {
    text: "Adopting this app for our team has streamlined our project management and improved communication across the board.",  // Adjusted path
    name: "Jordan Patels",
    username: "@jpatelsdesign",
  },
  {
    text: "With this app, we can easily assign tasks, track progress, and manage documents all in one place.",  // Adjusted path
    name: "Sam Dawson",
    username: "@dawsontechtips",
  },
  {
    text: "Its user-friendly interface and robust features support our diverse needs.",  // Adjusted path
    name: "Casey Harper",
    username: "@casey09",
  },
];

const TestimonialsComponent =(props: {className?:string;testimonials:typeof testimonials}) => (
    <div className={props.className}>

  <motion.div 
  
  className=" flex flex-col gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] ">
    {[...new Array(1)].fill(0).map((_) => (
        <>
 {
    props.testimonials.map((testimonial,idx) => (
      <div key={idx} className="p-10 justify-center flex flex-col gap-6 mt-5  bg-black border rounded-3xl shadow-[0_7px_14px_#EAEAEA text-white" >
        <div>{testimonial.text}</div>
        <div className="flex gap-4 mt-2 mb-2">
          <div className="text-white">
            <div >{testimonial.name}</div>
            <div>{testimonial.username}</div>
          </div>
        </div>

      </div>
    ))
  }
        </>
    ))}
 
</motion.div>
        
</div>
)

export const Testimonials = () => {
  const firstColumn = testimonials.slice(0,3);
  const secondColumn = testimonials.slice(3,6);
  const thirdColumn = testimonials.slice(6,9);
  return (
    <section className=" p-10 flex justify-center">
    <div className="container flex justify-center flex-col">
      <div className="text-sm inline-flex border border-[#222]/10 px-3 py-1 rounded-lg tracking-tight max-w-fit self-center">Testimonials</div>
       <h1 className="text-3xl  md:text-6xl text-center font-bold tracking-tighter  bg-gradient-to-r from-neutral-900 to-neutral-700/80  text-transparent bg-clip-text">What our users say</h1>
        <p className="text-xl text-center  text-[#010D3E] m-2 tracking-tight">From intuitive design to powerful features, our app has become an essential tool for users around the world.  </p>

        <div className="flex justify-center gap-6">
          <TestimonialsComponent testimonials={firstColumn} />
          <TestimonialsComponent testimonials={secondColumn} className="hidden md:block" />
          <TestimonialsComponent testimonials={thirdColumn} className="hidden lg:block" />
        </div>
    </div>
    </section>
  );
};
