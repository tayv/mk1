import React from 'react'; 
import { Listbox } from '@headlessui/react';
import { SelectorIcon, CheckIcon } from '@heroicons/react/solid'

const SeasonFilter = (props) => {

    return (
        <div> 
            <label htmlFor="season" style={{visibility: "hidden"}}>Season: </label>
            <select className="bg-blue-500 rounded p-2 box-content" defaultValue={props.value} onChange={(e) => props.onChange(e.target.value)} name="season" id="season"> 
                <option value="season1">Season 1</option>
                <option value="season2">Season 2</option>
                <option value="allTime">All Time</option>
            </select> 
        </div>
    )
}


const MyListbox = (props) => {
  
    return (
    <div className="flex top-16">

        <Listbox value={props.value} onChange={value => props.onChange(value)}>
        <div className="flex-auto curser-pointer font-medium">

            <Listbox.Button className="relative py-2 pl-4 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500">
                <span className="block truncate">{props.value}</span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <SelectorIcon className="w-5 h-5 text-gray-400" aria-hidden="true"/>
                </span>
            </Listbox.Button>
            <Listbox.Options className="py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none ">
                
                <Listbox.Option value={"season1"}>
                    {({ active, selected }) => (
                        <li className={ active ? "flex items-center gap-2 py-2 pr-5 pl-3 bg-blue-500 text-white" : "left-0 flex items-center gap-2 py-2 pr-5 pl-3 bg-white"}>
                            Season 1
                            {selected && <CheckIcon className="w-5 h-5" aria-hidden="true" />}
                        </li>
                    )}        
                </Listbox.Option>
                <Listbox.Option value={"season2"}>
                    {({ active, selected }) => (
                        <li className={ active ? "flex items-center gap-2 py-2 pr-5 pl-3 bg-blue-500 text-white" : "left-0 flex items-center gap-2 py-2 pr-5 pl-3 bg-white"}>
                            Season 2
                            {selected && <CheckIcon className="w-5 h-5" aria-hidden="true" />}
                        </li>
                    )}       
                </Listbox.Option>
                <Listbox.Option value={"allTime"}>
                    {({ active, selected }) => (
                        <li className={ active ? "flex items-center gap-2 py-2 pr-5 pl-3 bg-blue-500 text-white" : "left-0 flex items-center gap-2 py-2 pr-5 pl-3 bg-white"}>
                            All Time
                            {selected && <CheckIcon className="w-5 h-5" aria-hidden="true" />}
                        </li>
                    )}       
                </Listbox.Option>

            </Listbox.Options>
        </div>
        </Listbox>

    </div>
      
    )
  }

export default MyListbox;