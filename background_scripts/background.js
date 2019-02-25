function handleMessage(message, sender, sendResponse) {
  if (message.loading == 'complete') {
    if (sender.tab.isArticle) {
      sendResponse({
        response: "Article"
      });
    } else {
      console.log('Not an article');
    }
  }
}

browser.runtime.onMessage.addListener(handleMessage);

browser.menus.create({
  id: "add-selected-word",
  title: "Add «%s» to kanzi",
  contexts: ["selection"]
});

browser.menus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId == "add-selected-word") {
    browser.tabs.sendMessage(tab.id, {
      selectedText: info.selectionText
    })
  }
});
