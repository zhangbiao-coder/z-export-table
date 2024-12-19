import {ToExcelOption} from "./option";

const  defaultCss = `table {width: 80%;border-collapse: collapse;margin: auto;} th,td {padding: 10px;text-align: center;font-family: Arial, sans-serif;}`;
const defaultOption: ToExcelOption = {
    needDefaultCss: true,
    userCss: "",
    filename: "导出表格"
}

export class ZExportTable{
    static exportTableToExcel(tableHTML: string, option: ToExcelOption) {
        //防止数字字符串变公式
        const processedTableHTML = tableHTML.replace(
            /(<td[^>]*>)(\+?\d[\d\- ]+)(<\/td>)/g,
            '$1\'$2$3'
        );

        //使用传入进的option的属性值覆盖默认的属性值并生成一个新option
        option = Object.assign({}, defaultOption, option);
        // 创建完整的HTML页面内容
        const fullHTML = `
        <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40" lang="">
        <head>
            <!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>
            <x:Name>{sheetname}</x:Name>
            <x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet>
            </x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
            <title></title>
            <style>
                ${option.needDefaultCss ? defaultCss : ""}
                ${option.userCss}
            </style>
        </head>
        <body>
            ${processedTableHTML}
        </body>
        </html>
    `;
        const url = URL.createObjectURL(new Blob([fullHTML], {
            type: 'application/vnd.ms-excel'
        }));
        // 创建一个 <a> 标签
        const a = document.createElement('a');
        a.href = url;         // 设置下载的文件地址
        a.download = option.filename || '下载文件'; // 设置下载的文件名

        // 触发点击事件
        document.body.appendChild(a);
        a.click();

        // 清理资源
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}