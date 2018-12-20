import $ from 'jquery';
import * as escodegen from 'escodegen';

import {parseCode, /*createMyList, sub,*/ paintArray,task2} from './code-analyzer';


$(document).ready(function () {
    $('#codeSubmissionButton').click(() => {
        alert('5a');
        let codeToParse = $('#codePlaceholder').val();
        let vector = $('#vector').val();
        var vectorDict = JSON.parse(vector);
        let parsedCode = parseCode(codeToParse);
        let qua2 = task2(parsedCode,vectorDict);
        let literalCode = escodegen.generate(qua2);
        let lines = literalCode.split('\n');
        let finalCode = makingFinalCodeString(lines);
        //var myList = createMyList(parsedCode);
        //   var htmlTableString= makingHtmlStringTable(myList);
        /*$('#parsedCode').val(JSON.stringify(myList, null, 2));*/
        // $('#dataTable').html(finalString);
        //   $('#codePlaceholder').val(JSON.stringify(parsedCode, null, 2));
        // $('#parsedCode').val(JSON.stringify(literalCode, null, 2));
        $('#parsedCode').html(finalCode);
    });
});

const makingFinalCodeString =(list)=> {
    let counterIf=0;
    let str='';
    for(var i=0;i<list.length;i++){
        if(list[i].indexOf('if')>-1){
            if(paintArray.includes(counterIf)) {
                str = str + '<div style="background: green;">' + list[i] + '</div>';
            }
            else {
                str = str + '<div style="background: red;">' + list[i] + '</div>';
            }
            counterIf++;
        }
        else{
            str=str+'<div >' + list[i] + '</div>';
        }
    }
    return str;
};

/*
const makingHtmlStringTable =(list)=> {
    var str= '<tr> <td> Line </td> <td> Type </td> <td> Name </td> <td> Condition </td> <td> Value </td> </tr> ';
    var line,type,name,cond,value,tempLine;
    for(var i=0;i<list.length;i++){
        line=list[i].line;
        type=list[i].type;
        name=list[i].name;
        cond=list[i].condition;
        value=list[i].value;
        tempLine='<tr> ' + '<td> ' + line + '</td> ' + '<td> ' + type + '</td> ' + '<td> ' + name +  '</td> ' + '<td> ' + cond + '</td> ' + '<td> ' + value + '</td> </tr> ';
        str=str+tempLine;
    }
    return str;
};*/
