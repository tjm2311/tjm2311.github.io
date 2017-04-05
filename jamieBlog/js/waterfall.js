/**
 * Created by Administrator on 2016/1/18 0018.
 */
$(document).ready(function(){
    $(window).on("load",function(){
        imgLocation();
        //模拟网络数据获取图片
        var dataImg ={"data":[{"src":"1.jpg"},{"src":"2.jpg"},{"src":"3.jpg"},{"src":"4.jpg"},
            {"src":"5.jpg"},{"src":"6.jpg"},{"src":"7.jpg"},{"src":"8.jpg"},{"src":"9.jpg"},{"src":"10.jpg"},
            {"src":"11.jpg"},{"src":"12.jpg"}]};
        window.onscroll = function(){     //鼠标监听事件
            if(scrollside()){
                //使用each遍历
                $.each(dataImg.data,function(index,value){
                    //通过jQuery动态创建div及img
                    var box =$("<div>").addClass("box").appendTo($("#container"));//创建box
                    var content =$("<div>").addClass("content").appendTo(box);   //创建content
                    //console.log("./imges/" +$(value).attr("src"));
                    $("<img>").attr("src","../img/" +$(value).attr("src")).appendTo(content);//添加图片
                });
                imgLocation();//使添加的图片遵循这个位置格式
            }
        };
    });
});
/**
 * 图片位置
 * */
function imgLocation(){
    var box = $(".box");   //获取盒子
    var boxWidth = box.eq(0).width();      //获取盒子宽度
    var num = Math.floor($(window).width()/boxWidth);         //获取一排摆放图片的个数
    var boxArr = [];                   //用来储存所有盒子的高度
    //jqery的each()方法遍历取代for循环
    box.each(function(index,value){       //index用来确定图片的位置    value用来确定是哪一张图片
        //console.log(index +"--"+value);
        var boxHeight = box.eq(index).height();       //获取盒子高度
        if(index<num){               //第一排
            boxArr[index] = boxHeight;
            //console.log(boxHeight);
        }else{                //第二排
            var minboxHeight = Math.min.apply(null,boxArr);          //获取最小高度
            //console.log(minbixHeight);
            //!!!!!!!!inArray()方法
            var minboxIndex = $.inArray(minboxHeight,boxArr);        //获取最小图片的位置
            //console.log(minboxIndex);
            //摆放第二排图片位置
            $(value).css({
                "position":"absolute",           //!!!!!注意这里引号得到使用
                "top":minboxHeight,
                "left":box.eq(minboxIndex).position().left
            });
            //图片放在最低高度时重新计算高度
            boxArr[minboxIndex]+=box.eq(index).height();
        }
    });
}
/**
 * 图片加载位置
 * */
function scrollside(){
    var box = $(".box");
    //最后一张图片一半到上面整体的高度
    var lastboxHeight =box.last().get(0).offsetTop+Math.floor(box.last().height()/2);
    var documentHeight = $(document).width();    //当前视图的高度
    var scrollHeight =$(window).scrollTop();      //鼠标滚动的高度
    //大于则滚动，小于不滚动
    return(lastboxHeight<documentHeight+scrollHeight)?true:false;

}