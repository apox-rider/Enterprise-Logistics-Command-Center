import { Moon, Sun } from "lucide-react"
import Divide from "./ui/Divide"

interface HeaderProps{
    theme:'dark'|'light'
    onchangeTheme:()=>void
}

export const Header:React.FC<HeaderProps>=({theme,onchangeTheme})=>{
    const isLight= theme==='light'
    return(
        <Divide className={`border-none ${isLight?' bg-black/10':'bg-black/90 text-white'}`}>
            <div className={`flex flex-col  transition-colors md:flex-row w-full justify-between px-5 gap-4  py-2 `}>
                <div className="flex items-center justify-center w-auto gap-3">
                    <div className="flex flex-col w-full items-center md:items-start justify-center md:justify-baseline tracking-widest md:tracking-normal">
                        <h1 className="font-black">KIBO LOGISTICS CONTROL</h1>
                        <p className="font-light ">Fleet Tracking Manager</p>
                    </div>
                </div>
                <div className="flex w-auto justify-between gap-4 border-t-2 md:border-none items-center">
                    <div className="flex flex-col">
                        <h1>Connectivity</h1>
                        <p className={`${isLight?'text-emerald-600':'text-emerald-500'}`}>Active</p>
                    </div>
                    <div className="flex flex-col">
                        <h1>Time</h1>
                        <p className={`${isLight?'text-blue-600':'text-blue-500'}`}>EAT(UTC)</p>
                    </div>
                <button
                onClick={onchangeTheme}
                className={`p-2 rounded-4xl   transition-colors flex items-center justify-center ${isLight ? 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-white':'bg-black/90 text-amber-400 hover:bg-black/60'}`}
                title="Toggle Theme"
                >
                {isLight ?  <Moon className="w-4 h-4" />: <Sun className="w-4 h-4" />}
                </button>
                </div>
            </div>
        </Divide>
    )
}