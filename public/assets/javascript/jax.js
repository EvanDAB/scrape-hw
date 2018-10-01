$.ajax({
	url: '/all',
	method: 'GET'
}).then(function(data){
	console.log(data);
	var articles, title, summary, url, picUrl, p, img, div, buttonC, buttonA, hDiv, addInp;
	for (var i=0; i<data.length; i++) {
		articles = data[i];
		title = data[i].title;
		summary = data[i].summary;
		url = data[i].url;
		picUrl = data[i].picUrl;

		hDiv = $('<div class="toggle-display">').hide();
		// addInp = $('<form method="post" action="/post-comment" class="comment-form"><input>').hide();
		buttonC = $('<button class="toggle-comments">');
		buttonA = $('<button class="add-comment">');
		p = $('<p>');
		h3 = $('<h3>')
		img = $('<img class="clickable">');

		hDiv.text("Can you see me now?");
		
		buttonC.text('Display Comments');
		buttonA.text('Add a Comment');
		p.html(`<p>${summary} <br> ${url}`);
		h3.text(title);
		img.attr('src', picUrl);
		
		// div = $('<div class="container">').append(img).append(p).append(buttonC).append(buttonA).append(hDiv).prepend(addInp);
		div = $('<div class="container">').append(img, h3, p, buttonC, buttonA, hDiv);
		$('body').append(div);
		
	}
});

$.ajax({
	
})