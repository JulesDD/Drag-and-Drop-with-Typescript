//Creating a simple drag and drop app.
//app.js and app.css is now know as dragNdrop respectively.
//removed the .dist feature in index.html.
//changed the css file location. 

//One way of importing typescript files 
// /// <reference path="Components/projInput.ts"/>
// /// <reference path="Components/projList.ts"/>

import { dragNdrop } from './Components/projInput';
import { dragNdropList } from './Components/projList';
 

    new dragNdrop();
    new dragNdropList('active');
    new dragNdropList('finished');

