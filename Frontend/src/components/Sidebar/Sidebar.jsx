import React, { useContext, useState } from 'react'
import "./sidebar.scss"
import { AppContext } from '../../App'

const Sidebar = () => {

  const context = useContext(AppContext)

    const [active, setActive] = useState(0)
    

    const menuItems = ["Home", "Results", "Statistics", "Number Frequency"]

    const handleClick = (index, item) => {
        setActive(index);
        context.setCategory(item);
    }

  return (
   <nav className='navbar'>
        <input id='toggle-btn' type="checkbox" onChange={() => context.setBlurBackground(!context.blurBackground)}/>
        <label className='btn-container' htmlFor="menu-toggle">
        <div className="menu-btn"></div>
        </label>
        <ul className='nav-list'>
          {menuItems.map((item, index) => (
              <li key={index} className={index === active ? "active" : null} onClick={() => {return [handleClick(index, item), document.getElementById("toggle-btn").checked = false, context.setBlurBackground(!context.blurBackground)]}}>
                <span>{item}</span>
            </li>
          ))}
        </ul>
   </nav>
  )
}

export default Sidebar
