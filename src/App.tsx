import { useMemo, useState } from "react";
import { generateMockShipment } from "./data/mockShipment"
import { useDebounce } from "./hooks/useDebounce";
import { FilterToolBar } from "./components/FilterToolBar";
import { ShipmentTable } from "./components/ShipmentTable";
import { KpiGrid } from "./components/KpiGrid";
import { Header } from "./components/Header";
import { ShipmentDetail } from "./components/ShipmentDetail";
import { NetworkBanner } from "./components/NetworkBanner";
import {type Shipment, type ShipmentStatus } from "./types/shipment";

export default function App() {
  const [shipments,setShipments]=useState(()=>generateMockShipment(1500));
  const [theme,setTheme]=useState<'light'|'dark'>('light')

  const [searchQuery,setSearchQuery]=useState('')
  const [selectedStatus,setSelectedStatus]=useState('ALL');
  const [selectedCargo,setSelectedCargo]=useState('ALL');
  const [selectedShipment, setSelectedShipment]=useState<Shipment|null>(null)

  const debouncedSearch=useDebounce(searchQuery,300);

  const filteredShipments=useMemo(()=>{
    return shipments.filter((shipment)=>{
      const matchSearch =shipment.driver.name.toLowerCase().includes(debouncedSearch.toLowerCase()) || shipment.trackingNumber.toLowerCase().includes(debouncedSearch.toLowerCase())

        const matchStatus=selectedStatus==='ALL' || shipment.status===selectedStatus;
        const matchCargo=selectedCargo==='ALL' || shipment.cargoType===selectedCargo;

        return matchSearch && matchStatus && matchCargo
    });
  },[shipments,debouncedSearch,selectedStatus,selectedCargo])

  const toggleTheme=()=>{
    setTheme(prev=>prev ==='light'?'dark':'light')
  }

  const handleUpdateStatus = (shipmentId: string, newStatus: ShipmentStatus) => {
      setShipments(prev => 
        prev.map(s => s.id === shipmentId ? { ...s, status: newStatus } : s)
      );
      setSelectedShipment(current => current ? { ...current, status: newStatus } : null);
    };


  return (
    <div className={`w-full max-w-full overflow-x-hidden ${theme==='light'?'bg-white':'bg-blue-950'} min-h-screen overflow-y-hidden`}>
      <NetworkBanner/>
      <Header theme={theme} onchangeTheme={toggleTheme}/>
      <main>  
          <KpiGrid shipments={shipments} theme={theme} />

          <FilterToolBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          selectedCargo={selectedCargo}
          setSelectedCargo={setSelectedCargo}
          totalResults={filteredShipments.length}
          theme={theme}
          />

          <ShipmentTable
          shipments={filteredShipments}
          onSelectShipment={(shipments)=>setSelectedShipment(shipments)}
          theme={theme} 

          />
      </main>
        <ShipmentDetail
        shipment={selectedShipment}
        onClose={()=>setSelectedShipment(null)}
        onUpdateStatus={handleUpdateStatus}
        theme={theme} />
    </div>
  )
}
