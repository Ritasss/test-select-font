import React, { useState, useEffect } from 'react';
// import { createStore } from 'redux';
// import { getStore } from './store';
// import {
//     createEntityAdapter,
//     createSlice,
//     configureStore,
//   } from '@reduxjs/toolkit'

import getData from '../../utils/getData'

// Style
import "./myFontTab.modules.scss";

// const userAdapter = createEntityAdapter();

// // needs to know the location of this slice in the state
// export const userSelectors = userAdapter.getSelectors((state) => state.users);

// export const { selectById: selectUserById } = userSelectors;


const MyFontTab = (props) => {
    const [tabContent, setTabContent] = useState();
    const [selectedFont, setSelectedFont] = useState('');

    const fontItemOnClick = (targetFontId)=> {
        setSelectedFont(targetFontId);
    }
    useEffect(() => {
       (async () => {
            const tabDetailsJsonUrl = 'http://json.ffwagency.md/' + props.tabDetails.content_endpoint;
            const tabDetailsJson = await getData(tabDetailsJsonUrl);
            setTabContent(tabDetailsJson);
        })()
     }, [props.tabDetails.content_endpoint]);

     if (tabContent === undefined){return};
    return (
        <div className={`my-font-tab ${(props.activeTab)?'':`hide`}`}>
            {
                tabContent.content.map(fontItem => {
                    return (
                        <button className={`font-item ${(selectedFont && selectedFont === fontItem.id)? `selected`:''}`} key={fontItem.id} onClick={()=>fontItemOnClick(fontItem.id)}>
                            <div className='font-color-section'>
                                <div className='font-color' style={{background: `${fontItem.color}`}}> </div>
                                <div className='font-abbr'>{fontItem.abbr}</div>
                            </div>
                            <ul className='font-label'>
                                <li><span className='label-content'>{fontItem.label}</span></li>
                            </ul>
                        </button>
                    );
                })
            }
        </div>
    );
  };
  
  export default MyFontTab;