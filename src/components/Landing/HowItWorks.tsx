
export default function HowItWorks() {
 
  interface Step {
    icon: string;
    title: string;
    description: string;
  }

  const steps: Step[] = [
    {
      icon: "📍",
      title: "Turn on your location",
      description: "See people around you instantly.",
    },
    {
      icon: "✨",
      title: "Select your intention",
      description: "Friendship, casual hangout, conversation, etc.",
    },
    {
      icon: "💬",
      title: "Match & Chat",
      description: "Message people nearby who want to talk or meet.",
    },
    {
      icon: "🛡️",
      title: "Meet safely",
      description: "Built-in safety tools and optional verification.",
    },
  ];

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-black mb-4">How it works</h2>
        <p className="text-gray-600 mb-12 text-lg">
          Get connected in 4 simple steps
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-md transition"
            >
              <div className="text-4xl mb-4">{step.icon}</div>
              <h3 className="font-semibold text-lg text-black mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
