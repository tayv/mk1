import React from "react"

const PrintAllTimeData = (props) => {
  const statsAllTimeProp = props.statsAllTime

  return (
    // Remove rows with blank id before mapping
    statsAllTimeProp
      .filter((row) => row.id !== undefined)
      .map((row) => (
        <tr key={row.id}>
          <td>
            <div className="flex gap-x-2 sm:gap-x-4 pl-2 sm:pl-4 text-left items-center">
              <img
                className="rounded-full w-6 sm:w-10 md:w-12 h-6 sm:h-10 md:h-12"
                src={`./avatars/${row.avatar}`}
                alt="avatar"
              />
              {row.name}
            </div>
          </td>
          <td>{row.allTime.championships}</td>
          <td>{row.allTime.gold}</td>
          <td>{row.allTime.silver}</td>
          <td>{row.allTime.bronze}</td>
          <td>{row.allTime.timeTrial}</td>
        </tr>
      ))
  )
}

export default PrintAllTimeData
