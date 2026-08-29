import type React from "react";
import {AlertCircle, ArrowRight, CheckCircle2, ChevronLeft, ChevronRight, Clock, Phone, Truck, User} from 'lucide-react'
import type { Shipment } from "../types/shipment";
import Divide from "./ui/Divide";
import {motion} from 'framer-motion'
import { useEffect, useState } from "react";
import { ShipmentSkeleton } from "./ShipmentSkeleton";
interface ShipmentTableProps{
    shipments: Shipment[];
    onSelectShipment:(shipment:Shipment)=>void;
    theme:'light'|'dark'
}
export const ShipmentTable:React.FC<ShipmentTableProps>=({shipments,onSelectShipment,theme})=> {
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 25;
    const isLight=theme==='light'

    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 400);
        return () => clearTimeout(timer);
    }, [shipments]);

    const totalPages = Math.ceil(shipments.length / pageSize) || 1;
    const startIndex = (currentPage - 1) * pageSize;
    const currentShipments = shipments.slice(startIndex, startIndex + pageSize);

    const getStatusBadge=(status:Shipment['status'])=>{
        switch(status){
            case 'Critical':
                return(
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-sm  bg-red-500/10 ${isLight?'text-red-700 font-semibold':'text-red-400'} border border-red-500/20 `}>
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
                <motion.tbody
                initial='hidden'
                animate="show"
                variants={{
                    hidden: { opacity: 0 },
                    show: {
                    opacity: 1,
                    transition: { staggerChildren: 0.03 }
                    }
                }}
                 className="divide-y divide-slate-700/30 text-sm font-medium bg-slate-400/20">
                    {isLoading?(
                        Array.from({length:8}).map((_,i)=>(
                                <tr key={`skeleton-${i}`} className="animate-pulse border border-b-slate-400/20">
                                    <td colSpan={7} className="p-0">
                                        <ShipmentSkeleton theme={theme}/>
                                    </td>
                                </tr>
                        ))
                    ):(

                        shipments.length===0? (
                            <tr>
                                <td colSpan={7}>
                                    <div className={`flex font-black w-full justify-center items-center min-h-96 ${isLight?'bg-white':'bg-black'}`}>
                                        No shipment found matching your Search or Filter Criteria in any route
                                    </div>
                                </td>
                            </tr>
                        ):(
                            currentShipments.map((shipment)=>(
                                <motion.tr 
                                key={shipment.id}
                                onClick={()=>onSelectShipment(shipment)}
                                variants={{
                                hidden: { opacity: 0, y: 10 },
                                show: { opacity: 1, y: 0 }
                                }}
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
                                        <ArrowRight width={20} height={20}/>
                                        <p >{shipment.destination}</p>
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
                                </motion.tr>
                            ))
                        )
                    
                    )}
                </motion.tbody>
            </table>
        </div>
        <div className="flex flex-col md:flex-row justify-between p-4 w-full items-center gap-4 border-t border-slate-500/20">
                <span className={`font-semibold text-xs md:text-sm ${isLight ? 'text-black' : 'text-white'}`}>
                    Showing {shipments.length > 0 ? startIndex + 1 : 0} - {Math.min(startIndex + pageSize, shipments.length)} of {shipments.length} filtered records
                </span>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1 || isLoading}
                        className={`px-3 py-1.5 rounded text-xs font-semibold border flex items-center gap-1 transition-colors disabled:opacity-40 ${
                            isLight ? 'border-slate-300 hover:bg-slate-100' : 'border-slate-700 text-white hover:bg-slate-800'
                        }`}
                    >
                        <ChevronLeft className="w-4 h-4" /> Previous
                    </button>
                    
                    <span className={`text-xs font-mono ${!isLight&&('text-white')}`}>
                        Page {currentPage} of {totalPages}
                    </span>

                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages || isLoading}
                        className={`px-3 py-1.5 rounded text-xs font-semibold border flex items-center gap-1 transition-colors disabled:opacity-40 ${
                            isLight ? 'border-slate-300 hover:bg-slate-100' : 'border-slate-700 text-white hover:bg-slate-800'
                        }`}
                    >
                        Next <ChevronRight className="w-4 h-4" />
                    </button>
                </div>

                <span className="text-emerald-500 text-xs">Control Room Engine Active</span>
            </div>
    </Divide>
  )
}
