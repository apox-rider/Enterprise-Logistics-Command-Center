import { create } from 'zustand';
import type { Shipment, ShipmentStatus } from '../types/shipment';
import { generateMockShipment } from '../data/mockShipment';
import { shipmentSchema } from '../schemas/shipmentSchema';



interface FleetState {
  shipments: Shipment[];
  theme: 'dark' | 'light';
  searchQuery: string;
  selectedStatus: string;
  selectedCargo: string;
  selectedShipment: Shipment | null;
  toggleTheme: () => void;
  setSearchQuery: (query: string) => void;
  setSelectedStatus: (status: string) => void;
  setSelectedCargo: (cargo: string) => void;
  setSelectedShipment: (shipment: Shipment | null) => void;
  updateShipmentStatus: (id: string, newStatus: ShipmentStatus) => void;
}

export const useFleetStore = create<FleetState>((set) => ({
  shipments: generateMockShipment(1500).map(s=>shipmentSchema.parse(s)),
  theme: 'light',
  searchQuery: '',
  selectedStatus: 'ALL',
  selectedCargo: 'ALL',
  selectedShipment: null,
  toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setSelectedStatus: (selectedStatus) => set({ selectedStatus }),
  setSelectedCargo: (selectedCargo) => set({ selectedCargo }),
  setSelectedShipment: (selectedShipment) => set({ selectedShipment }),
  updateShipmentStatus: (id, newStatus) => set((state) => ({
    shipments: state.shipments.map(s => s.id === id ? { ...s, status: newStatus } : s),
    selectedShipment: state.selectedShipment?.id === id ? { ...state.selectedShipment, status: newStatus } : state.selectedShipment
  }))
}));