//ajax请求的函数



window.onload = function(){
	var showNew = document.getElementsByClassName('showNew');
	for(let i = 0;i < showNew.length;i++){
		showNew[i].addEventListener("click",function(){
			var spans = showNew[i].getElementsByTagName("span");
			var text = spans[0].innerHTML;
			//"：",注意使用中文冒号
			var title = text.split("：")[1];
			window.location.href = "detail?text=" + title;
		})
	}
}