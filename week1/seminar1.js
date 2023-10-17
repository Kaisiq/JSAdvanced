//task 1 : multiply 2 matrices

function getDimensions(m){
    var results = [];
    results.push(m.length);
    results.push(m[0].length);
    return results;
}

function zeroMatrix(r,c){
    var resMatrix = []
    for(var i=0; i<r; i++){
        resMatrix.push([]);
        for(var j=0; j<c; j++){
            resMatrix[i].push(0);
        }
    }
    return resMatrix;
}


function multiplyMatrix(m1, m2){

    var m1Dims = getDimensions(m1);
    var m2Dims = getDimensions(m2);
    var resMatrix = zeroMatrix(m1Dims[0], m2Dims[1]);
    
    if(m1Dims[1] != m2Dims[0]){
        console.log(m1Dims[1], m2Dims[0]);
        throw("cant multiply matrices");
    }
    
    for(i=0; i<m1Dims[0]; i++){
        for(j=0; j<m2Dims[1]; j++){
            for(k=0; k<m1Dims[1]; k++){
                resMatrix[i][j] += m1[i][k] + m2[k][j];
            }
        }
    }

    return resMatrix;
}


// 1 2 3   5 5 5
// 4 5 6   5 5 5
// 7 8 9   5 5 5


function test(){
    var m1 = [[1,2,3],[4,5,6],[7,8,9]];
    var m2 = [[5,5,5],[5,5,5],[5,5,5]];
    var m3 = multiplyMatrix(m1,m2);
    console.log(m3);
}

// test();




//Task 2 : QuickSort

function selectPivot(arr){
    return arr[arr.length-1];
}

function partition(arr){
    if(arr.length == 0){
        return arr;
    }
    else if(arr.length == 1){
        return arr;
    }
    else{
        var pivot = selectPivot(arr);
        var toSort1 = [];
        var toSort2 = [];

        len = arr.length - 1;
        for(i=0; i<len; i++){
            if(arr[i] < pivot){
                toSort1.push(arr[i]);
            }
            else{
                toSort2.push(arr[i]);
            }
        }

        partition(toSort1);
        partition(toSort2);
        var res = [];
        res = res.concat(toSort1);
        res.push(pivot);
        res = res.concat(toSort2);
        return res;
    }
}

function quickSort(arr){
    console.log(partition(arr));
}

// quickSort([10,80,30,90,40,50,70]);


function assessPlus(str){
    var strAfter = [];
    var strLen = str.length;
    var k = -1;
    for(i=0; i<strLen; i++){
        if(str[i] !== "+"){
            strAfter.push(str[i]);
            k++;
        }
        else{
            strAfter[k] = Number(strAfter[k]) + Number(str[i+1]);
            i++;
        }
    }
    
    return strAfter;
}

function assessMinus(str){
    var strAfter = [];
    var strLen = str.length;
    var k = -1;
    for(i=0; i<strLen; i++){
        if(str[i] !== "-"){
            strAfter.push(str[i]);
            k++;
        }
        else{
            strAfter[k] = Number(strAfter[k]) - Number(str[i+1]);
            i++;
        }
    }
    
    return assessPlus(strAfter);
}

function assessMult(str){
    var strAfter = [];
    var strLen = str.length;
    var k = -1;
    for(i=0; i<strLen; i++){
        if(str[i] !== "*"){
            strAfter.push(str[i]);
            k++;
        }
        else{
            strAfter[k] = Number(strAfter[k]) * Number(str[i+1]);
            i++;
        }
    }

    return assessMinus(strAfter);
}

function assessDel(str){
    var strAfterDel = [];
    var strLen = str.length;
    var k = -1;
    for(i=0; i<strLen; i++){
        if(str[i] !== "/"){
            strAfterDel.push(str[i]);
            k++;
        }
        else{
            strAfterDel[k] = Number(strAfterDel[k]) / Number(str[i+1]);
            i++;
        }
    }
    return assessMult(strAfterDel);
}

function assessHelper(str){
    var str = str.split(" ");
    return assessDel(str);
}

function assessString(str){
    strArr = str.split(" = ");
    var len = strArr.length-1;
    var last = strArr.length-1;
    for(var i=0; i<len; i++){
        var assessed = assessHelper(strArr[i]);
        console.log(assessed);
        strArr[i] = assessed;
    }
    var count = 0;
    for(var i=0; i<len; i++){
        if(strArr[i] == strArr[last]){
            count++;
        }
    }
    var res = count + "/" + last;
    console.log(res);
}

assessString("5 + 3 = 3 + 5 = 8")
assessString("7 - 3 * 2 + 1 = 4 * 2 + 1 = 8 + 1 = 9")