export default function Vibes() {
  const vibes = [
    "Coffee & Chat ☕", "Workout Buddy 💪", "Study Session 📚", "Night Out 🌙",
    "Brunch Crew 🥞", "Dog Walking 🐕", "Gaming 🎮", "Art & Culture 🎨",
    "Foodie Adventures 🍜", "Hiking 🥾", "Music Lovers 🎵", "Chill Vibes ✨"
  ];

  return (
    <section className="w-full px-6 md:px-12 py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-black tracking-tight">
            Browse connections by vibe
          </h2>
          <p className="text-lg text-gray-600">Find people who match your energy and interests</p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          {vibes.map((vibe, index) => (
            <button
              key={index}
              className="px-6 py-3 bg-gradient-to-r from-gray-50 to-white hover:from-[#EBF934] hover:to-[#EBF934] text-gray-700 hover:text-black rounded-full font-medium transition-all duration-300 border border-gray-200 hover:border-[#FFE500] hover:shadow-lg hover:scale-105 text-[15px]"
            >
              {vibe}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
