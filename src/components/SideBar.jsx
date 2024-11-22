import { useState } from "react"
import { cn } from "../lib/utils"



export const Sidebar = ({panels, setSelectedPanel, selectedPanel}) => {

  const [search, setSearch] = useState("")

  return (
    <div className="right-0 absolute p-4 bg-white w-1/5 top-0 bottom-0 overflow-y-hidden no-scrollbar border-l-2">
      <div className="mb-4">
        <input type="text" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} className="appearance-none border-2 border-slate-300 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-slate-500" />
      </div>

      <div className="flex flex-col gap-2">
      {panels
        .filter((panel) => panel.name.toLowerCase().includes(search.toLowerCase()))
        .map((panel, index) => (
          <div
            key={index}
            onClick={() => setSelectedPanel(index)}
            className={cn(
              "flex gap-4 items-center hover:bg-slate-200 cursor-pointer p-3",
              index === selectedPanel && "bg-slate-200"
            )}
          >
            {/* <img src={panel.img} alt={panel.name} className="bg-red-300" /> */}
            <div className="w-10 h-16 bg-slate-300"></div>

            <div className="">
              <h3 className="font-semibold">{panel.name}</h3>
              <p className="text-slate-600 text-sm">{panel.description}</p>
              <p className="">{panel.power} W <span className="text-sm text-slate-500">({panel.size.w} x {panel.size.h})</span></p>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}