import React, { useState, useEffect } from 'react';

import getData from '../../utils/getData'

// Style
import "./buyFontTab.modules.scss";

const BuyFontTab = (props) => {
    const [tabContent, setTabContent] = useState();

    useEffect(() => {
       (async () => {
            const tabDetailsJsonUrl = 'http://json.ffwagency.md/' + props.tabDetails.content_endpoint;
            const tabDetailsJson = await getData(tabDetailsJsonUrl);
            setTabContent(tabDetailsJson);
        })()
     }, [props.tabDetails.content_endpoint]);

     if (tabContent === undefined){return};
    return (
        <div className={`buy-font-tab ${(props.activeTab)?'':`hide`}`}>
            <div className='font-item'>{tabContent.content}</div>
        </div>
    );
  };
  
  export default BuyFontTab;