// import { BrowserWindow } from "electron";
import remote from '@electron/remote';
import BrowserWindow from '@electron/remote';

import React from 'react';
import './Titlebar.css';


(() => {

    document.onreadystatechange = () => {
        let init = () => {
            
            let win: BrowserWindow = remote.getCurrentWindow();

            let togMax = () => {
                win.isMaximized() ?
                    $(".icon-toggle").removeClass("icon-max").addClass("icon-unmax") :
                    $(".icon-toggle").removeClass("icon-unmax").addClass("icon-max");
            }

            let minBtn = document.getElementById("minimize-window");
            let maxToggleBtn = document.getElementById("maximize-toggle-window");
            let closeBtn = document.getElementById("close-window");

            minBtn.addEventListener("click", e => {
                win = remote.getCurrentWindow(); win.minimize();
            });

            maxToggleBtn.addEventListener("click", e => {
                win = remote.getCurrentWindow(); win.isMaximized() ? win.unmaximize() : win.maximize();
            });

            closeBtn.addEventListener("click", e => {
                win = remote.getCurrentWindow(); win.close();
            })

            togMax();
            win.on("maximize", togMax);
            win.on("unmaximize", togMax);
        }

        if (document.readyState == "complete") { init(); }
    }
    console.log("YAYAY")
})();

interface TitlebarProp {
    label: string;
}

interface TitlebarButtonProp {
    id: string;
    iconClass: string;
}

function TitlebarButton(props: TitlebarButtonProp) {
    return (
        <div className="titlebar-button" id={props.id}>
            <div className={props.iconClass} />
        </div>
    );
}

function Titlebar(props: TitlebarProp) {
    return (
        <div className="part titlebar">
            <div className="titlebar-drag" />

            {/* <AppLogo iconClass="icon icon-pslogo" /> */}

            <div className="titlebar-label"> {props.label} </div>

            <div className="titlebar-controls">
                <TitlebarButton id="minimize-window" iconClass="icon icon-min" />
                <TitlebarButton id="maximize-toggle-window" iconClass="icon icon-unmax icon-toggle" />
                <TitlebarButton id="close-window" iconClass="icon icon-close" />
            </div>
        </div>
    );
}

export default Titlebar;
