async function deleteRequest(route) {
  const result = await axios.delete(route, { data: { foo: "bar" } });
  window.location.replace("/admin");
}

async function getRequest(route) {
  const result = await axios.get(route);

  $("div.page-content .row:nth-last-child(2)").after(`
  <div class="row pt-3">
    <div class="col-12">
      <div class="form-update" autocomplete="off">
          <div class="form-label-group">
            <input type="text" id="inputAuthor" name="author" class="form-control" placeholder="Author" value="${result.data.author}" required autofocus/>
            <label for="inputAuthor">Author</label>
          </div>
          <div class="form-label-group">
            <input type="text" id="inputTitle" name="title" class="form-control" placeholder="Title" value="${result.data.title}" required autofocus/>
            <label for="inputTitle">Title</label>
          </div>
          <div class="form-label-group">
              <textarea rows="2" id="inputIntroduction" name="introduction" class="form-control" placeholder="Introduction" required autofocus>${result.data.introduction}</textarea>
              <label for="inputIntroduction">Introduction</label>
          </div>
          <div class="form-label-group">
              <textarea rows="6" id="inputEdit" name="edit" class="form-control" placeholder="Content" required autofocus>${result.data.content}</textarea>
              <label for="inputEdit">Content</label>
          </div>
          <button class="btn btn-outline" onclick="putRequest('/${route.split("/").pop()}')"> Update </button>
      </div>
    </div>
  </div>
    `);
}

async function putRequest(route, data) {
  const [author, title, introduction, content] = $("div.form-update .form-control").map(function() {
    return $(this).val();
  });
  
  const result = await axios.put(route, {
    data: {
      author: author,
      title: title,
      introduction: introduction,
      content: content
    }
  });
  window.location.replace("/admin");
}