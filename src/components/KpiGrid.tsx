import { Activity, AlertTriangle, CheckCircle2, Truck } from "lucide-react";
import type { Shipment } from "../types/shipment";
import Divide from "./ui/Divide";
import CompDiv from "./ui/CompDiv";

interface KpiGridProps{
    shipments:Shipment[];
    theme:'light'|'dark';
}

export const KpiGrid:React.FC<KpiGridProps>=({shipments,theme})=>{
    const activeCount=shipments.filter(s=>s.status==='In Transit').length;
    const delayedCount=shipments.filter(s=>s.status==='Delayed').length;
    const criticalCount=shipments.filter(s=>s.status==='Critical').length;
    const deliveredCount=shipments.filter(s=>s.status==='Delivered').length;

    const onTimeRate=((deliveredCount/(shipments.length || 1))*100).toFixed(1);

    const isLight=theme==='light'

    return(
        <Divide className={`border-none ${isLight?' bg-black/10':'bg-black/10 rounded-sm'}`}>
            <div className={`grid grid-cols-2   md:grid-cols-4 w-full  items-center justify-between pb-1 md:pb-0`}>
                    <CompDiv className={`flex mx-1 items-center justify-center gap-2  p-1 rounded-sm ${isLight? ' bg-white':'bg-black/70 text-white'}`}>
                        <div>
                            <AlertTriangle className={`transition-colors ${isLight?'text-red-500':'text-red-300'}`} width={30} height={30}/> 
                        </div>
                        <div className="flex flex-col">
                            <p className="font-semibold text-sm"> Delayed/Critical</p>
                            <h3 className="font-black">{delayedCount+criticalCount} <span className="font-light pl-1">Need Action</span></h3>
                        </div>
                    </CompDiv>
                    <CompDiv className={`flex mx-1 my-1 items-center justify-center gap-2  p-1 rounded-sm ${isLight? ' bg-white':'bg-black/70 text-white'}`}>
                        <div>
                            <Truck className={`transition-colors ${isLight?'text-blue-500':'text-blue-300'}`} width={30} height={30}/> 
                        </div>
                        <div className="flex flex-col">
                            <p className="font-semibold text-sm">Active Shipment</p>
                            <h3 className="font-black">{activeCount}<span className="font-light pl-1">In route</span></h3>
                        </div>
                    </CompDiv>
                    <CompDiv className={`flex mx-1 items-center justify-center gap-2  p-1 rounded-sm ${isLight? ' bg-white':'bg-black/70 text-white'}`}>
                        <div>
                            <CheckCircle2 className={`transition-colors ${isLight?'text-emerald-500':'text-emerald-300'}`} width={30} height={30}/> 
                        </div>
                        <div className="flex flex-col">
                            <p className="font-semibold text-sm">On Time Delivered</p>
                            <h3 className="font-black">{onTimeRate}%</h3>
                        </div>
                    </CompDiv>
                    <CompDiv className={`flex mx-1 items-center justify-center gap-2  p-1 rounded-sm ${isLight? 'bg-white':'bg-black/70 text-white'}`}>
                        <div>
                            <Activity className={`transition-colors ${isLight?'text-black':'text-white'}`} width={30} height={30}/> 
                        </div>
                        <div className="flex flex-col">
                            <p className="font-semibold text-sm">Total Fleet</p>
                            <h3 className="font-black">{shipments.length}<span className="font-light pl-1">Units</span></h3>
                        </div>
                    </CompDiv>
            </div>
        </Divide>
    )
}