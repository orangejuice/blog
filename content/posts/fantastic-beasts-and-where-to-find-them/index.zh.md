---
title: md测试测试测试
date: 2019-11-01
tags:
  - Novel
---

import SpotifyPlayer from "./SpotifyPlayer";

Here will a React component go:

<SpotifyPlayer
  uri="spotify:user:bbcamerica:playlist:3w18u69NplCpXVG4fQG726"
  size="large"
  theme="black"
  view="list"
/>

Here will a live code example go:


```js react-live
const onClick = () => {
  alert("You opened me")
};
render(<button onClick={onClick}>Alohomora!</button>);
```

Here will a normal code block go:

```js
(function() {

var cache = {};
var form = $('form');
var minified = true;

var dependencies = {};

var treeURL = 'https://api.github.com/repos/PrismJS/prism/git/trees/gh-pages?recursive=1';
var treePromise = new Promise(function(resolve) {
	$u.xhr({
		url: treeURL,
		callback: function(xhr) {
			if (xhr.status < 400) {
				resolve(JSON.parse(xhr.responseText).tree);
			}
		}
	});
});
```

