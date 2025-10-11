function FilterContainer({ children, className }) {
  return (
    // flex sm:f lex-row gap-4
    <div className={`flex flex-wrap sm:flex-row gap-4 items-center ${className || ''}`}>
      {children}
    </div>
  )
}

export default FilterContainer
