import React, { useState, useEffect } from 'react';

import getData from '../../utils/getData'

// Style
import "./tab.modules.scss";

// Components
import MyFontTab from '../MyFontTab/MyFontTab';
import BuyFontTab from '../BuyFontTab/BuyFontTab';



const Tab = (props) => {

    const [tabData, setTabData] = useState([]);
    const [activeTab, setActiveTab] = useState();

    const tabItemOnClick = (targettTabId) => {
        setActiveTab(targettTabId);
        // updateTabContent(targettTabId);
    }

     useEffect(() => {
        (async () => {
            // console.log("🚀 ~ file: tab.js ~ line 18 ~ fetchtabData ~ fetchtabData", await fetchtabData())
            const tabJson = await getData('http://json.ffwagency.md/tabs');
            setTabData(tabJson);
            setActiveTab(tabJson[0].id);
         })()
      }, []);

      if (tabData.length < 1) {return}

    //   updateTabContent(activeTab);
        
      return (
        <div className='tab-container'>
            <div className='tab-section'>
                {(activeTab === 101)?<div className='tab-title'>Please select one font</div>:''}
                <div className='tab-item-section'>
                    {tabData.map((tabItem,idx) => {
                        return <button onClick={() => tabItemOnClick(tabItem.id)} className={`tab-item ${(activeTab === tabItem.id)?`active`:''}`} key={tabItem.id}>{tabItem.label}</button>

                    })}
                </div>
            </div>
            <div className='tab-content'>
                <MyFontTab activeTab={(activeTab === 101)?true:false} tabDetails={tabData[0]}></MyFontTab>
                <BuyFontTab activeTab={(activeTab === 102)?true:false} tabDetails={tabData[1]}></BuyFontTab>
            </div>
        </div>
    );
  };
  
  export default Tab;