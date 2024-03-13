// const figlet = require("figlet");

// const { required } = require("nodemon/lib/config");

// figlet("Hello World!!", function (err, data) {
//   if (err) {
//     console.log("Something went wrong...");
//     console.dir(err);
//     return;
//   }
//   console.log(data);
// });
const express=require("express")
const app=express()
const PORT = 5555;
 console.log(app)
const path=require("path")


// app.use(()=>{
//     console.log("middleware")
// })

// app.listen(PORT,()=>{//start server n moniter the incoming request
//     console.log("http://localhost:"+PORT);
// })
app.use(express.static(path.join(__dirname,"public")))
app.use(express.urlencoded({extended:true}))
app.set('view engine', 'hbs');
const { v4: uuidv4 } = require('uuid');
// let namearr=["komal","saloni","rhea"]
let blogs=[];
app.use("/",(req,res,next)=>{
    // console.log(req)
    // res.send("response");
    console.log("middleware")
    next()

})
// app.get("/",(req,res)=>{
//     // console.log(req)
//     // res.send("get response");
//     res.sendFile(path.join(__dirname,"index.html"))

// })
// app.get("/style.css",(req,res)=>{
//     res.sendFile(path.join(__dirname,"style.css"))
// })
// app.get("/script.js",(req,res)=>{
//     res.sendFile(path.join(__dirname,"script.js"))
// })

// app.get('/path/abhishek',(req,res)=>{
//     res.send("abhishek ka data")
// })
// app.get("/path2/:name/:class",(req,res)=>{
//     console.log(req.params);
//     res.send(req.params)
// })
app.get("/path3",(req,res)=>{
    console.log(req.query);

})

app.get("/random",(req,res)=>{
    res.render("random",{
        firstName:"komal",
        lastName:"upadhyay"
    })
})
app.get("/random2",(req,res)=>{
    res.render("array",{
        namearr
    })
})
app.get("/getblog",(req,res)=>{
    res.render("blogpage",{
        blogs:blogs
    })
})
app.post("/addblog",(req,res)=>{
    console.log(req.body);
    const {name,Class,blog}=req.body
    console.log(name,Class,blog);

    const obj={
        name:name,
        Class:Class,
        blog:blog,
        blogid:uuidv4()
    }


    blogs.push(obj)
    // res.send(blogs)
    // res.render("blogpage",{
    //     blogs:blogs

    // res.send(blogs)
   res.redirect("/getblog")
    })
// })
app.get("/delete/:blogid",(req,res)=>{
    console.log(req.params);
    blogs=blogs.filter((item)=>item.blogid!=req.params.blogid)
    res.redirect("/getblog")
})

app.get("/update/:blogid",(req,res)=>{
    const updateblog=blogs.filter((item)=>item.blogid==req.params.blogid)
    res.render("updateblog",{
        updateblog:updateblog[0]
    })
})


app.post("/updateblog",(req,res)=>{
    // console.log(req.body);
    const {name,Class,blog,blogid}=req.body
    const newObj={
        name,
        Class,
        blog,
        blogid
    }

    blogs=blogs.map((item)=>{
        if(item.blogid==blogid){
            return newObj
        }
        return item
    })

    res.redirect("/getblog")
})

app.listen(PORT, () => {
    console.log(" http://localhost:"+PORT);
  });
