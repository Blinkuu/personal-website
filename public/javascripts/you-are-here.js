const url = window.location.href;
$(`.${url.split("/")[3]}link`).addClass("you-are-here");