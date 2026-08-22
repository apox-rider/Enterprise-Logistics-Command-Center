import { Filter, Search } from "lucide-react";
import CompDiv from "./ui/CompDiv";

interface FilterToolBarProps{
    searchQuery:string;
    setSearchQuery:(q:string)=>void;
    selectedStatus:string;
    setSelectedStatus:(status:string)=>void;
    selectedCargo:string;
    setSelectedCargo:(cargo:string)=>void;
    totalResults:number;
    theme:'light'|'dark'
}

export const FilterToolBar:React.FC<FilterToolBarProps>=({
    searchQuery,setSearchQuery,selectedStatus,setSelectedStatus,selectedCargo,setSelectedCargo,totalResults,theme
})=>{
    const isLight=theme==='light'
    return(
        <div className={`m-0.5 flex flex-col md:flex-row mt-5 mb-5  md:h-10 ${isLight?'text-black':'text-white'}`}>
            <div className={`flex relative border ${isLight?'border-black/10':'border-white'} p-0.5 h-10 rounded-2xl w-full md:w-96`}>
                <Search width={25} height={25} className={`border absolute left-0.5 top-1/2 -translate-y-1/2  ${isLight?"border-black/20":"border-white"} p-0.5 rounded-full`}/>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e)=>setSearchQuery(e.target.value)}
                    className="w-full border border-black/20 rounded-full ml-7 px-3 bg-white text-black"
                    placeholder="Search Driver Name or tracking ID..."
                />
            </div>

            <CompDiv className="flex flex-wrap items-center gap-3   w-full md:w-auto overflow-x-hidden">
                <div className="flex items-center gap-2 text-sm ">
                    <Filter className="w-3.5 h-3.5"/>Filters:
                </div>

                <select 
                name="Status" 
                className="text-sm"
                value={selectedStatus}
                onChange={(e)=>setSelectedStatus(e.target.value)}
                >
                    <option value="ALL">All</option>
                    <option value="In Transit">In Transit</option>
                    <option value="Delayed">Delayed</option>
                    <option value="Critical">Critical</option>
                    <option value="Delivered">Delivered</option>
                </select>

                <select 
                name="Cargo" 
                value={selectedCargo}
                className="text-sm"
                onChange={(e)=>setSelectedCargo(e.target.value)}
                >
                    <option value="ALL">All</option>
                    <option value="Agricultural">Agricultural</option>
                    <option value="Retail">Retail</option>
                    <option value="Perishable">Perishable</option>
                    <option value="Livestock">Livestock</option>
                </select>

                <div className="text-sm">
                    Matches: <strong>{totalResults}</strong>
                </div>
            </CompDiv>
        </div>
    )
}