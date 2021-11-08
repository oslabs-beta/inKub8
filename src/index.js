const { Terminal } = require("xterm");

import { ViewModuleSharp } from "@mui/icons-material";
import { blue } from "@mui/material/colors";

const logoString = 
` _           _  __          _        ___\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b
(_)         | |/ /         | |      / _ \\\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b
 _   _ __   | ' /   _   _  | |__   | (_) |\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b
| | | '_ \\  |  <   | | | | | '_ \\   > _ < \b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b
| | | | | | | . \\  | |_| | | |_) | | (_) |\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b\b
|_| |_| |_| |_|\\_\\  \\__,_| |_.__/   \\___/ `;


export default function buildTerminal() {
    let term = new Terminal({theme: {background: 'black', foreground: '#84a6ee', selection: '#336be4', cursorAccent: '#336be4'
  }});
    console.log(document.getElementById("terminal"))
    term.open(document.getElementById("terminal")); 
    term.write('Welcome to inKub8!  ');
       term.onData(e => {
      // console.log(e)
      window.bridge.send('terminal.toTerm', e);
      // term.write(e);
    });

    window.bridge.receive('terminal.incData', function(event, data){
        term.write(event);
    });
};

