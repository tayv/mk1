import React from 'react';

const TeamIndividualToggle = (props) => {

    return (
        <div>
            <input type="radio" value="individual" id="individual" onChange={(e) => props.onChange(e.target.value)} name="toggle" defaultChecked />
            <label htmlFor="individual">Individual</label>
            
            <input type="radio" value="team" id="team" onChange={(e) => props.onChange(e.target.value)} name="toggle" />
            <label htmlFor="team">Team</label>
        </div>
    )

}



export default TeamIndividualToggle;