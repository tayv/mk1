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
            </tr>
        ))

    )
}

export default PrintAllTimeData;