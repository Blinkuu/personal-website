const express = require("express");
const router = express.Router();

const content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi mi orci, tincidunt nec tellus eget, feugiat pharetra orci. Fusce eu dignissim purus. Nullam dignissim nisi lectus, sit amet scelerisque ligula euismod id. Morbi faucibus, massa at mollis molestie, ipsum risus sagittis elit, vel ultricies turpis dolor non ex. Aliquam erat volutpat. Morbi porta, libero quis porta cursus, nulla turpis pellentesque nibh, rutrum elementum massa nunc ut nulla. Pellentesque efficitur libero sem, nec accumsan dui fermentum vel. Sed condimentum bibendum pharetra. Vestibulum quis tortor nec tellus viverra ultricies. Donec rutrum ullamcorper dignissim.\
Quisque quis quam odio. Duis iaculis magna eu commodo euismod. Vestibulum interdum convallis molestie. Duis sit amet libero tortor. Nulla lobortis est id mattis egestas. Duis ut varius massa, fermentum interdum urna. Phasellus pretium et lacus quis gravida. Etiam ultricies tempor sapien, sed imperdiet libero volutpat quis. Vestibulum lacinia iaculis nisl, quis tempor orci fermentum quis.\
Pellentesque auctor erat vel mauris feugiat consectetur. Morbi turpis felis, gravida ut turpis quis, tincidunt venenatis dui. Proin maximus placerat feugiat. Integer tincidunt efficitur gravida. Nulla eu dolor in lectus finibus mollis. Suspendisse quis lobortis justo, eu accumsan felis. Fusce iaculis est at orci aliquet egestas. Sed convallis erat quam, non consequat elit semper a. Aliquam suscipit mauris diam, ut aliquam arcu sollicitudin et. Etiam vestibulum ligula eget mi blandit, et luctus urna sollicitudin. Nunc sed ante quis risus blandit pellentesque. Ut pellentesque pretium pellentesque.";

/* GET home page. */
router.get("/", (req, res) => {
  res.render("home", { content: content.substring(0, 250) } );
});

/* GET home page. */
router.get("/home", (req, res) => {
  res.redirect("/");
});

module.exports = router;
