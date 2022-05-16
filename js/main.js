window.onload = () => {
	'use strict';
	if ('serviceWorker' in navigator) {
		navigator.serviceWorker
		.register('/sw.js');
	}
	(function() {
		var qset;
		function showQuestion(){
			var qGroup = window[$("#qGroup").val()];
			var len = qGroup.length;
			var ran = Math.floor(Math.random() * len);
			qset = qGroup[ran];
			$("#question").html(qset.q);
			$("#explanation").html("");
			$("#answers").empty();
			qset.opt.forEach((e,i)=>{
				$("#answers")
				.append($("<label/>")
				.append($("<input/>",{ type:"radio", name:"opt",value:i}))
				.append(e)
				);
			});
		}
		$("#submit").on("click", ()=>{
			var t = $(':radio:checked').val();
			var correct = "abcdef".indexOf(qset.ans);
			// color the answers
			$($(':radio')[correct]).parent().css({
				"background-color": "lightgreen"
			});
			if(correct != $(":input:checked").val()){
				$(':radio:checked').parent().css({"background-color": "red"});
			}
			$("#explanation").html(qset.explanation);
		});
		$("#next").on("click", ()=>{
			showQuestion();
		});
	})();
}
