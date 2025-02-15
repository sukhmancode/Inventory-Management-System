import { Button } from "@/components/ui/button";
import { BotIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";

const pricingTiers = [
  {
    title: "Free",
    monthlyPrice: 0,
    buttonText: "Get started for free",
    popular: false,
    inverse: false,
    features: [
      "Up to 5 project members",
      "Unlimited tasks and projects",
      "2GB storage",
      "Integrations",
      "Basic support",
    ],
  },
  {
    title: "Pro",
    monthlyPrice: 9,
    buttonText: "Sign up now",
    popular: true,
    inverse: true,
    features: [
      "Up to 50 project members",
      "Unlimited tasks and projects",
      "50GB storage",
      "Integrations",
      "Priority support",
      "Advanced support",
      "Export support",
    ],
  },
  {
    title: "Business",
    monthlyPrice: 19,
    buttonText: "Sign up now",
    popular: false,
    inverse: false,
    features: [
      "Up to 5 project members",
      "Unlimited tasks and projects",
      "200GB storage",
      "Integrations",
      "Dedicated account manager",
      "Custom fields",
      "Advanced analytics",
      "Export capabilities",
      "API access",
      "Advanced security features",
    ],
  },
];

export const Pricing = () => {
  return (
    <section className="px-5 flex justify-center items-center min-h-scree">
      <div className="container py-24 text-center">
      <h1 className="text-3xl  md:text-6xl text-center font-bold tracking-tighter  bg-gradient-to-r from-neutral-900 to-neutral-700/80  text-transparent bg-clip-text">Pricing</h1>
        <p className="text-xl text-[#010D3E] m-4 tracking-tight">
          Free forever. Upgrade for unlimited tasks, better security, and exclusive features.
        </p>

        <div className="flex flex-col md:flex-row gap-8 max-w-screen-xl mx-auto justify-center items-center">
          {pricingTiers.map(({ title, monthlyPrice, buttonText, popular, inverse, features }) => (
            <div
              key={title}
              className={twMerge(
                "p-10 justify-center lg:w-[400px] border border-[#F1F1F1] rounded-3xl shadow-[0_7px_14px_#EAEAEA]",
                inverse && 'border-black bg-black text-white'
              )}
            >
              <div className="flex justify-between">
                <h3 className={twMerge("text-lg font-bold text-black/50", inverse && 'text-white/60')}>
                  {title}
                </h3>
                {popular && (
                  <div className="inline-flex text-sm px-4 py-1.5 rounded-xl border border-white/20">
                    <span className="bg-[linear-gradient(to_right,#DD7DDF,#E1CD86,#BBCB92,#71C2EF,#3BFFFF,#DD7DDF)] text-transparent bg-clip-text font-medium">
                      Popular
                    </span>
                  </div>
                )}
              </div>
              <div className="flex items-baseline gap-1 mt-8">
                <span className="text-4xl font-bold tracking-tighter leading-none">${monthlyPrice}</span>
                <span className="tracking-tight font-bold text-black/50">/month</span>
              </div>
              <Button
                className={twMerge("btn btn-primary w-full mt-8", inverse && 'text-black bg-white')}
              >
                {buttonText}
              </Button>
              <ul className="mt-8">
                {features.map((fr, idx) => (
                  <div key={idx} className="flex gap-4 mt-4">
                    <BotIcon/>
                    <li className="text-sm">{fr}</li>
                  </div>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
