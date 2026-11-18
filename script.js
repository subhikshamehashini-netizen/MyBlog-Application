// REGISTER FUNCTION
const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const user = { name, email, password };

    localStorage.setItem("user", JSON.stringify(user));

    alert("Registration successful!");

    window.location.href = "login.html";
  });
}

// LOGIN FUNCTION
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.email === email && user.password === password) {
      alert("Login successful!");

      window.location.href = "dashboard.html";
    } else {
      alert("Invalid email or password!");
    }
  });
}

// CREATE BLOG FUNCTION
const blogForm = document.getElementById("blogForm");

if (blogForm) {
  blogForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const title = document.getElementById("blogTitle").value;
    const author = document.getElementById("author").value;
    const content = document.getElementById("blogContent").value;

    const blog = {
      id: Date.now(),
      title,
      author,
      content,
    };

    let blogs = JSON.parse(localStorage.getItem("blogs")) || [];

    blogs.push(blog);

    localStorage.setItem("blogs", JSON.stringify(blogs));

    alert("Blog published successfully!");

    window.location.href = "dashboard.html";
  });
}

// DISPLAY BLOGS IN DASHBOARD

// DISPLAY AND EDIT BLOGS IN DASHBOARD

const dashboard = document.querySelector(".dashboard");

if (dashboard) {
  let blogs = JSON.parse(localStorage.getItem("blogs")) || [];

  const blogSection = document.createElement("div");

  function displayBlogs() {
    blogSection.innerHTML = "";

    blogs.forEach(function (blog) {
      const card = document.createElement("div");
      card.className = "dashboard-card";

      const heading = document.createElement("h3");
      heading.textContent = blog.title;

      const author = document.createElement("p");
      author.textContent = "By " + blog.author;

      const content = document.createElement("p");
      content.textContent = blog.content;

      // EDIT BUTTON
      const editButton = document.createElement("button");
      editButton.textContent = "Edit";
      editButton.className = "btn";

      editButton.addEventListener("click", function () {
        const newTitle = prompt("Enter new title:", blog.title);

        if (newTitle === null || !newTitle.trim()) return;

        const newAuthor = prompt("Enter author name:", blog.author);

        if (newAuthor === null || !newAuthor.trim()) return;

        const newContent = prompt("Enter new content:", blog.content);

        if (newContent === null || !newContent.trim()) return;

        blog.title = newTitle.trim();
        blog.author = newAuthor.trim();
        blog.content = newContent.trim();

        localStorage.setItem("blogs", JSON.stringify(blogs));

        displayBlogs();

        alert("Blog updated successfully!");
      });

      // DELETE BUTTON
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.className = "btn";

      deleteButton.addEventListener("click", function () {
        blogs = blogs.filter((item) => item.id !== blog.id);

        localStorage.setItem("blogs", JSON.stringify(blogs));

        displayBlogs();
      });

      card.append(heading, author, content, editButton, deleteButton);

      blogSection.appendChild(card);
    });
  }

  dashboard.appendChild(blogSection);

  displayBlogs();
}
