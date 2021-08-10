import React, { useState } from 'react'; 
import racerData from '../../racer-data.json';
import RacerList from '../RacerList';

const SeasonResults = (props) => {
    const [racers, setRacers] = useState(racerData);

    return (
        <tbody>
        <RacerList season={props.season} />
        { racers.map( (racer) => (
            <tr>
                <td>{ racer.[props.season].goldMedals }</td>
                <td>{ racer.avatar }</td>
                <td>{ racer.name }</td>
                <td>{ racer.[props.season].points }</td>
                <td>{ racer.[props.season].change }</td>
            </tr>
        )) }
        </tbody>
    )
}

export default SeasonResults;