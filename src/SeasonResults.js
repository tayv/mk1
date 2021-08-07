import React, { useState } from 'react'; 
import racerData from './racer-data.json';

const SeasonResults = () => {
    const [racers, setRacers] = useState(racerData);


    return (
        <tbody>
        { racers.map( (racer) => (
            <tr>
                <td>{ racer.season1.goldMedals }</td>
                <td>{ racer.avatar }</td>
                <td>{ racer.name }</td>
                <td>{ racer.season1.points }</td>
                <td>{ racer.season1.change }</td>
            </tr>
        )) }
        </tbody>
    )
}

export default SeasonResults;