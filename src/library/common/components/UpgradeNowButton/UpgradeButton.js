import React, { useState } from 'react';
import MoshVipModel from '../MoshVipModel/MoshVipModel';

const UpgradeButton = () => {
    const [VipModel, setVipModel] = useState(false);
    const hideVipModel = () => {
        setVipModel(false)
    }
    const handleShowVipModel = () => {
        setVipModel(true);
        window.setTimeout(() => {
            document.getElementById("vipModalAdd").click();
        }, 0)
    }
    return (
        <>
            <a onClick={() => handleShowVipModel()} className="upgrade-btn btn">Upgrade Now</a>
            <MoshVipModel showModel={VipModel}
                hideModel={hideVipModel}
            />
        </>
    )
}   
export default UpgradeButton