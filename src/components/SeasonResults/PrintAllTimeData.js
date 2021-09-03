import React from 'react';

const PrintAllTimeData = (props) => {

    const statsAllTimeProp = props.statsAllTime;

    return (

        statsAllTimeProp.map( (row) => (
            <tr key={ row.id }>
                <td>{ row.avatar }</td>
                <td>{ row.name }</td>
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