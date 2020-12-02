const fs = require('fs') 


function readFile(path, onReadComplete)
{
    fs.readFile(path, (err, data) => 
    { 
        if (err) 
            throw err;

        if(typeof onReadComplete === 'function' && data !== null)
            onReadComplete(data.toString());         
    }) 
}

function createFile(data)
{
    fs.writeFile('../pegtest/grid.txt', data, (err) => 
    { 
        if (err) throw err; 
    }) 
}

function parseData(data) 
{
    var fileString = data.toString();
    var rows = fileString.split("\n");
    var arr = [];

    for(var i = 0; i < rows.length; i++) 
    {
        var column = rows[i].split(";");
        var castedColumn = column.map(number=>{return parseInt(number);});
        arr.push(castedColumn);
    }
    
    return arr;
}


// jk : first element
// xy : second element
function swapElementsInData(data, j, k, x ,y) 
{
    let n = data[j][k];
    let u = data[x][y];

    if(typeof n !== 'undefined' && typeof x !== 'undefined')
    {
        data[j][k] = u;
        data[x][y] = n;
    }
}

 
function printTableInConsole(tableData, totalsRow)
{
    let printData = transposeArray(tableData);
    var arr = [];

    printData.forEach(col =>
    {  
        var column = col.toString().replace(/,/g, ' ');

        console.log(column);

        arr.push(column + "\n");
    });

    if(typeof totalsRow !== 'undefined' && totalsRow !== null)
    {
        var row = totalsRow.toString().replace(/,/g, ' ');

        console.log(row);
        
        arr.push(row + "\n");
    }
    createFile(arr.toString());
}

function start()
{
    readFile('../pegtest/data.txt', (data)=>
    {
        var tableData = parseData(data);

        let row = calculateRowSum(tableData);

        printTableInConsole(tableData, row);

        console.log('swapping 8 and 10');

        swapElementsInData(tableData, 0,0,1,1);

        let swappedSumRow = calculateRowSum(tableData);

        printTableInConsole(tableData, swappedSumRow);  
    });
}

function transposeArray(tableData)
{
    let transposedData = [];

    let rows = tableData[0].length;
  
    for(let i = 0; i < rows; i++)
    {
        let newRow = [];

        for(let c = 0; c < tableData.length; c++)
        {
            newRow.push(tableData[c][i]);                
        }
        transposedData.push(newRow);
    }

    return transposedData;
}

function calculateRowSum(tableData)
{
    return tableData.map(col=>
    {
        return col.reduce((a,b)=> a+b);
    });
}


start();
