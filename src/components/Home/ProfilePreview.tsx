import { X, MessageCircle, MapPin, Compass } from "lucide-react";
import placeholder from "../../assets/placeholder.svg";

interface ProfilePreviewProps {
  user: {
    id: string;
    name: string;
    distance: number;
    intent: string[];
    bio: string;
    isOnline: boolean;
  };
  onClose: () => void;
}

export default function ProfilePreview({ user, onClose }: ProfilePreviewProps) {
  return (
    // <div className="absolute bottom-0 left-0 right-0 bg-[#1a1a1a] border-t border-[#2a2a2a] rounded-t-2xl shadow-2xl z-30 animate-slide-up">
    //   <div className="p-6">
    //     {/* Header */}
    //     <div className="flex items-start justify-between mb-4">
    //       <div className="flex items-center gap-4">
    //         <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#EBF934] to-[#90EE90] flex items-center justify-center">
    //           <span className="text-black font-bold text-xl">{user.name[0]}</span>
    //         </div>
    //         <div>
    //           <div className="flex items-center gap-2">
    //             <h2 className="text-white font-semibold text-lg">{user.name}</h2>
    //             {user.isOnline && (
    //               <div className="w-2 h-2 bg-[#4ade80] rounded-full" />
    //             )}
    //           </div>
    //           <div className="flex items-center gap-1 text-gray-400 text-sm mt-1">
    //             <MapPin className="w-4 h-4" />
    //             <span>{user.distance} km away</span>
    //           </div>
    //         </div>
    //       </div>
    //       <button
    //         onClick={onClose}
    //         className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[#2a2a2a] transition-colors"
    //       >
    //         <X className="w-5 h-5 text-gray-400" />
    //       </button>
    //     </div>

    //     {/* Intent Badges */}
    //     <div className="flex flex-wrap gap-2 mb-4">
    //       {user.intent.map((intent, idx) => (
    //         <span
    //           key={idx}
    //           className="px-3 py-1 rounded-full bg-[#2a2a2a] text-gray-300 text-sm"
    //         >
    //           {intent}
    //         </span>
    //       ))}
    //     </div>

    //     {/* Bio */}
    //     <p className="text-gray-300 text-sm leading-relaxed mb-6">{user.bio}</p>

    //     {/* Action Button */}
    //     <button className="w-full px-6 py-3 bg-[#EBF934] text-black font-semibold rounded-xl hover:bg-[#FFD000] transition-colors flex items-center justify-center gap-2">
    //       <MessageCircle className="w-5 h-5" />
    //       Start Conversation
    //     </button>
    //   </div>
    // </div>

    <div className="absolute inset-0 z-50 flex items-end justify-center pointer-events-none p-6 md:justify-end md:items-start">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-card/95 p-6 shadow-2xl backdrop-blur-xl pointer-events-auto animate-in slide-in-from-bottom-8 md:slide-in-from-right-8 duration-300">
        <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
          <X size={20} />
        </button>

        <div className="flex items-start gap-4 mb-6">
          <div className="h-20 w-20 rounded-2xl overflow-hidden border-2 border-primary/20">
            <img
              src={placeholder}
              alt="Profile"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="pt-2">
            <h3 className="text-2xl font-bold tracking-tight">Alex Rivers</h3>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin size={12} className="text-primary" />
              <span>Upper West Side • 0.4mi</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Intent</span>
            <div className="mt-1 flex gap-2">
              <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs text-primary font-medium">
                Coffee Chat
              </span>
              <span className="px-3 py-1 rounded-full bg-accent text-xs font-medium">Remote Work</span>
            </div>
          </div>

          <div>
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Bio</span>
            <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
              Product designer living in NYC. Love talking about design systems, local art galleries, and finding the
              best espresso in Manhattan.
            </p>
          </div>

          <div className="pt-4 flex gap-3">
            <button className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-primary py-3 font-semibold text-primary-foreground transition-transform hover:scale-[1.02] active:scale-[0.98]">
              <MessageCircle size={18} />
              Message
            </button>
            <button className="w-12 flex items-center justify-center rounded-xl bg-muted text-foreground hover:bg-accent transition-colors">
              <Compass size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

