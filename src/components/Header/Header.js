import React from 'react';

const Header = () => {
    return (
        <header className="flex flex-col justify-center items-center w-10/12 p-4 dev-border">
            <div className="h-9">
                LOGO
            </div>
            <div className="Navigation">
             Leaderboard    Schedule    Race Results
            </div>
        </header>
    )
}

export default Header;