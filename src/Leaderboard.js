import React, { useState } from 'react'; 
import racerData from './racer-data.json';
import './Leaderboard.css';
  
const Leaderboard = () => {
    const [racers, setRacers] = useState(racerData);

    return  (
        <div className="Leaderboard-container">
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th colspan="2">Racer</th>
                        <th>Points</th>
                        <th>Change</th>
                    </tr>
                </thead>
                <tbody>
                    { racers.map( (racer) => (
                        <tr>
                            <td>{ racer.trophy }</td>
                            <td>{ racer.avatar }</td>
                            <td>{ racer.name }</td>
                            <td>{ racer.points }</td>
                            <td>{ racer.change }</td>
                        </tr>
                    )) }
                </tbody>
            </table>
        </div>
    )
}
  
export default Leaderboard;