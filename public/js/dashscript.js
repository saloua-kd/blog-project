// const addBlogButton = document.getElementById("add-blog-button");
// addBlogButton.addEventListener("click", async (e) => {
//   // e.preventDefault(); // Prevent the form from submitting and navigating

//   // Get the form data
//   const formData = new FormData(document.getElementById("blog-form"));

//   try {
//     // Send a POST request to create a new blog
//     const response = await fetch("/createblog", {
//       method: "POST",
//       body: formData,
//     });

//     if (response.status === 201) {
//       // Successfully created a new blog
//       const newBlog = await response.json(); // Newly created blog data

//       // Create a new blog card element
//       const blogCard = document.createElement("div");
//       blogCard.classList.add("blog-card");
//       blogCard.id = newBlog.id;

//       // Create HTML structure for the blog card using the new blog data

//     //   blogCard.innerHTML = `
//     //       <img src="${newBlog.image_blog}" alt="Blog Image">
//     //       <div class="blog-card-content">
//     //           <h3 class="blog-card-title">blog title: ${newBlog.title_blog}</h3>
//     //           <p class="blog-card-description">blog description: ${newBlog.description_blog}</p>
//     //           <p class="blog-card-author">blog author: ${newBlog.author_blog}</p>
//     //           <div class="button">
//     //               <a href="" class="edit">edit</a>
//     //               <a href="" class="delete">delete</a>
//     //           </div>
//     //       </div>
//     //   `;

//       blogCard.innerHTML = `
//         <div class="blog-cards-container">
//              <% blogs.forEach(b => { %>
//             <div class="blog-card" id="<%= b.id %>">
//                 <img src="/uploads/<%= b.image_blog %>" alt="<%= b.title_blog %>">
//                 <div class="blog-card-content">
//                     <h3 class="blog-card-title">blog title: <%= b.title_blog %></h3>
//                     <p class="blog-card-description">blog description: <%= b.description_blog %></p>
//                     <p class="blog-card-author">blog author: <%= b.author_blog %></p>
//                     <div class="button">
//                         <a href="" class="edit">edit</a>
//                         <a href="" class="delete" data-id="<%= b.id %>">delete</a>
//                     </div>
//                 </div>
//             </div>
//             <% }) %>
//         </div>
//         `;

//       // Get the existing blog cards container by ID
//       const blogCardContainer = document.getElementById("blog-card-container");

//       // Add the new blog card to the container
//       blogCardContainer.appendChild(blogCard);

//       // Clear the form fields after adding the blog
//       const blogForm = document.getElementById("blog-form");
//       blogForm.reset();
//     } else {
//       // Handle other status codes if needed
//       console.error("Error:", response.statusText);
//     }
//   } catch (error) {
//     console.error("Error:", error);
//   }
// });

// const deleted = document.querySelectorAll(".delete");

// deleted.forEach((blog) => {
//   blog.addEventListener("click", (e) => {
//     e.preventDefault();
//     e.currentTarget.parentElement.parentElement.remove();
//     const id = e.currentTarget.dataset.id;
//     fetch(`http://localhost:7000/delete/${id}`, {
//       method: "DELETE",
//     }).then(() => {
//       window.location.reload();
//     });
//   });
// });
