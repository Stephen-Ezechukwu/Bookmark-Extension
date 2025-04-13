document.addEventListener("DOMContentLoaded", loadBookmarks);
document.getElementById("addBookmark").addEventListener("click", addBookmark);


function addBookmark() {
    const url = document.getElementById("url").value;
    const title = document.getElementById("title").value;

    if (!url || !title) {
        alert("Please enter both a title and a URL.");
        return;
    }

    chrome.bookmarks.create({ title: title, url: url }, function() {
        loadBookmarks();
        document.getElementById("url").value = '';
        document.getElementById("title").value = '';
    });
}

function loadBookmarks() {
    const bookmarkList = document.getElementById("bookmarkList");
    bookmarkList.innerHTML = '';

    chrome.bookmarks.getTree(function(bookmarks) {
        bookmarks.forEach(folder => {
            displayBookmarks(folder, bookmarkList);
        });
    });
}

function displayBookmarks(bookmarkNode, bookmarkList) {
    if (bookmarkNode.children) {
        bookmarkNode.children.forEach(child => {
            if (child.url) {
                const li = document.createElement("li");
                li.textContent = child.title;
                const deleteButton = document.createElement("button");
                deleteButton.textContent = "Delete";
                deleteButton.onclick = () => deleteBookmark(child.id);
                li.appendChild(deleteButton);
                bookmarkList.appendChild(li);
            } else {
                displayBookmarks(child, bookmarkList);
            }
        });
    }
}

function deleteBookmark(id) {
    chrome.bookmarks.remove(id, function() {
        loadBookmarks();
    });
}