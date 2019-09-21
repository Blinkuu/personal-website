$(function() {
    // Sidebar toggle behavior
    $("#sidebarCollapse").on('click', function() {
      $("#sidebar, #content, #sidebarCollapse").toggleClass("active");
    });
  });