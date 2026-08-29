import {z} from 'zod'
import type { CargoType, Checkpoint, Driver, Shipment, ShipmentStatus } from '../types/shipment';

export const driverSchema=z.object({
    id:z.string(),
    name:z.string(),
    phone:z.string(),
    assignedTruckId:z.string(),
    status:z.enum(['Active','On Break','Off Duty'] as const)
}) satisfies z.ZodType<Driver>;

export const checkPointSchema =z.object({
    id:z.string(),
    name:z.string(),
    time:z.string(),
    status:z.enum(['passed','current','pending'] as const),
})satisfies z.ZodType<Checkpoint>;

export const shipmentSchema=z.object({
    id:z.string(),
    trackingNumber:z.string(),
    driver: driverSchema,
    origin:z.string(),
    destination:z.string(),
    cargoType:z.enum(['Agricultural','Retail','Perishable','Livestock'] as [CargoType, ...CargoType[]]),
    status:z.enum(['In Transit' ,'Delayed','Delivered','Critical'] as [ShipmentStatus, ...ShipmentStatus[]]),
    eta:z.string(),
    fuelLevel:z.number(),
    currentCoordinates:z.object({
        lat:z.number(),
        lng:z.number(),
    }),
    checkpoints:z.array(checkPointSchema)
})satisfies z.ZodType<Shipment>;

export type ValidShipment=z.infer<typeof shipmentSchema>;