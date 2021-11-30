import XLSX from "xlsx";

const StudentListTemplate = () => {
    var wb = XLSX.utils.book_new();
    wb.Props = {
                    Title: "SheetJS Tutorial",
                    Subject: "Test",
                    Author: "Red Stapler",
                    CreatedDate: new Date(2017,12,19)
            };
    wb.SheetNames.push("Test Sheet");
    var ws_data = [['StudentID' , 'Name']];  //a row with 2 columns
    var ws = XLSX.utils.aoa_to_sheet(ws_data);
    wb.Sheets["Test Sheet"] = ws;
    var wbout = XLSX.write(wb, {bookType:'xlsx',  type: 'binary'});
    function s2ab(s) { 
                    var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
                    var view = new Uint8Array(buf);  //create uint8array as viewer
                    for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF; //convert to octet
                    return buf;    
    }
    return new Blob([s2ab(wbout)],{type:"application/octet-stream"})
}
const StudentGradeTemplate = () => {
    var wb = XLSX.utils.book_new();
    wb.Props = {
                    Title: "SheetJS Tutorial",
                    Subject: "Test",
                    Author: "Red Stapler",
                    CreatedDate: new Date(2017,12,19)
            };
    wb.SheetNames.push("Test Sheet");
    var ws_data = [['StudentID' , 'Grade']];  //a row with 2 columns
    var ws = XLSX.utils.aoa_to_sheet(ws_data);
    wb.Sheets["Test Sheet"] = ws;
    var wbout = XLSX.write(wb, {bookType:'xlsx',  type: 'binary'});
    function s2ab(s) { 
                    var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
                    var view = new Uint8Array(buf);  //create uint8array as viewer
                    for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF; //convert to octet
                    return buf;    
    }
    return new Blob([s2ab(wbout)],{type:"application/octet-stream"})
}
const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
  
      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
  
        const wb = XLSX.read(bufferArray, { type: "buffer" });
  
        const wsname = wb.SheetNames[0];
  
        const ws = wb.Sheets[wsname];
  
        const data = XLSX.utils.sheet_to_json(ws);
  
        resolve(data);
      };
  
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  
    promise.then((d) => {
     console.log(d)
    });
  };
export { StudentListTemplate, StudentGradeTemplate, readExcel} 