//const request = require('request');
import {generate} from './excel_generator';
//const  fetch = require('electron-fetch');
import * as request from 'request';


function getJsonDataFromGitee(){
    let queryURL = 'https://gitee.com/api/v5/repos/eastvillage/tasks/issues?'
        + 'access_token=e38b72f47324d384ac904c20e4e1fce1&'
        + 'state=all&'
        + 'sort=created&'
        + 'direction=desc&'
        + 'page=1&' 
        + 'per_page=20&' 
        + 'assignee=luhuijuan';
    return new Promise( (resolve, reject) => {
        request(queryURL, {json: true}, (err, res ,result)=>{
            resolve(result);
        });
    })
} 

async function slimData(){
    let tasks = await getJsonDataFromGitee();
    let liteTasks = [];
    for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i];
        let liteTask = {};
        liteTask['todo'] = task.title;
        liteTask['start'] = new Date().toLocaleDateString();
        liteTask['assignee'] = task.assignee.name;
        liteTask['comment'] = '';
        liteTask['reply'] ='';
        liteTasks.push(liteTask);
    }
    return liteTasks;
}



export const generateExcel = async function (fileName){
    let data = await slimData();
    await generate(data, fileName);
}

