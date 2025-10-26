

const ServiceHighlights = ({ FEATURES }) => (
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
