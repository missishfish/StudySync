// Search Bar Functionality
function searchPosts() {
    let input = document.getElementById("searchBar").value.toLowerCase();
    let posts = document.getElementsByClassName("post");

    for (let i = 0; i < posts.length; i++) {
        let title = posts[i].getElementsByTagName("h3")[0].innerText.toLowerCase();
        if (title.includes(input)) {
            posts[i].style.display = "block";
        } else {
            posts[i].style.display = "none";
        }
    }
}

// Filter Posts by Category
function filterPosts(category) {
    let posts = document.getElementsByClassName("post");

    for (let i = 0; i < posts.length; i++) {
        if (category === "all") {
            posts[i].style.display = "block";
        } else if (posts[i].classList.contains(category)) {
            posts[i].style.display = "block";
        } else {
            posts[i].style.display = "none";
        }
    }
}