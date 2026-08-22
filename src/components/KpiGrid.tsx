import { Activity, AlertTriangle, CheckCircle2, Truck } from "lucide-react";
import type { Shipment } from "../types/shipment";
import Divide from "./ui/Divide";
import CompDiv from "./ui/CompDiv";

interface KpiGridProps{
    shipments:Shipment[];
}

export const KpiGrid:React.FC<KpiGridProps>=({shipments})=>{
    const activeCount=shipments.filter(s=>s.status==='In Transit').length;
    const delayedCount=shipments.filter(s=>s.status==='Delayed').length;
    const criticalCount=shipments.filter(s=>s.status==='Critical').length;
    const deliveredCount=shipments.filter(s=>s.status==='Delivered').length;

    const onTimeRate=((deliveredCount/(shipments.length || 1))*100).toFixed(1);

    return(
        <Divide>
            <div className="grid grid-cols-2   md:grid-cols-4 w-full bg-white items-center justify-between">
                    <CompDiv className="flex mx-1 items-center justify-center gap-2 border border-black/60 p-1 rounded-sm">
                        <div>
                            <AlertTriangle className="text-red-500" width={30} height={30}/> 
                        </div>
                        <div className="flex flex-col">
                            <p className="font-semibold text-sm"> Delayed/Critical</p>
                            <h3 className="font-black">{delayedCount+criticalCount} <span className="font-light pl-1">Need Action</span></h3>
                        </div>
                    </CompDiv>
                    <CompDiv className="flex mx-1 my-1 items-center justify-center gap-2 border border-black/60 p-1 rounded-sm">
                        <div>
                            <Truck className="text-blue-500" width={30} height={30}/> 
                        </div>
                        <div className="flex flex-col">
                            <p className="font-semibold text-sm">Active Shipment</p>
                            <h3 className="font-black">{activeCount}<span className="font-light pl-1">In route</span></h3>
                        </div>
                    </CompDiv>
                    <CompDiv className="flex mx-1 items-center justify-center gap-2 border border-black/60 p-1 rounded-sm">
                        <div>
                            <CheckCircle2 className="text-emerald-500" width={30} height={30}/> 
                        </div>
                        <div className="flex flex-col">
                            <p className="font-semibold text-sm">On Time Delivered</p>
                            <h3 className="font-black">{onTimeRate}%</h3>
                        </div>
                    </CompDiv>
                    <CompDiv className="flex mx-1 items-center justify-center gap-2 border border-black/60 p-1 rounded-sm">
                        <div>
                            <Activity width={30} height={30}/> 
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