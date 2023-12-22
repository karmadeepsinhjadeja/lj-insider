import React from "react"
import "../css/SidebarOption.css"

function SidebarOption({ active,text,Icon,link}) {
    return (
        <div className={`sidebarOption ${active && 'sidebarOption--active'}`}>
          <Icon/>
          <h3><a href={link} style={{textDecorationLine:"none",color:"white"}}>{text}</a></h3>
        </div>
    );
};

export default SidebarOption
