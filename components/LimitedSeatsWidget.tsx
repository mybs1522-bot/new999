import React from 'react';

interface LimitedSeatsWidgetProps {
  isActive?: boolean;
  isCheckoutMode?: boolean;
}

export const LimitedSeatsWidget: React.FC<LimitedSeatsWidgetProps> = ({ isActive = false, isCheckoutMode = false }) => {
  return (
    <div className="flex flex-col items-center gap-3 bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-2xl p-4 md:p-5 shadow-2xl my-2 w-full max-w-sm mx-auto relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex items-center justify-between w-full text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-[0.2em] relative z-10">
        <span>Limited Mentors</span>
        <span>Limited Students</span>
      </div>
      
      <div className="grid grid-cols-10 gap-1.5 sm:gap-2 justify-center relative z-10 w-fit mx-auto">
        {Array.from({ length: 20 }).map((_, i) => {
          let seatClass = "";
          let isSeatBooked = i < 16;
          let isUserSeat = i === 16;
          
          if (isSeatBooked) {
            seatClass = "bg-red-500/20 border-red-500/50 shadow-[inset_0_1px_2px_rgba(239,68,68,0.2)] text-red-500/50";
          } else if (isUserSeat) {
            if (isActive) {
              seatClass = "bg-green-500 border-green-400 shadow-[0_0_15px_rgba(34,197,94,0.6),inset_0_1px_2px_rgba(255,255,255,0.4)] text-white";
            } else if (isCheckoutMode) {
              seatClass = "bg-green-500/80 border-green-400 animate-pulse shadow-[0_0_15px_rgba(34,197,94,0.6),inset_0_1px_2px_rgba(255,255,255,0.4)] text-white";
            } else {
              seatClass = "bg-blue-500/80 border-blue-400 animate-pulse shadow-[0_0_15px_rgba(59,130,246,0.6),inset_0_1px_2px_rgba(255,255,255,0.4)] text-white";
            }
          } else {
            seatClass = "bg-gray-800/50 border-gray-700 shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)] text-gray-600";
          }

          return (
            <div
              key={i}
              className={`w-6 h-6 sm:w-7 sm:h-7 rounded-md border ${seatClass} transition-all duration-500 relative group flex items-center justify-center text-[9px] sm:text-[10px] font-bold`}
              title={isSeatBooked ? "Seat booked" : isUserSeat ? "Your seat" : "Available seat"}
            >
              {/* Premium Armrests detailing */}
              <div className="absolute left-[1px] right-[1px] top-[1px] bottom-[2px] bg-gradient-to-b from-white/10 to-transparent rounded-[2px] pointer-events-none"></div>
              <div className="absolute bottom-[1px] left-[1px] right-[1px] h-[2px] bg-black/40 rounded-b-[2px] pointer-events-none"></div>
              
              {/* Seat Number */}
              <span className="relative z-10 font-mono tracking-tighter">{i + 1}</span>
            </div>
          );
        })}
      </div>
      
      <div className="text-xs md:text-sm font-bold text-gray-200 text-center mt-2 flex items-center justify-center gap-2 bg-white/5 py-1.5 px-4 rounded-full border border-white/5 relative z-10">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
        </span>
        Limited Seats: Only 4 seats left!
      </div>
    </div>
  );
};
