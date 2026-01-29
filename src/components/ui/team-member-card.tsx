import * as React from "react";
import { cn } from "@/lib/utils";
import { Mail } from "lucide-react";

interface TeamMemberCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl: string;
  name: string;
  position: string;
  email: string;
  campus?: string;
  themeColor?: string;
  size?: "lg" | "md" | "sm";
}

const TeamMemberCard = React.forwardRef<HTMLDivElement, TeamMemberCardProps>(
  (
    {
      className,
      imageUrl,
      name,
      position,
      email,
      campus,
      themeColor = "0 68% 42%",
      size = "md",
      ...props
    },
    ref,
  ) => {
    const [showEmail, setShowEmail] = React.useState(false);

    const sizeClasses = {
      lg: "h-[400px] sm:h-[450px]",
      md: "h-[350px] sm:h-[400px]",
      sm: "h-[300px] sm:h-[350px]",
    };

    return (
      <div
        ref={ref}
        style={
          {
            "--theme-color": themeColor,
          } as React.CSSProperties
        }
        className={cn("group w-full", sizeClasses[size], className)}
        {...props}
      >
        <div
          className="relative flex flex-col w-full h-full rounded-2xl overflow-hidden shadow-lg 
                     transition-all duration-500 ease-in-out 
                     group-hover:scale-105 group-hover:shadow-[0_0_60px_-15px_hsl(var(--theme-color)/0.6)]"
          style={{
            boxShadow: `0 0 40px -15px hsl(var(--theme-color) / 0.5)`,
            backgroundColor: "#1a1a1a",
          }}
        >
          {/* Image Section - 70% height */}
          <div className="relative h-[70%] overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center 
                         transition-transform duration-500 ease-in-out group-hover:scale-110"
              style={{ backgroundImage: `url(${imageUrl})` }}
            />
          </div>

          {/* Content Section - 30% height */}
          <div className="flex flex-col justify-between h-[30%] p-3 sm:p-4 bg-gradient-to-b from-[#1a1a1a] to-[#0f0f0f]">
            <div>
              <h3 className="text-base sm:text-lg font-bold tracking-tight text-white mb-1 leading-tight">
                {name}
              </h3>
            </div>

            {/* Position and Email Icon Row */}
            <div className="flex items-end justify-between gap-2">
              <p className="text-xs sm:text-sm text-white/80 font-medium flex-1 leading-snug">
                {position}
              </p>

              {/* Gmail Icon with Hover Tooltip */}
              <a
                href={`mailto:${email}`}
                className="relative group/email flex-shrink-0 self-end"
                onMouseEnter={() => setShowEmail(true)}
                onMouseLeave={() => setShowEmail(false)}
                onTouchStart={() => setShowEmail(true)}
                onTouchEnd={() => setTimeout(() => setShowEmail(false), 2000)}
                onClick={(e) => e.stopPropagation()}
              >
                <div
                  className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 border border-white/20
                             transition-all duration-300 hover:bg-white/20 hover:border-white/40 hover:scale-110"
                >
                  <Mail className="h-4 w-4 text-white" />
                </div>

                {/* Email Tooltip */}
                {showEmail && (
                  <div
                    className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-black/95 backdrop-blur-md 
                               border border-white/20 rounded-lg text-xs text-white
                               animate-in fade-in slide-in-from-bottom-2 duration-200 z-[100]
                               max-w-[200px] sm:max-w-none break-all sm:whitespace-nowrap"
                    style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.5)" }}
                  >
                    {email}
                    <div className="absolute top-full right-4 w-2 h-2 bg-black/95 border-r border-b border-white/20 transform rotate-45 -mt-1" />
                  </div>
                )}
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  },
);
TeamMemberCard.displayName = "TeamMemberCard";

export { TeamMemberCard };
