import { cn } from "../../lib/util";

export default function CompDiv({children,className}:{children:React.ReactNode;className?:string}) {
  return (
    <div className={cn(`mx-3`,className)}>
      {children}
    </div>
  )
}
