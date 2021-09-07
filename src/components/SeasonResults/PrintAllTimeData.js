import React from 'react';

const PrintAllTimeData = (props) => {

    const statsAllTimeProp = props.statsAllTime;

    return (

        statsAllTimeProp.map( (row) => (
            <tr key={ row.id }>
                <td className="flex gap-x-4 items-center"> 
                    <img className="rounded-full w-12 h-12" src={`./avatars/${row.avatar}`} alt="avatar" /> 
                    { row.name } 
                </td>
                <td>{ row.allTime.championships }</td>
                <td>{ row.allTime.gold }</td>
                <td>{ row.allTime.silver }</td>
                <td>{ row.allTime.bronze }</td>
                <td>{ row.allTime.timeTrial }</td>
            </tr>
        ))

    )
}

export default PrintAllTimeData;