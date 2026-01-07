import { MapPin, Sparkles, Zap } from 'lucide-react';

export default function Hero() {
  return (
  <section className="w-full px-6 md:px-12 py-20 md:py-32 bg-[#f7f7f5]">
    <div className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left Side */}
        <div className="space-y-8 md:space-y-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#EBF934]/10 to-[#90EE90]/10 border border-[#FFE500]/20 rounded-full">
            <Sparkles className="w-4 h-4 text-[#FFD000]" />
            <span className="text-sm font-medium text-gray-700">Join 50,000+ active members</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-black leading-[1.05] tracking-tight">
            Find people around you who want to{' '}
            <span className="bg-gradient-to-r from-[#EBF934] via-[#A3B6BE] to-[#87CEEB] bg-clip-text text-transparent">
              connect
            </span>
            .
          </h1>
          
          <p className="text-lg md:text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-xl">
            Meet nearby people instantly. Chat, link up, or just talk when you feel lonely.
          </p>
          
          <div className="pt-4">
            <div className="flex flex-col sm:flex-row gap-3 max-w-xl">
              <input
                type="email"
                placeholder="Enter your email..."
                className="flex-1 px-5 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FFE500] focus:border-transparent text-gray-900 placeholder:text-gray-400 bg-white shadow-sm transition-all duration-200 hover:border-gray-300"
              />
              <button className="bg-[#EBF934] hover:from-[#FFD000] hover:to-[#FFC000] text-black font-semibold px-8 py-4 rounded-xl transition-all duration-300 whitespace-nowrap shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2">
                Start Matching
                <Zap className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-3 ml-1">No credit card required • Free forever</p>
          </div>
        </div>

        {/* Right Side - Hero Visual */}
        <div className="relative mt-8 md:mt-0">
          <div className="absolute -inset-4 bg-gradient-to-r from-[#EBF934] via-[#90EE90] to-[#87CEEB] rounded-3xl blur-2xl opacity-20 animate-pulse"></div>
          
          <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#EBF934] via-[#90EE90] to-[#87CEEB] p-1">
            <div className="bg-white rounded-[20px] p-16 h-[520px] flex items-center justify-center relative overflow-hidden">
              {/* Animated gradient orbs */}
              <div className="absolute top-8 right-8 w-32 h-32 bg-gradient-to-br from-[#EBF934]/30 to-transparent rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-8 left-8 w-40 h-40 bg-gradient-to-br from-[#90EE90]/30 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-br from-[#87CEEB]/20 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
              
              <div className="text-center space-y-6 relative z-10">
                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-[#EBF934] via-[#90EE90] to-[#87CEEB] rounded-full flex items-center justify-center shadow-2xl animate-bounce" style={{ animationDuration: '3s' }}>
                  <MapPin className="w-16 h-16 text-white" strokeWidth={2.5} />
                </div>
                <div className="space-y-2">
                  <p className="text-gray-400 font-medium text-sm uppercase tracking-wider">Your Connection Awaits</p>
                  <div className="flex items-center justify-center gap-2 text-gray-600">
                    <div className="flex -space-x-2">
                      {[1, 2, 3, 4].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-[#EBF934] to-[#90EE90] border-2 border-white"></div>
                      ))}
                    </div>
                    <span className="text-sm font-semibold">+127 online now</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  </section>

  // <section className="pt-32 pb-20 px-6 bg-white">
  //     <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
  //       {/* Left Content */}
  //       <div className="space-y-6">
  //         <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight text-black">
  //           Find people around you who want to connect.
  //         </h1>
  //         <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
  //           Meet nearby people instantly. Chat, link up, or just talk when you feel lonely.
  //         </p>

  //         {/* CTA Buttons */}
  //         <div className="flex flex-col sm:flex-row gap-4 pt-6">
  //           <button className="px-8 py-3 bg-lime-400 text-black font-semibold rounded-full hover:bg-lime-300 transition w-full sm:w-auto">
  //             Start Matching
  //           </button>
  //           <button className="px-8 py-3 border border-gray-300 text-black font-semibold rounded-full hover:bg-gray-50 transition w-full sm:w-auto">
  //             Join the Waitlist
  //           </button>
  //         </div>
  //       </div>

  //       {/* Right Image Placeholder */}
  //       <div className="bg-gradient-to-br from-lime-200 via-cyan-100 to-blue-200 rounded-2xl aspect-square flex items-center justify-center">
  //         <div className="text-center">
  //           <div className="w-32 h-32 bg-white rounded-full mx-auto opacity-50 flex items-center justify-center">
  //             <span className="text-gray-400 text-2xl">👥</span>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </section>
  );
}
