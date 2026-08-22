export type ShipmentStatus ='In Transit' |'Delayed'|'Delivered'|'Critical';
export type CargoType='Agricultural'|'Retail'|'Perishable'|'Livestock';
export type AlertSeverity='low'|'medium'|'high'|'critical';

export interface Coordinates {
    lat:number;
    lng:number;
}

export interface Driver {
    id:string;
    name:string;
    phone:string;
    assignedTruckId:string;
    status:'Active'|'On Break'|"Off Duty";
}

export interface Checkpoint{
    id:string;
    name:string;
    time:string;
    status:'passed'|'current'|'pending';
}

export interface Shipment{
    id:string;
    trackingNumber:string;
    driver: Driver;
    origin:string;
    destination:string;
    cargoType:CargoType;
    status:ShipmentStatus;
    eta:string;
    fuelLevel:number;
    currentCoordinates:Coordinates;
    checkpoints:Checkpoint[];
}

export interface AlertLog{
    id:string;
    shipmentId:string;
    trackingNumber:string;
    time:string;
    resolved:boolean;
}

