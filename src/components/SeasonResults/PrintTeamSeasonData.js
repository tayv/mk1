import React from 'react';

const PrintTeamSeasonData = (props) => {

    const statsByTeamSeasonProp = props.statsByTeamSeason;

    return (
        console.log(statsByTeamSeasonProp)
        // Use a ternary since statBySeason state takes a moment to update as PrintSeasonRows() is async to avoid errors accessing undefined child property. 
        // !statsByTeamSeasonProp.[props.season] ? <tr /> : (

        //     statsByTeamSeasonProp.[props.season].map( (row) => (
        //         <tr key={ row.rank }>
        //             <td>{ row.rank }</td>
        //             <td>{ row.teamName }</td>
        //             <td>{ row.teamPoints }</td>
        //             <td>{ row.teamChange }</td>
        //         </tr>
        //     ))

        // )

    )

}

export default PrintTeamSeasonData;