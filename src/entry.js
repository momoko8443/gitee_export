import {generateExcel} from './report_export';
const { dialog } = require('electron').remote;
exportBtn.onclick = function(){
    //alert('aaa');
    dialog.showSaveDialog({defaultPath:'tasks.xlsx'},(fileName) => {
        if (fileName === undefined){
            console.log("You didn't save the file");
            return;
        }
    
        generateExcel(fileName);
        // fileName is a string that contains the path and filename created in the save file dialog.  
        // fs.writeFile(fileName, content, (err) => {
        //     if(err){
        //         alert("An error ocurred creating the file "+ err.message)
        //     }
                        
        //     alert("The file has been succesfully saved");
        // });
    }); 
    
}