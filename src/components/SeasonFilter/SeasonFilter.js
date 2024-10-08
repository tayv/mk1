import React from "react"
import { Listbox } from "@headlessui/react"
import { SelectorIcon, CheckIcon } from "@heroicons/react/solid"

const propsValueConverter = (value) => {
  // Listbox dynamically shows the props.value which is saved from Google Sheets using camel case
  switch (true) {
    case value === "allTime":
      return "All Time"

    case value === "season1":
      return "Season 1"

    case value === "season2":
      return "Season 2"

    case value === "season3":
      return "Season 3"

    case value === "season4":
      return "Season 4"

    case value === "season5":
      return "Season 5"

    case value === "season6":
      return "Season 6"

    case value === "season7":
      return "Season 7"

    case value === "season8":
      return "Season 8"

    case value === "season9":
      return "Season 9"

    case value === "season10":
      return "Season 10"

    default:
      return null
  }
}

const FilterListbox = (props) => {
  return (
    <div className="flex w-18">
      <Listbox value={props.value} onChange={(value) => props.onChange(value)}>
        <div className="flex-auto curser-pointer font-medium">
          <Listbox.Button className="relative w-46 py-2 pl-4 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500">
            <span className="block truncate">
              {propsValueConverter(props.value)}
            </span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <SelectorIcon
                className="w-5 h-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Listbox.Options className="absolute w-52 py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none ">
            {
              // when adding new season also update default state to latest season in Leaderboard.js
            }
            <Listbox.Option value={"allTime"}>
              {({ active, selected }) => (
                <span
                  className={
                    active
                      ? "flex items-center gap-2 py-2 pr-5 pl-3 bg-blue-500 text-white"
                      : "left-0 flex items-center gap-2 py-2 pr-5 pl-3 bg-white"
                  }
                >
                  All Time
                  {selected && (
                    <CheckIcon className="w-5 h-5" aria-hidden="true" />
                  )}
                </span>
              )}
            </Listbox.Option>
            <Listbox.Option value={"season1"}>
              {({ active, selected }) => (
                <span
                  className={
                    active
                      ? "flex items-center gap-2 py-2 pr-5 pl-3 bg-blue-500 text-white"
                      : "left-0 flex items-center gap-2 py-2 pr-5 pl-3 bg-white"
                  }
                >
                  Season 1
                  {selected && (
                    <CheckIcon className="w-5 h-5" aria-hidden="true" />
                  )}
                </span>
              )}
            </Listbox.Option>
            <Listbox.Option value={"season2"}>
              {({ active, selected }) => (
                <span
                  className={
                    active
                      ? "flex items-center gap-2 py-2 pr-5 pl-3 bg-blue-500 text-white"
                      : "left-0 flex items-center gap-2 py-2 pr-5 pl-3 bg-white"
                  }
                >
                  Season 2
                  {selected && (
                    <CheckIcon className="w-5 h-5" aria-hidden="true" />
                  )}
                </span>
              )}
            </Listbox.Option>
            <Listbox.Option value={"season3"}>
              {({ active, selected }) => (
                <span
                  className={
                    active
                      ? "flex items-center gap-2 py-2 pr-5 pl-3 bg-blue-500 text-white"
                      : "left-0 flex items-center gap-2 py-2 pr-5 pl-3 bg-white"
                  }
                >
                  Season 3
                  {selected && (
                    <CheckIcon className="w-5 h-5" aria-hidden="true" />
                  )}
                </span>
              )}
            </Listbox.Option>
            <Listbox.Option value={"season4"}>
              {({ active, selected }) => (
                <span
                  className={
                    active
                      ? "flex items-center gap-2 py-2 pr-5 pl-3 bg-blue-500 text-white"
                      : "left-0 flex items-center gap-2 py-2 pr-5 pl-3 bg-white"
                  }
                >
                  Season 4
                  {selected && (
                    <CheckIcon className="w-5 h-5" aria-hidden="true" />
                  )}
                </span>
              )}
            </Listbox.Option>
            <Listbox.Option value={"season5"}>
              {({ active, selected }) => (
                <span
                  className={
                    active
                      ? "flex items-center gap-2 py-2 pr-5 pl-3 bg-blue-500 text-white"
                      : "left-0 flex items-center gap-2 py-2 pr-5 pl-3 bg-white"
                  }
                >
                  Season 5
                  {selected && (
                    <CheckIcon className="w-5 h-5" aria-hidden="true" />
                  )}
                </span>
              )}
            </Listbox.Option>
            <Listbox.Option value={"season6"}>
              {({ active, selected }) => (
                <span
                  className={
                    active
                      ? "flex items-center gap-2 py-2 pr-5 pl-3 bg-blue-500 text-white"
                      : "left-0 flex items-center gap-2 py-2 pr-5 pl-3 bg-white"
                  }
                >
                  Season 6
                  {selected && (
                    <CheckIcon className="w-5 h-5" aria-hidden="true" />
                  )}
                </span>
              )}
            </Listbox.Option>
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  )
}

export default FilterListbox
