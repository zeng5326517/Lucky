var num6 = 0,num7 = 0,num8 = 0;//第N个位置显示的数字,默认为0
var flag6,flag7,flag8,flagall;//循环显示标识符,关闭循环显示时使用clearInterval(flag6);
var stopflag = 6;//停止位置标识符，数字为8时表示6、7位置都已关闭
var beginflag = false;//开始标识符，防止重复点击抽奖按钮，默认为false
var target;//中奖目标id
var name;//中奖目标姓名，从ajxa中获取

/**
 * 初始化界面，将八位数字显示在页面中
 * 学号的范围为20141641-20141928，所以前五位为20141，后三位初始化为000
 */
window.onload=function () {
    var one = document.getElementsByName("1")[0];
    var two = document.getElementsByName("2")[0];
    var three = document.getElementsByName("3")[0];
    var four = document.getElementsByName("4")[0];
    var five = document.getElementsByName("5")[0];
    var six = document.getElementsByName("6")[0];
    var seven = document.getElementsByName("7")[0];
    var eight = document.getElementsByName("8")[0];
    one.setAttribute("class","number2");
    two.setAttribute("class","number0");
    three.setAttribute("class","number1");
    four.setAttribute("class","number4");
    five.setAttribute("class","number1");
    six.setAttribute("class","number0");
    seven.setAttribute("class","number0");
    eight.setAttribute("class","number0");
}

/**
 *点击抽奖按钮的方法
 * 若开始标识符为false，说明还未开始，则执行，后三位初始化为最小学号值，并开始滚动数字
 * 若开始标识符为true，说明已经开始了，则什么也不做
 */
var begin = function(){
    var showname = document.getElementsByName("target")[0];
    showname.innerHTML = "";
    if(!beginflag){
        num6 = 6;
        num7 = 4;
        num8 = 1;
        flag6 = self.setInterval("change6()",20);
        flag7 = self.setInterval("change7()",20);
        flag8 = self.setInterval("change8()",20);
        beginflag=true;
    }
}

/**
 * 概率相等
 */
var balance = function () {
    var showname = document.getElementsByName("target")[0];
    showname.innerHTML = "";
    if(!beginflag){
        num6 = 6;
        num7 = 4;
        num8 = 1;
        flagall = self.setInterval("changeall()",1);
        beginflag=true;
    }
}
/**
 * change678为滚动后三位滚动数字的方法
 */
function change6() {
    num6++;
    if(num6>9)
        num6=6;
    var six = document.getElementsByName("6")[0];
    six.setAttribute("class","number"+num6);
}
function change7() {
    if(num6==6){
        num7++;
        if(num7>9)
            num7=4;
        var seven = document.getElementsByName("7")[0];
        seven.setAttribute("class","number"+num7);
    }else if(num6==9){
        num7++;
        if(num7>2)
            num7=0;
        var seven = document.getElementsByName("7")[0];
        seven.setAttribute("class","number"+num7);
    }else {
        num7++;
        if(num7>9)
            num7=0;
        var seven = document.getElementsByName("7")[0];
        seven.setAttribute("class","number"+num7);
    }
}
function change8() {
    if(num6==6&&num7==4){
        num8++;
        if(num8>9)
            num8=1;
        var eight = document.getElementsByName("8")[0];
        eight.setAttribute("class","number"+num8);
    }else if (num6==9&&num7==2){
        num8++;
        if(num8>8)
            num8=0;
        var eight = document.getElementsByName("8")[0];
        eight.setAttribute("class","number"+num8);
    }else {
        var eight = document.getElementsByName("8")[0];
        num8++;
        if(num8>9)
            num8=0;
        eight.setAttribute("class","number"+num8);
    }
}

/**
 * 三位同时改变641-928
 */
function changeall() {
    num8++;
    if(num8>9){
        num8=0;
        num7++;
        if(num7>9){
            num7=0;
            num6++;
        }
    }
    if((num6*100+num7*10+num8)>928){
        num6 = 6;
        num7 = 4;
        num8 = 1;
    }
    var eight = document.getElementsByName("8")[0];
    eight.setAttribute("class","number"+num8);
    var seven = document.getElementsByName("7")[0];
    seven.setAttribute("class","number"+num7);
    var six = document.getElementsByName("6")[0];
    six.setAttribute("class","number"+num6);
}
/**
 * 停止按钮
 * 当点击停止按钮时，先停止第六位数字，在停止第七位数字，再停止第八位数字
 * 停止第八位以后将开始标识符设置为false，以便再次抽奖
 * 停止第八位以后将停止标识符重置为6，以便下次重新从第六位开始停止
 */
var stop = function () {
    if(stopflag==6){
        clearInterval(flag6);
    }else if(stopflag==7){
        clearInterval(flag7);
    }else{
        clearInterval(flag8);
        beginflag = false;
    }
    stopflag++;
    if(stopflag>8){
        stopflag=6;
    }
}

var stopall = function () {
    clearInterval(flagall);
    beginflag = false;
}

function show() {
    target = "20141"+num6+num7+num8;
    alert(target);
}

/**
 * 发送异步请求，获取学生姓名
 */
function loadXMLDoc() {
    var xmlhttp;
    target = "20141"+num6+num7+num8;

    if(window.XMLHttpRequest)
        xmlhttp = new XMLHttpRequest();
    else
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");

    xmlhttp.open("GET","/Lucky/Lucky?studentNo="+target,true);
    xmlhttp.send();
    xmlhttp.onreadystatechange=function () {
        if (xmlhttp.readyState==4 && xmlhttp.status==200){
            name = xmlhttp.responseText;
            var showname = document.getElementsByName("target")[0];
            showname.innerHTML = name;
        }
    }
}