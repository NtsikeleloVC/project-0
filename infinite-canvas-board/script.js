const canvas = document.getElementById("canvas");

let connectionsLayer;
let draggedPost = null;
let offsetX = 0;
let offsetY = 0;

let isPanning = false;
let startX;
let startY;

let posts = [];
let zoom = 1;

let spacePressed = false;

let isDragging = false;

document.addEventListener("keydown", function(e){
 if(e.code === "Space"){

    if(e.target.contentEditable === "true") return;

    e.preventDefault();
    spacePressed = true;
  }
});

document.addEventListener("keyup", function(e){
  if(e.code === "Space"){
    spacePressed = false;
  }
});



// LOAD SAVED POSTS
window.onload = function(){

connectionsLayer = document.getElementById("connections");

  const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];

  posts = savedPosts;

  posts.forEach(createPost);

};


// CREATE POSTS
canvas.addEventListener("click", function(e){

  if(spacePressed) return;
  if(isDragging) return;
  if(e.target.closest(".post")) return;

  const rect = canvas.getBoundingClientRect();

  const x = (e.clientX - rect.left) / zoom;
  const y = (e.clientY - rect.top) / zoom;

  const newPost = {

    x: x,
  y: y,
  text: "Write something...",
  color: "#fff475"
  };

  posts.push(newPost);
  savePosts();

  createPost(newPost);

});


// CREATE POST ELEMENT
function createPost(data){

  const post = document.createElement("div");
  post.className = "post";

  post.style.left = data.x + "px";
  post.style.top = data.y + "px";
  post.style.backgroundColor = data.color || "#fff475";

  // TEXT AREA
const text = document.createElement("div");
text.contentEditable = true;
text.innerText = data.text;
text.style.paddingTop = "20px";

text.addEventListener("click", function(e){
  e.stopPropagation();
});

text.addEventListener("input", function(){
  data.text = text.innerText;
  savePosts();
  });

  // DELETE BUTTON
  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "❌";
  deleteBtn.style.position = "absolute";
  deleteBtn.style.top = "2px";
  deleteBtn.style.right = "2px";
  deleteBtn.style.cursor = "pointer";

// COLOR PICKER
const colorPicker = document.createElement("input");
colorPicker.type = "color";
colorPicker.value = data.color || "#fff475";

colorPicker.style.position = "absolute";
colorPicker.style.bottom = "2px";
colorPicker.style.right = "2px";
colorPicker.style.width = "20px";
colorPicker.style.height = "20px";
colorPicker.style.border = "none";
colorPicker.style.cursor = "pointer";

colorPicker.addEventListener("input", function(e){

  post.style.backgroundColor = e.target.value;
  data.color = e.target.value;
  savePosts();

});

deleteBtn.addEventListener("click", function(e){

  e.stopPropagation();

  const index = [...canvas.children].indexOf(post);

  if(index > -1){
    posts.splice(index,1);
    savePosts();
  }

  post.remove();

  });

  post.appendChild(deleteBtn);
  post.appendChild(colorPicker);
  post.appendChild(text);

  enableDrag(post);

  canvas.appendChild(post);

}


// ENABLE DRAGGING POSTS
function enableDrag(post){

  post.addEventListener("mousedown", function(e){

    if(e.target.contentEditable === "true") return;

    e.preventDefault();
    isDragging = true;
    draggedPost = post;

    const rect = post.getBoundingClientRect();

    offsetX = (e.clientX - rect.left) / zoom;
    offsetY = (e.clientY - rect.top) / zoom;

    e.stopPropagation();

  });

}


// MOVE POSTS OR PAN MAP
document.addEventListener("mousemove", function(e){

  // MOVE POSTS
  if(draggedPost){

    const rect = canvas.getBoundingClientRect();

    const x = (e.clientX - rect.left) / zoom - offsetX;
    const y = (e.clientY - rect.top) / zoom - offsetY;

    draggedPost.style.left = x + "px";
    draggedPost.style.top = y + "px";

    updatePostPosition(draggedPost);

    return;
  }

  // PAN MAP
  if(isPanning && spacePressed){

    window.scrollBy(
      startX - e.clientX,
      startY - e.clientY
    );

    startX = e.clientX;
    startY = e.clientY;

  }

});


// START MAP DRAG
document.addEventListener("mousedown", function(e){

  if(!spacePressed) return;

  if(e.target.closest(".post")) return;

  isPanning = true;

  startX = e.clientX;
  startY = e.clientY;

});


// STOP DRAG
document.addEventListener("mouseup", function(){

  draggedPost = null;
  isPanning = false;

  setTimeout(() => {
    isDragging = false;
  }, 50);

});


// SAVE POSTS
function savePosts(){
  localStorage.setItem("posts", JSON.stringify(posts));
}


// UPDATE POSITION AFTER DRAG
function updatePostPosition(post){

  const index = [...canvas.children].indexOf(post);

  if(index >= 0){
    posts[index].x = parseInt(post.style.left);
    posts[index].y = parseInt(post.style.top);
    savePosts();
  }

}



// ZOOM WITH MOUSE WHEEL
document.addEventListener("wheel", function(e){

  e.preventDefault();

  const rect = canvas.getBoundingClientRect();

  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  if(e.deltaY < 0){
    zoom += 0.1;
  } else {
    zoom -= 0.1;
  }

  zoom = Math.min(Math.max(0.5, zoom), 2);

  canvas.style.transformOrigin = `${mouseX}px ${mouseY}px`;
  canvas.style.transform = `scale(${zoom})`;

});
