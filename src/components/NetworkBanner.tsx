import { Wifi, WifiOff } from "lucide-react"
import { useEffect, useState } from "react"

export const NetworkBanner:React.FC=()=>{
    const [isOnline, setOnline]=useState<boolean>(navigator.onLine)
    const [showAlert,setShowAlert]=useState<boolean>(!navigator.onLine)

    useEffect(()=>{
        const handleonline=()=>{
            setOnline(true);
            setShowAlert(true);
            setTimeout(()=>setShowAlert(false),4000)
        };
        
        const handleoffline=()=>{
            setOnline(false);
            setShowAlert(true)
        };

        window.addEventListener('online',handleonline)
        window.addEventListener('offline',handleoffline)

        return ()=>{
            window.removeEventListener('online',handleonline)
            window.removeEventListener('offline',handleoffline)
        };
    },[])

    if (!showAlert) return null;
    return(
            <div className={`px-4 py-2.5 text-xs font-medium flex items-center justify-center gap-2 transition-colors ${isOnline ? 'bg-emerald-500/20 text-emerald-400 border-b border-emerald-500/30' : 'bg-red-500/20 text-red-400 border-b border-red-500/30 animate-pulse'}`}>
                {isOnline ? (
                    <>
                    <Wifi className="w-4 h-4" />
                    <span>Network connection restored. Syncing cached local operations...</span>
                    </>
                ) : (
                    <>
                    <WifiOff className="w-4 h-4" />
                    <span>Offline Mode Active — Network connection dropped. Changes are stored safely in local state.</span>
                    </>
                )}
            </div>
    )
}