(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.ZExportTable = {}));
})(this, (function (exports) { 'use strict';

    var defaultCss = "table {width: 80%;border-collapse: collapse;margin: auto;} th,td {padding: 10px;text-align: center;font-family: Arial, sans-serif;}";
    var defaultOption = {
        needDefaultCss: true,
        userCss: "",
        filename: "导出表格"
    };
    var ZExportTable = /** @class */ (function () {
        function ZExportTable() {
        }
        ZExportTable.exportTableToExcel = function (tableHTML, option) {
            //防止数字字符串变公式
            var processedTableHTML = tableHTML.replace(/(<td[^>]*>)(\+?\d[\d\- ]+)(<\/td>)/g, '$1\'$2$3');
            //使用传入进的option的属性值覆盖默认的属性值并生成一个新option
            option = Object.assign({}, defaultOption, option);
            // 创建完整的HTML页面内容
            var fullHTML = "\n        <html xmlns:o=\"urn:schemas-microsoft-com:office:office\" xmlns:x=\"urn:schemas-microsoft-com:office:excel\" xmlns=\"http://www.w3.org/TR/REC-html40\" lang=\"\">\n        <head>\n            <!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>\n            <x:Name>{sheetname}</x:Name>\n            <x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet>\n            </x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->\n            <title></title>\n            <style>\n                ".concat(option.needDefaultCss ? defaultCss : "", "\n                ").concat(option.userCss, "\n            </style>\n        </head>\n        <body>\n            ").concat(processedTableHTML, "\n        </body>\n        </html>\n    ");
            var url = URL.createObjectURL(new Blob([fullHTML], {
                type: 'application/vnd.ms-excel'
            }));
            // 创建一个 <a> 标签
            var a = document.createElement('a');
            a.href = url; // 设置下载的文件地址
            a.download = option.filename || '下载文件'; // 设置下载的文件名
            // 触发点击事件
            document.body.appendChild(a);
            a.click();
            // 清理资源
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        };
        return ZExportTable;
    }());

    exports.ZETUtil = ZExportTable;

}));
