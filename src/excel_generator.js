import * as Excel from 'exceljs';

export const generate = function (results, fileName) {
    return new Promise(function (resolve, reject) {
        var workbook = new Excel.Workbook();
        var worksheet = workbook.addWorksheet("My Sheet");
        worksheet.columns = [{
                header: '待办事项',
                key: 'todo',
                width: 80
            },
            {
                header: '起始日期',
                key: 'start',
                width: 30
            },
            {
                header: '负责人',
                key: 'assignee',
                width: 30
            },
            {
                header: '备注',
                key: 'comment',
                width: 50
            },
            {
                header: '反馈',
                key: 'reply',
                width: 50
            }

        ];
        for (var i = 0; i < results.length; i++) {
            var task = results[i];
            worksheet.addRow(task).commit();
        }

        //worksheet.addRows(results);
        workbook.xlsx.writeFile(fileName).then( ()=>{
            alert("xls file is written.");
            resolve();
        });
    });
}