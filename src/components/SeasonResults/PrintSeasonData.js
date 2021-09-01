import React from 'react';

const PrintSeasonData = (props) => {
    
    const statsBySeasonProp = props.statsBySeason;

    return (
       statsBySeasonProp.[props.season].map( (row) => (
            <tr key={ row.rank }>
                <td>{ row.rank }</td>
                <td>{ row.name }</td>
                <td>{ row.points }</td>
                <td>{ row.change }</td>
            </tr>
        ))
    )
}

export default PrintSeasonData;