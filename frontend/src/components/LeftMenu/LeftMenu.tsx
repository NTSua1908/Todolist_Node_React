import React from "react";
import "./leftMenu.css";
import { MdClose } from "react-icons/md";
import Logo from "../../images/logo.png";

interface LeftMenuProps {
    projectName: string;
}

function LeftMenu({ projectName }: LeftMenuProps) {
    return (
        <div className='leftMenu'>
            <div className='leftMenu-header'>
                <div className='leftMenu-logo'>
                    <img src={Logo} alt='Odotaus' />
                </div>
                <div className='leftMenu-info'>
                    <div className='leftMenu-info-name'>Odotaus</div>
                    <div className='leftMenu-info-project'>{projectName}</div>
                </div>
                <div className='leftMenu-button'>
                    <MdClose />
                </div>
            </div>
            <div className='leftMenu-content'></div>
        </div>
    );
}

export default LeftMenu;
