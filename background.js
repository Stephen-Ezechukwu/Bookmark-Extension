
chrome.bookmarks.onCreated.addListener((id, bookmark) => {
    console.log('Bookmark created:', bookmark);
});

chrome.bookmarks.onRemoved.addListener((id, removeInfo) => {
    console.log('Bookmark removed:', removeInfo);
});

