import React, { useState } from 'react'; 
import racerData from './racer-data.json';
import './Leaderboard.css';
  
const Leaderboard = () => {
    const [racers, setRacers] = useState(racerData);

    return  (
        <div className="Leaderboard-container">
            <div className="Leaderboard-filter"> 
                <label for="season" style={{visibility: "hidden"}}>Season: </label>
                <select name="season" id="season">
                    <option value="s1">Season 1</option>
                    <option value="s2">Season 2</option>
                </select> 
            </div>
        
        <div>
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

        </div>
    )
}
  
export default Leaderboard;