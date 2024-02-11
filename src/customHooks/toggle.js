import React from 'react'

function useToggle() {
const [toggle, setToggle] = React.useState(false)

const toggleFunction = () => {
    setToggle(toggle => !toggle)
}
return {toggle, toggleFunction}
}

export default useToggle