#Architecture and design Specification (DESIGN.md) for the project 

##1. UX and Information Hierarchy:
  The three most critical metrics a dispatcher needs to see within 2 seconds of opening the page are 
  1. **Critical and Delayed vehicles: To ensure the vehicles can get imediate attention of the control room for immediate action 
  2. **All the active vehicles in progress across their routes
  3. **Delivery Metrics and data like time and location to know the rate at whick the process is taking effectiveness 

* **Layout design for the urgent alerts needs proper colour choice like using standard colour like red to signify an issue that is critical and yellow for delayed to signify warning to a level of significantly lesser shock priority , this is to keep the standard avoiding overwhelming user with newer colors but keeping the mindset on alert 

##2. State and data strategy 
State and data handling is important for smooth rendering of data without UI freezing and overloading for a better userexperience
  1. **Using useDebounce hook**: This is to prevent excessive calls and heavy computation on every single keystroke when typing through. Seach inputs are wrapped in custom say 300ms debounce to eliminate redundnt filter on every keystroke typing 
  2. **Memorizing Computations**:This is by useMemo hook to ensure calculations are executed exclusively when filter parameters or datasets change during sorting and filtering 
  3. **Client Side Pagination**:Dealing with over 1500 datasets , for a proper and more effectively optimised render on browser a few datasets need to be loaded at once rather than holding and rendering all of them at once . The Browser DOM elements require memory for each's style , dimentions and structure so this is what brings the challenge unlike Javascript elements that are light weight , so rendering a few in browser at a time makes it simple since lesser memory is in user at a time . Also this is to save speed of loading data by the browser layout engine . Its all for efficiency assurance 

##3. Resilience and edge cases 
Due to variable internet connectivity across regional locations , some measures are to be put into action as guard to such a situation . What happens when dispatcher's internet drops midway through updating a shipment ;
    **The Optimistic UI update occurs** This means the update request to the backend fails and UI fails to update , the simulation triggers a state roll back automatically triggering a retry toast to notify user . 
    **Error boundary placement** This Isolates key Modules like analytics charts from data tables so minor network failures never crash the core command centre portal
    **Also connectivity monitoring** It can be placed to tell the mode as a global network listener to trigger top notification bar to alert dispatcher on network connectivity drop

##4. TypeScript Domain Modeling 
The interfaces are important to ensure type safety for the data accross the application as defined bellow ;

type ShipmentStatus ='In Transit' |'Delayed'|'Delivered'|'Critical';
type CargoType='Agricultural'|'Retail'|'Perishable'|'Livestock';
type AlertSeverity='low'|'medium'|'high'|'critical';

interface Coordinates {
    lat:number;
    lng:number;
}

interface Driver {
    id:string;
    name:string;
    phone:string;
    assignedTruckId:string;
    status:'Active'|'On Break'|"Off Duty";
}

interface Checkpoint{
    id:string;
    name:string;
    time:string;
    status:'passed'|'current'|'pending';
}

interface Shipment{
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

interface AlertLog{
    id:string;
    shipmentId:string;
    trackingNumber:string;
    time:string;
    resolved:boolean;
}




