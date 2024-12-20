# z-export-table

一款简单的html的table片段导出为excel表格的工具.

### 测试地址：`https://github.com/zhangbiao-coder/z-export-table/blob/master/dist/example/index.html
(可以复制html代码测试)

## 使用

### **安装**

#### **npm命令安装**

```shell
npm i z-export-table
```

#### **html页面中直接使用script标签引入，这种方式需要手动添加html2canvas的依赖**

```html
<script src="../z-export-table.umd.min.js"></script>
```


### **示例**

#### **快速使用**

```html
<button type="button" onclick="exportsExcel()">导出Excel</button>
```
```javascript
let {ZETUtil} = ZExportTable;
function exportsExcel() {
  let option = {
    filename: "测试",
  };
  ZETUtil.exportTableToExcel(document.getElementById("table").outerHTML, option);
}
```


#### **在模块中使用**

```javascript
import {ToExcelOption, ZETUtil} from 'z-export-table';
...

@ViewChild("table") table: ElementRef | undefined;

exportsExcel() {
  let option: ToExcelOption = {
    filename: "复杂html导出Excel测试",
    userCss: `table { width: 100%; border-collapse: collapse; margin: 20px 0;}`
  };
  if (this.table) {
    ZETUtil.exportTableToExcel(this.table.nativeElement.outerHTML, option);
  }
}

```

#### **option说明**

#### option属性简单说明
| 参数     | 类型 | 默认                                        | 必填 | 说明                                      |
|--------|---|-------------------------------------------|----|-----------------------------------------|
| needDefaultCss | boolean  | true                                      | 可选 | 是否需要默认css |
| userCss | string | ""                                | 可选 | 自定义css         |
| filename  | string | 导出表格                            | 可选 | 导出文件名称        |

#### option接口
```javascript
export interface ToExcelOption {
  //是否需要默认css
  needDefaultCss?: boolean,
          //自定义css
          userCss?: string,
          //导出文件名称
          filename?: string
}
```
## 版本
**现在最新版是1.0.6**

- **1.0.6** `最新`
  简化代码，完善文档

- **1.0.5** `历史`
  完成工具开发
