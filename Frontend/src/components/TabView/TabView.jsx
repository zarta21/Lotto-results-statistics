import React, { useContext } from 'react'
import './tabView.scss'
import { AppContext } from '../../App'

const TabView = ({ tabs = [] }) => {

    const context = useContext(AppContext)

    const handleClick = (index) => {
        context.setActiveTab(index)
    }
    
    
  return (
    <div className='tabView'>
        <div className="container">
            {tabs.length === 0 
                ? (
                    <div className="tabs">
                        <label className='tab'>No tabs</label>
                    </div>
                )
                : (
                    <>
                        <div className="tabs">
                            {tabs.map((tab, index) => (
                                <label key={index} className={`tab tab-${index} ${index === context.activeTab ? 'active-tab' : ''} ${context.blurBackground ? 'blurBg' : ''}`} onClick={() => handleClick(index)}>{ tab.name }</label>
                            ))}
                        </div>
                        <div className={`content ${context.blurBackground ? 'blurBg' : ''}`}>{tabs[context.activeTab].content}</div>
                    </>
                )}
        </div>
    </div>
  )
}

export default TabView
