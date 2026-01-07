import { MapPin, Coffee, Music, BookOpen, Camera } from 'lucide-react';

export default function NearbyActivity() {
  const activities = [
    { icon: <Coffee className="w-6 h-6" />, title: "Coffee Meetups", location: "Downtown", count: "12 active" },
    { icon: <Music className="w-6 h-6" />, title: "Live Music", location: "Arts District", count: "8 active" },
    { icon: <BookOpen className="w-6 h-6" />, title: "Book Clubs", location: "Library Square", count: "5 active" },
    { icon: <Camera className="w-6 h-6" />, title: "Photo Walks", location: "City Park", count: "15 active" }
  ];

  return (
    <section className="w-full px-6 md:px-12 py-24 md:py-32 bg-[#f6f6f4]">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-black tracking-tight mb-2">Nearby Activity</h2>
            <p className="text-gray-600">See what's happening around you right now</p>
          </div>
          <a href="#" className="text-gray-600 hover:text-black transition-colors font-medium text-[15px] flex items-center gap-2 group">
            View all 
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="group bg-white rounded-3xl p-6 border border-gray-100 hover:border-[#EBF934]/50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-700 mb-5 group-hover:bg-gradient-to-br group-hover:from-[#EBF934] group-hover:to-[#EBF934] group-hover:text-black transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-sm">
                {activity.icon}
              </div>
              
              <h3 className="text-lg font-semibold text-black mb-2 leading-tight">{activity.title}</h3>
              <p className="text-gray-500 text-sm mb-4 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {activity.location}
              </p>
              <p className="text-[#FFE500] font-semibold text-[15px] flex items-center gap-2">
                <span className="w-2 h-2 bg-[#90EE90] rounded-full animate-pulse"></span>
                {activity.count}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
