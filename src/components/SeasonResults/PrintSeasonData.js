import React from 'react';

const PrintSeasonData = (props) => {
    
    const statsBySeasonProp = props.statsBySeason;

    return (
        
        // Use a ternary since statBySeason state takes a moment to update as PrintSeasonRows() is async to avoid errors accessing undefined child property. 
        !statsBySeasonProp.[props.season] ? <tr /> : (

            statsBySeasonProp.[props.season].map( (row) => (
                    <tr key={ row.rank }>
                        <td>{ row.rank }</td>
                        <td>{ row.name }</td>
                        <td>{ row.points }</td>
                        <td>{ row.change }</td>
                    </tr>
                ))
        )
    )
}

export default PrintSeasonData;