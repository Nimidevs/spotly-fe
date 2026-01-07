export default function Safety() {
  // const safetyFeatures = [
  //   {
  //     icon: "✓",
  //     title: "ID Verification",
  //     description: "All users verify their identity through our secure verification system. We use advanced AI to detect fake profiles and ensure everyone is who they say they are.",
  //     tags: ["Required", "AI-Powered", "Instant"]
  //   },
  //   {
  //     icon: "🛡️",
  //     title: "Smart Safety Tools",
  //     description: "Share your live location with trusted contacts, set up safety check-ins, and access 24/7 emergency support whenever you need it.",
  //     tags: ["Location Sharing", "Check-ins", "24/7 Support"]
  //   },
  //   {
  //     icon: "👥",
  //     title: "Community Moderation",
  //     description: "Our active community and AI moderators work together to keep the platform safe, friendly, and welcoming for everyone.",
  //     tags: ["Human + AI", "Real-time", "Report System"]
  //   }
  // ];
  interface SafetyFeature {
  id: number
  title: string
  description: string
  icon: string
}

const features: SafetyFeature[] = [
  {
    id: 1,
    title: "Verified profiles",
    description: "All users can verify their identity with optional ID verification for added confidence.",
    icon: "✓",
  },
  {
    id: 2,
    title: "Meetup safety tools",
    description: "Share your location with trusted contacts and get safety tips before meeting anyone new.",
    icon: "🛡️",
  },
  {
    id: 3,
    title: "Block & report instantly",
    description: "Flag inappropriate behavior and block users with one tap. Our team reviews every report.",
    icon: "⚠️",
  },
]

  return (
    // <section className="w-full px-6 md:px-12 py-24 md:py-32 bg-gradient-to-b from-gray-50/50 to-white">
    //   <div className="max-w-7xl mx-auto">
    //     <div className="flex items-center justify-between mb-12">
    //       <div>
    //         <h2 className="text-4xl md:text-5xl font-bold text-black tracking-tight mb-2">Safety & Verification</h2>
    //         <p className="text-gray-600">Your safety is our top priority</p>
    //       </div>
    //       <a href="#" className="text-gray-600 hover:text-black transition-colors font-medium text-[15px] flex items-center gap-2 group">
    //         Learn more 
    //         <span className="group-hover:translate-x-1 transition-transform">→</span>
    //       </a>
    //     </div>

    //     <div className="space-y-6">
    //       {safetyFeatures.map((feature, index) => (
    //         <div
    //           key={index}
    //           className="group bg-white rounded-3xl p-8 border border-gray-100 hover:border-[#90EE90]/50 transition-all duration-500 hover:shadow-2xl flex flex-col md:flex-row gap-6"
    //         >
    //           <div className="shrink-0">
    //             <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 group-hover:from-green-100 group-hover:to-green-200 flex items-center justify-center text-3xl font-bold transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-lg">
    //               {feature.icon}
    //             </div>
    //           </div>
              
    //           <div className="flex-1">
    //             <h3 className="text-2xl font-semibold text-black mb-3 leading-tight">{feature.title}</h3>
    //             <p className="text-gray-600 leading-relaxed mb-5 text-[15px]">{feature.description}</p>
    //             <div className="flex flex-wrap gap-2">
    //               {feature.tags.map((tag, tagIndex) => (
    //                 <span
    //                   key={tagIndex}
    //                   className="px-4 py-2 bg-gradient-to-r from-gray-50 to-white text-gray-700 rounded-full text-sm font-medium border border-gray-200 hover:border-green-200 hover:bg-green-50/50 transition-colors"
    //                 >
    //                   {tag}
    //                 </span>
    //               ))}
    //             </div>
    //           </div>
    //         </div>
    //       ))}
    //     </div>
    //   </div>
    // </section>

    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-black mb-4">Safety & verification</h2>
        <p className="text-gray-600 mb-12 text-lg">Your safety is our top priority</p>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.id} className="bg-white rounded-2xl p-8 border border-gray-100">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-black mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
