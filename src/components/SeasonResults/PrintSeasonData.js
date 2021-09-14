import React from 'react';
import StyleChangeCell from '../Helpers/StyleChangeCell';


const PrintSeasonData = (props) => {
    
    const statsBySeasonProp = props.statsBySeason;

    return (

        // Use a ternary since statBySeason state takes a moment to update as PrintSeasonRows() is async to avoid errors accessing undefined child property. 
        !statsBySeasonProp.[props.season] ? <tr /> : (

            statsBySeasonProp.[props.season].map( (row) => (
                <tr key={ row.rank }>
                    <td>{ row.rank }</td>
                    <td className="flex gap-x-2 sm:gap-x-4 pl-2 sm:pl-4 items-center"> 
                        <img className="rounded-full w-6 sm:w-10 md:w-12 h-6 sm:h-10 md:h-12" src={`./avatars/${row.avatar}`} alt="avatar" /> 
                        { row.name } 
                    </td>
                    <td>{ row.points }</td>
                    <td className={ StyleChangeCell(row.change) }>
                        { row.change }
                    </td>
                </tr>
            ))
        )
    
    )
        
}

export default PrintSeasonData;