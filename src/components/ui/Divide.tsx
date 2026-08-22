import type React from "react";
import { cn } from "../../lib/util";

export default function Divide({children,className}:{children:React.ReactNode;className?:string}) {
  return (
    <div className={cn(`m-0.5 border border-black/60 rounded-sm`,className)}>
      {children}
    </div>
  )
}
