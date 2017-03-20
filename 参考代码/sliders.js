   //1.数据定义
    var data = [
    {img:1,h1:'Creative',h2:'DUET'},
    {img:2,h1:'Friendly',h2:'DEVIL'},
    {img:3,h1:'Tranquilent',h2:'COMPATRIOT'},
    {img:4,h1:'Insecure',h2:'HUSSLER'},
    {img:5,h1:'Loving',h2:'REBEL'},
    {img:6,h1:'Passionate',h2:'SEEKER'},
    {img:7,h1:'Crazy',h2:'FRIEND'}
    ];
    var _href = [
{href:'1'},
{href:'2'},
{href:'3'},
{href:'4'},
{href:'5'},
{href:'6'},
{href:'7'}
];
    //2. 定义通用函数
    var g = function (id) {
        if (id.substr(0,1) == '.') {
            return document.getElementsByClassName(id.substr(1));
        } else {
        return document.getElementById(id);
        }
    }
    // 3.添加幻灯片操作
function addhref() {
var arr = g('.img_a');
for (i=0;i<arr.length-1;i++){
arr[i].setAttribute("href",_href[i].href);
}
}
    function addSliders() {
        var tpl_main = g('template_main').innerHTML.replace(/^\s*/,'').replace(/\s*$/,'');
        var tpl_ctrl = g('template_ctrl').innerHTML.replace(/^\s*/,'').replace(/\s*$/,'');
        var out_main = [];
        var out_ctrl = [];
        
        for (i in data) {
            var _html_main = tpl_main.replace(/{{index}}/g,data[i].img)
                                    .replace(/{{h2}}/g,data[i].h1)
                                    .replace(/{{h3}}/g,data[i].h2)
                                    .replace(/{{css}}/g,['','main-i_right'][i%2]);
            var _html_ctrl = tpl_ctrl.replace(/{{index}}/g,data[i].img);
            out_main.push(_html_main);
            out_ctrl.push(_html_ctrl);
            }

            g('template_main').innerHTML = out_main.join('');
            g('template_ctrl').innerHTML = out_ctrl.join('');

            g('template_main').innerHTML +=  tpl_main.replace(/{{index}}/g,'{{index}}').replace(/{{h2}}/g,data[i].h1).replace(/{{h3}}/g,data[i].h2);
            g('main_{{index}}').id = 'main_background';
    }
    var cur_index;
    function switchSlider(n) {
        //获得要展现的幻灯片&按钮
        cur_index = n;
        var main = g('main_'+n);
        var ctrl = g('ctrl_'+n);
        //获得所有的幻灯片&按钮
        var clear_main = g('.main-i');
        var clear_ctrl = g('.ctrl-i');
        // 清除样式
        for (i=0;i<clear_ctrl.length;i++) {
            clear_ctrl[i].className = clear_ctrl[i].className.replace(' ctrl-i_active', '');
            clear_main[i].className = clear_main[i].className.replace(' main-i_active', '');
        }
        //为当前按钮增加样式
        main.className += ' main-i_active';
        ctrl.className += ' ctrl-i_active';
        //延迟展现背景
        setTimeout(function() {g('main_background').innerHTML = main.innerHTML;},1000);
        
        }
    window.onload = function() {
        addSliders();
switchSlider(1);
addhref();
        var pic_jud = g('.picture').length;
        var timer;
        var ind = 2;
        var flag = true;
        timer = setInterval(function(){
            switchSlider(ind);
            ind++;
            if (ind === pic_jud) {
                ind = 1;
            }}, 2000);
        document.getElementById("template_main").onmouseover = document.getElementById("template_ctrl").onmouseover = function () {
            clearInterval(timer);
            flag = false;
        }
        document.getElementById("template_main").onmouseout = document.getElementById("template_ctrl").onmouseout = function () {
            timer = setInterval(function(){
            if (!flag) {
                ind = cur_index;
                flag = true;
            }

            switchSlider(ind);
            ind++;
            if (ind === pic_jud) {
                ind = 1;
            }}, 3000);
        }
    }