import type React from "react";
import {AlertCircle, ArrowRight, CheckCircle2, ChevronRight, Clock, Phone, Truck, User} from 'lucide-react'
import type { Shipment } from "../types/shipment";
import Divide from "./ui/Divide";

interface ShipmentTableProps{
    shipments: Shipment[];
    onSelectShipment:(shipment:Shipment)=>void;
    theme:'light'|'dark'
}
export const ShipmentTable:React.FC<ShipmentTableProps>=({shipments,onSelectShipment,theme})=> {

    const isLight=theme==='light'

    const getStatusBadge=(status:Shipment['status'])=>{
        switch(status){
            case 'Critical':
                return(
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-sm  bg-red-500/10 ${isLight?'text-red-700 font-semibold':'text-red-500'} border border-red-500/20 `}>
                        <AlertCircle className="w-4 h-4 animate-pulse"/> <p>Critical</p>
                    </span>
                );
            case 'Delayed':
                return(
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-sm bg-amber-500/10 ${isLight?'text-amber-700 font-semibold':'text-amber-500'} border border-amber-500/20`}>
                        <Clock className="w-4 h-4 "/> Delayed
                    </span>
                );
            case 'In Transit':
                return(
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-sm  bg-blue-500/10 ${isLight?'text-blue-700 font-semibold':'text-blue-500'} border border-blue-500/20`}>
                        <Truck className="w-4 h-4 "/> In Transit
                    </span>
                );
            case 'Delivered':
                return(
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-sm  bg-emerald-500/10 ${isLight?'text-emerald-700 font-semibold':'text-emerald-500 '} border border-emerald-500/20`}>
                        <CheckCircle2 className="w-4 h-4 "/> Delivered
                    </span>
                );
        }
    };
  return (
    <Divide >
        <div className="overflow-x-auto w-full">
            <table className={`w-full   whitespace-nowrap  ${isLight?'bg-white text-black':'bg-black text-white'} rounded-sm  p-2`}>
                <thead className="border-b">
                    <tr className="text-lg font-semibold p-2  mx-1 uppercase tracking-wider text-left w-fit">
                        <th className="pl-2  px-4">Tracking ID</th>
                        <th className="px-4">Driver</th>
                        <th className="px-4">Route(Origin/Destination)</th>
                        <th className="px-4">Cargo Type</th>
                        <th className="px-4">Fuel</th>
                        <th className="px-4 hidden md:inline-flex">Status</th>
                        <th className="pr-2 px-4 ">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-slate-400/20">
                    {shipments.length===0? (
                        <tr>
                            <td colSpan={7}>
                                <div className={`flex font-black w-full justify-center items-center min-h-96 ${isLight?'bg-white':'bg-black'}`}>
                                    No shipment found matching your Search or Filter Criteria in any route
                                </div>
                            </td>
                        </tr>
                    ):(
                        shipments.slice(0,25).map((shipment)=>(
                            <tr 
                            key={shipment.id}
                            onClick={()=>onSelectShipment(shipment)}
                            className="hover:bg-slate-500/15 text-left transition-colors cursor-pointer group items-center justify-between border border-b-slate-400/20"
                            >
                                <td className="flex pl-2 px-4 gap-2 p-1 items-center">
                                    <p>{shipment.trackingNumber}</p>
                                    <p className="inline-flex md:hidden">{getStatusBadge(shipment.status)}</p>
                                </td>
                                <td className="flex-wrap px-4">
                                    <p className="flex items-center gap-1 font-bold"><User size={15}/> {shipment.driver.name}</p>
                                    <p className="flex items-center gap-1"><Phone size={15}/> {shipment.driver.phone}</p>
                                </td>
                                <td className="flex relative items-center w-full px-4 justify-between">
                                    <p className="md:w-1/3">{shipment.origin}</p>
                                    <ArrowRight className="md:w-1/3" width={20} height={20}/>
                                    <p className="md:w-1/3">{shipment.destination}</p>
                                </td>
                                <td className="px-4">
                                    {shipment.cargoType}
                                </td>
                                <td className="px-4">
                                    {shipment.fuelLevel}%
                                </td>
                                <td className="px-4 hidden md:inline-flex  items-center">
                                    {getStatusBadge(shipment.status)}
                                </td>
                                <td className="pr-2 px-4 text-right">
                                    <button className="inline-flex text-sm font-medium items-center transition-colors border p-2 rounded-sm">
                                        Inspect <ChevronRight className="w-3 h-3"/>
                                    </button>
                                </td>
                            </tr>
                        ))
                    )
                }
                </tbody>
            </table>
        </div>
        <div className="flex justify-between p-2 w-full items-center ">
            <span className={`font-semibold ${isLight ? 'text-black':'text-white'}`}>Showing top {Math.min(shipments.length,25)} of {shipments.length} filtered records</span>
            <span className="text-emerald-500">Control Room Engine Active</span>
        </div>
    </Divide>
  )
}
