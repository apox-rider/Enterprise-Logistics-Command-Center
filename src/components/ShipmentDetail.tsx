import { useEffect, useState } from "react";
import type { Shipment, ShipmentStatus } from "../types/shipment";
import { CheckCircle2, Clock, MapPin, Phone, RefreshCw, ShieldAlert, X } from "lucide-react";
import Divide from "./ui/Divide";
import {motion,AnimatePresence} from 'framer-motion'


interface ShipmentDetailProps {
  shipment: Shipment |null;
  onClose: () => void;
  onUpdateStatus: (shipmentId: string, newStatus: ShipmentStatus) => void;
  theme: 'dark' | 'light';
}

export const ShipmentDetail: React.FC<ShipmentDetailProps> = ({
  shipment,
  onClose,
  onUpdateStatus,
  theme,
}) => {
  const [updating, setUpdating] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [pendingStatus,setPendingStatus]=useState<ShipmentStatus|null>(null)

  useEffect(()=>{

    if (toastMessage && toastMessage.includes('Success')){
        const timer =setTimeout(()=>{
            setToastMessage(null);
        },3000);
        return ()=>clearTimeout(timer)
    }
    },[toastMessage]);


  const isLight = theme === 'light';

  const handleStatusChangeClick = (status: ShipmentStatus) => {
    if (!shipment) return;
    setUpdating(true);
    setToastMessage(null);
    setPendingStatus(status)

    setTimeout(() => {
      if (!navigator.onLine) {
        setToastMessage('Network Error: Failed to update status. Connection offline.');
      } else {
        onUpdateStatus(shipment.id, status);
        setToastMessage(`Success: Status updated to ${status}`);
        setPendingStatus(null)
      }
      setUpdating(false);
    }, 600);
  };

  return (
    <AnimatePresence>
      {shipment && (
        <motion.div 
          initial={{opacity:0}}
          animate={{opacity:1}}
          exit={{opacity:0}}
          onClick={onClose}
          className={`fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex justify-end cursor-pointer`}  
        >
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            onClick={(e) => e.stopPropagation()} 
            className={`w-full md:w-1/3 h-screen overflow-y-auto p-6 flex flex-col justify-between shadow-2xl border-l cursor-default ${
              isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-slate-900 border-slate-800 text-slate-100'
            }`}
          >
                  <Divide className="border-none ">
                    <div className="flex items-center justify-between pb-4 border-b border-slate-700/50">
                      <div>
                        <span className="text-xs font-mono text-blue-500 font-semibold">{shipment.id}</span>
                        <h2 className="text-xl font-bold font-mono tracking-wide">{shipment.trackingNumber}</h2>
                      </div>
                      <button 
                        onClick={onClose}
                        className={`p-2 rounded-lg border transition-colors ${isLight ?  'bg-slate-100 border-slate-200 hover:bg-slate-200 text-slate-700':'bg-slate-800 border-slate-700 hover:bg-slate-700 text-slate-300'}`}
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                      {toastMessage && (
                          <div className={`my-4 p-3 rounded-lg text-xs font-medium border flex items-center justify-between ${toastMessage.includes('Success') ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
                              <div className="flex items-center gap-2">
                              {toastMessage.includes('Success') ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <ShieldAlert className="w-4 h-4 shrink-0" />}
                              <span>{toastMessage}</span>
                              </div>
                              {pendingStatus && !toastMessage.includes('Success') && (
                              <button 
                                  onClick={() => handleStatusChangeClick(pendingStatus)}
                                  className="px-2.5 py-1 bg-red-500 text-white rounded text-[10px] font-semibold hover:bg-red-600 transition-colors"
                              >
                                  Retry
                              </button>
                              )}
                          </div>
                      )}

                    <div className="mt-6 space-y-4">
                      <div className={`p-4 rounded-xl border ${isLight ? 'bg-slate-50 border-slate-200':'bg-slate-950/50 border-slate-800' }`}>
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Assigned Driver</h3>
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-semibold text-base">{shipment.driver.name}</p>
                            <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                              <Phone className="w-3.5 h-3.5" /> {shipment.driver.phone}
                            </p>
                          </div>
                          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                            {shipment.driver.status}
                          </span>
                        </div>
                      </div>

                      <div className={`p-4 rounded-xl border ${isLight? 'bg-slate-50 border-slate-200':'bg-slate-950/50 border-slate-800' }`}>
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Corridor & Cargo</h3>
                        <div className="space-y-2 text-xs">
                          <div className="flex justify-between">
                            <span className="text-slate-400">Origin:</span>
                            <span className="font-medium">{shipment.origin}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">Destination:</span>
                            <span className="font-medium">{shipment.destination}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">Cargo Type:</span>
                            <span className="font-medium">{shipment.cargoType}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">Fuel Level:</span>
                            <span className={`font-bold ${shipment.fuelLevel < 30 ? 'text-red-500' : 'text-emerald-500'}`}>{shipment.fuelLevel}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">Current Coordinates:</span>
                            <span className="font-mono">{shipment.currentCoordinates.lat.toFixed(4)}, {shipment.currentCoordinates.lng.toFixed(4)}</span>
                          </div>
                        </div>
                      </div>

                      {shipment.checkpoints && shipment.checkpoints.length > 0 && (
                          <div className={`p-4 rounded-xl border ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/50 border-slate-800'}`}>
                            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Route Checkpoints</h3>
                            <div className="space-y-3 relative before:absolute before:inset-0 before:left-3 before:w-0.5 before:bg-slate-700/30">
                              {shipment.checkpoints.map((cp) => {
                                const isPassed = cp.status === 'passed';
                                const isCurrent = cp.status === 'current';
                                
                                return (
                                  <div key={cp.id} className="flex items-start gap-3 relative text-xs">
                                    <span className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 z-10  ${
                                      isPassed ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30' :
                                      isCurrent ? 'bg-blue-500/20 text-blue-400 border-blue-500 animate-pulse' :
                                      isLight ? 'bg-white text-slate-400 border-slate-300' : 'bg-slate-800 text-slate-500 border-slate-600'
                                    }`}>
                                      {isPassed ? <CheckCircle2 className="w-3.5 h-3.5" /> : <MapPin className="w-3.5 h-3.5" />}
                                    </span>
                                    <div className="flex-1 flex justify-between items-center bg-slate-500/5 p-2 rounded-lg border border-slate-500/10">
                                      <div>
                                        <p className={`font-semibold ${isCurrent ? 'text-blue-400 font-bold' : ''}`}>{cp.name}</p>
                                        <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                                          <Clock className="w-3 h-3" /> {cp.time}
                                        </p>
                                      </div>
                                      <span className={`px-2 py-0.5 rounded text-[10px] font-medium uppercase ${
                                        isPassed ? 'text-emerald-500 bg-emerald-500/10' :
                                        isCurrent ? 'text-blue-400 bg-blue-500/10' :
                                        'text-slate-400 bg-slate-500/10'
                                      }`}>
                                        {cp.status}
                                      </span>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}

                      <div className={`p-4 rounded-xl border ${isLight? 'bg-slate-50 border-slate-200':'bg-slate-950/50 border-slate-800'}`}>
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Dispatcher Status Override</h3>
                        <div className="grid grid-cols-2 gap-2">
                          {(['In Transit', 'Delayed', 'Critical', 'Delivered'] as ShipmentStatus[]).map((statusOption) => (
                            <button
                              key={statusOption}
                              disabled={updating || shipment.status === statusOption}
                              onClick={() => handleStatusChangeClick(statusOption)}
                              className={`px-3 py-2 rounded-lg text-xs font-medium border transition-all flex items-center justify-center gap-1.5 ${
                                shipment.status === statusOption
                                  ? 'bg-blue-600 text-white border-blue-500 shadow-lg'
                                  : isLight
                                  ? 'bg-white border-slate-200 hover:bg-slate-100 text-slate-700'
                                  : 'bg-slate-800 border-slate-700 hover:bg-slate-700 text-slate-300'
                              } disabled:opacity-50`}
                            >
                              {updating && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                              {statusOption}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Divide>

                  <div className="pt-4 border-t border-slate-700/50 text-xs text-slate-500 flex justify-between">
                    <span>ETA: {shipment.eta}</span>
                    <span className="font-mono">KIBO LOGISTICS CONTROL</span>
                  </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};