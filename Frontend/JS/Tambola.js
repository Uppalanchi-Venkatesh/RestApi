var arr=[];
var m,v=0;

function myFunction(){
    for(m=0;m<90;m++)
        arr[m]=m+1;
    var i, j, temp;
    for (i = arr.length -1; i > 0; i--) {
        j = Math.floor(Math.random() * (i+1));
        temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
}

function generateNum(){
    if(v==0)
        myFunction();
    if(v!=90){
        document.getElementById("rcorners1").innerHTML=arr[v];
        if(v>0)
            document.getElementById("rcorners2").innerHTML=arr[v-1];
        m="n"+arr[v];
        document.getElementById(m).innerHTML=arr[v];
        v++;
    }
    else{
        window.alert("Game End");
        window.alert("Restart Game Again");
    }
}

function clearboard(){
    document.getElementById("rcorners1").innerHTML="";
    document.getElementById("rcorners2").innerHTML="";
    for(let i=0;i<90;i++){
        arr[i]=i+1;
        m = "n" + arr[i];
        document.getElementById(m).innerHTML="";
    }
    v=0;
}
