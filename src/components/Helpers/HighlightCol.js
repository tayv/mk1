import React from "react"

const HighlightCol = ({
  variant,
  headerValue,
  handleSortProjPointToggle,
  sortByProjPoint,
  children,
}) => {
  const highlightPoints = headerValue === "points" && sortByProjPoint === false
  const highlightProjPoints =
    headerValue === "projPoints" && sortByProjPoint === true

  return (
    <button
      type="button"
      onClick={handleSortProjPointToggle}
      className="w-full h-full border-0 flex flex-row justify-center items-center gap-1 sm:gap-3"
    >
      {variant === "heading" && highlightPoints && (
        <img
          className="max-h-2 sm:max-h-3"
          src="./triangle.svg"
          alt="sort icon"
        />
      )}
      {variant === "heading" && highlightProjPoints && (
        <img
          className="max-h-2 sm:max-h-3 "
          src="./triangle.svg"
          alt="sort icon"
        />
      )}
      <div className="flex items-center min-h-full">{children}</div>
    </button>
  )
}

export default HighlightCol
