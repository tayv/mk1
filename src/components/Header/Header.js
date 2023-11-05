import React from "react"

const Header = () => {
  return (
    <header className="flex flex-col w-screen justify-center items-center py-3">
      <div className="h-9">
        <img className="sm:h-16 md:h-20 h-12" src="./logo512.png" alt="logo" />
      </div>
    </header>
  )
}

export default Header
