import type {CargoType,AlertLog,ShipmentStatus,Shipment,Driver} from '../types/shipment'


const firstNames= ['Juma','Baraka','Apox','Rider', 'James','Alex','Rashid','Samwel','Johnson','Emma']
const lastNames= ['Khan','Cipher','Peigns','Joseph', 'Inno','Alexa','Ruben','Sam','Jefton','Rahim']

const Origins=[
    'Port of Dar Es Salaam',
    'Port of Kenya',
    'Iringa Transit Yard',
    'Uganda Kalif Deport',
    'Kisumu',
    'Kagera Deport',
    'Arusha Umoja station'
]

const Destinations=[
    'Morogoro',
    'Ibafu ',
    'Nairobi',
    'Mbeya Distribution Centre',
    'Entebbe',
    'Kagera Deport',
    'Kampala'
]

const CARGOTYPE:CargoType[]=['Agricultural','Livestock','Perishable','Retail']
const STATUS:ShipmentStatus[]=['Critical','Delayed','Delivered','In Transit']

function getRandomItem<T>(arr: T[]):T{
    return arr[Math.floor(Math.random()*arr.length)];
}

function getRandomNumber(min:number,max:number):number{
    return Math.floor(Math.random()*(max-min+1)) + min;
}

export function generateMockShipment(count:number=1500):Shipment[]{
    const shipments:Shipment[]=[];

    for (let i=1;i<=count;i++){
        const id=`SHP-${1000+i}`;
        const trackingNumber=`TZ-${getRandomNumber(100,999)}`;
        const firstname= getRandomItem(firstNames);
        const lastName=getRandomItem(lastNames);



        const driver: Driver={
            id:`DRV-${getRandomNumber(100, 999)}`,
            name:`${firstname} ${lastName}`,
            phone:`+255 7${getRandomNumber(10,99)} ${getRandomNumber(100,999)} ${getRandomNumber(100,999)}`,
            assignedTruckId:trackingNumber,
            status:getRandomItem(['Active','On Break','Off Duty']as const)
        }

        const status =getRandomItem(STATUS);
        const origin=getRandomItem(Origins);
        const destination=getRandomItem(Destinations);
        const cargoType=getRandomItem(CARGOTYPE);
        const fuelLevel=getRandomNumber(15,98);

        shipments.push({
            id,
            trackingNumber,
            driver,
            origin,
            destination,
            cargoType,
            status,
            eta:`2026-08-${getRandomNumber(20,28)} ${getRandomNumber(8,18)}:00`,
            fuelLevel,
            currentCoordinates:{
                lat:-6.7924 + (Math.random()*4-2),
                lng:39.2083 + (Math.random()*6-3)
            },
            checkpoints:[
                {id:'cp-1',name:origin,time:'2026-08-19 06:00',status:'passed'},
                {id:'cp-2',name:'Chalinze',time:'2026-08-19 09:30',status:status==='In Transit'?'current':'passed'},
                {id:'cp-3',name:destination,time:'2026-08-20 16:00',status:'pending'},
            ]
        });
    }

    return shipments;
}

export function generateMockAlerts(shipments:Shipment[]):AlertLog[]{
    return shipments
    .filter(s=>s.status==='Critical' || 'Delayed')
    .slice(0,25)
    .map((s,index)=>({
        id:`ALT-${index+1}`,
        shipmentId:s.id,
        trackingNumber:s.trackingNumber,
        severity:s.status==='Critical'?'critical':'high',
        message:`Truck ${s.trackingNumber} (${s.driver.name}) flagged for delay on ${s.destination}`,
        time:`${getRandomNumber(10,15)} minutes ago`,
        resolved:false
    }))
}

