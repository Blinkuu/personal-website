function deleteRequest(postId) {
    axios.delete("/" + postId, { data: { foo: "bar" } });
    window.location.replace("/admin");
}
