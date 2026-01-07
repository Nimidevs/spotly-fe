import { Home, MessageSquare, User, Settings, Zap, ZapOff, Bell } from "lucide-react";
import { useState } from "react";

export default function UtilityRail() {
  const [isAvailable, setIsAvailable] = useState(true);
  const [hasNotifications, setHasNotifications] = useState(true);

  return (
    // <div className="w-16 bg-[#111111] border-r border-[#1a1a1a] flex flex-col items-center py-4 gap-6 flex-shrink-0">
    //   {/* Logo / Home */}
    //   <button
    //     className="w-10 h-10 rounded-xl bg-[#EBF934] flex items-center justify-center hover:bg-[#FFD000] transition-colors group relative"
    //     title="Home"
    //   >
    //     <span className="text-black font-bold text-lg">s</span>
    //     <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
    //       Home
    //     </span>
    //   </button>

    //   {/* Availability Toggle */}
    //   <button
    //     onClick={() => setIsAvailable(!isAvailable)}
    //     className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-[#1a1a1a] transition-colors group relative"
    //     title={isAvailable ? "Go offline" : "Go online"}
    //   >
    //     <Circle
    //       className={`w-5 h-5 ${
    //         isAvailable ? "text-[#4ade80] fill-[#4ade80]" : "text-gray-500"
    //       }`}
    //     />
    //     <span className="absolute left-full ml-2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
    //       {isAvailable ? "Online" : "Offline"}
    //     </span>
    //   </button>

    //   {/* Notifications */}
    //   <button
    //     className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-[#1a1a1a] transition-colors group relative"
    //     title="Notifications"
    //   >
    //     <div className="relative">
    //       <Bell className="w-5 h-5 text-gray-400" />
    //       {hasNotifications && (
    //         <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#EBF934] rounded-full border-2 border-[#111111]" />
    //       )}
    //     </div>
    //     <span className="absolute left-full ml-2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
    //       Notifications
    //     </span>
    //   </button>

    //   {/* Spacer */}
    //   <div className="flex-1" />

    //   {/* Profile / Settings */}
    //   <button
    //     className="w-10 h-10 rounded-xl bg-[#1a1a1a] flex items-center justify-center hover:bg-[#222222] transition-colors group relative"
    //     title="Profile"
    //   >
    //     <User className="w-5 h-5 text-gray-400" />
    //     <span className="absolute left-full ml-2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
    //       Profile
    //     </span>
    //   </button>
    // </div>


    <nav className="flex w-16 flex-col items-center border-r border-border/40 bg-card py-6 dark">
    {/* App Logo */}
    <div className="mb-8 flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
      <span className="text-xl font-bold">S</span>
    </div>

    <div className="flex flex-1 flex-col gap-6">
      <RailItem icon={Home} active tooltip="Home" />

      {/* Availability Toggle */}
      <button
        onClick={() => setIsAvailable(!isAvailable)}
        className={`group relative flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 ${
            isAvailable ? "bg-green-500/10 text-green-500" : "bg-muted text-muted-foreground"
          }`}
      >
        {isAvailable ? <Zap size={20} fill="currentColor" /> : <ZapOff size={20} />}
        <span className="absolute left-14 hidden bg-popover px-3 py-1.5 rounded-md text-sm whitespace-nowrap z-50 group-hover:block border border-border">
          {isAvailable ? "Visible" : "Invisible"}
        </span>
      </button>

      <RailItem icon={MessageSquare} count={3} tooltip="Messages" />
      <RailItem icon={User} tooltip="Profile" />
    </div>

    <div className="mt-auto">
      <RailItem icon={Settings} tooltip="Settings" />
    </div>
  </nav>
  );
}

function RailItem({ icon: Icon, active, count, tooltip }: { icon: React.ElementType; active?: boolean; count?: number; tooltip?: string }) {
    return (
        <button
        className={`group relative flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-200 hover:bg-accent hover:text-accent-foreground ${
          active ? "bg-accent text-accent-foreground" : "text-muted-foreground"
        }`}
        >
          <Icon size={20} strokeWidth={active ? 2.5 : 2} />
          {count && <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-primary ring-2 ring-card" />}
          <div className="absolute left-14 hidden bg-popover px-3 py-1.5 rounded-md text-sm whitespace-nowrap z-50 group-hover:block border border-border" > {tooltip} </div>
        </button>
    )
  }

// function RailItem({ icon: Icon, active, count }: { icon: any; active?: boolean; count?: number }) {
//     return (
//       <button
//         className={cn(
//           "group relative flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-200 hover:bg-accent hover:text-accent-foreground",
//           active ? "bg-accent text-accent-foreground" : "text-muted-foreground",
//         )}
//       >
//         <Icon size={20} strokeWidth={active ? 2.5 : 2} />
//         {count && <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-primary ring-2 ring-card" />}
//         <div className="absolute left-14 hidden h-2 w-2 rotate-45 bg-popover group-hover:block" />
//       </button>
//     )
//   }

