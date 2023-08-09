//blog_index, blog_details , blog_create_get , blog_create_post, blog_delete
const Blog = require("../models/blog");
const blog_index = function(req ,res){
    Blog.find()
      .sort({ createdAt: -1 })
      .then((result) => {
        res.render("index", { blogs: result, title: "All blogs" });
      })
      .catch((err) => {
        console.log(err);
      });

}

const blog_details = function(req,res) {
    const id = req.params.id;
    Blog.findById(id)
      .then((result) => {
        res.render("details", { blog: result, title: "Blog details" });
      })
      .catch((err) => {
        console.log(err);
      });
}

const blog_create_get = function(req,res){
        res.render("create", { title: "Create a new blog" });
      
}
const blog_create_post = function(req,res){
        const blog = new Blog(req.body);
        blog
          .save()
          .then((result) => {
            res.redirect("/blogs");
          })
          .catch((err) => {
            console.log(err);
          });

}

const blog_delete = function(req,res){
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
      .then((result) => {
        res.json({
          redirect: "/blogs",
        });
      })
      .catch((err) => {
        console.log(err);
      });
}



module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete
}