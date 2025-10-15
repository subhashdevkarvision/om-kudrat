import { Package, Truck, MessagesSquare, CreditCard } from "lucide-react";

const FEATURES = [
  {
    icon: <Package className="text-text-green" size={30} />,
    title: "Free Shipping",
    subtitle: "Free Shipping for order over $130.",
  },
  {
    icon: <Truck className="text-text-green" size={30} />,
    title: "Returns",
    subtitle: "Within 30 days for an exchanges.",
  },
  {
    icon: <MessagesSquare className="text-text-green" size={30} />,
    title: "Online Support",
    subtitle: "24 Hours a day, 7 Days a week",
  },
  {
    icon: <CreditCard className="text-text-green" size={30} />,
    title: "Flexible Payment",
    subtitle: "Pay with Multiple Credit cards",
  },
];

const ServiceHighlights = () => (
  <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
    {FEATURES.map((feature, idx) => (
      <div
        key={idx}
        className="flex flex-col justify-center text-center items-center bg-[#EFEFEF] px-10 py-8 rounded-3xl "
      >
        <div>{feature.icon}</div>
        <div className="mt-3.5 font-belfast text-lg">{feature.title}</div>
        <div className="mt-1.5 text-Black-Olive font-poppins text-sm">
          {feature.subtitle}
        </div>
      </div>
    ))}
  </div>
);

export default ServiceHighlights;
