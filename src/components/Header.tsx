import Divide from "./ui/Divide"

export const Header:React.FC=()=>{
    return(
        <Divide >
            <div className="flex flex-col bg-black/10  md:flex-row w-full justify-between px-5 gap-4  py-2">
                <div className="flex items-center justify-center w-auto gap-3">
                    <div className="flex flex-col w-full items-center md:items-start justify-center md:justify-baseline tracking-widest md:tracking-normal">
                        <h1 className="font-black">KIBO LOGISTICS CONTROL</h1>
                        <p className="font-light ">Fleet Tracking Manager</p>
                    </div>
                </div>
                <div className="flex w-auto justify-between gap-4 border-t-2 md:border-none ">
                    <div className="flex flex-col">
                        <h1>Connectivity</h1>
                        <p>Active</p>
                    </div>
                    <div className="flex flex-col">
                        <h1>Time</h1>
                        <p>EAT(UTC)</p>
                    </div>
                </div>
            </div>
        </Divide>
    )
}