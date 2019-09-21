const url = window.location.href;
console.log(`.${url.split("/")[3]}link`);
$(`.${url.split("/")[3]}link`).addClass("you-are-here");