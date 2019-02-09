browser.tabs.onUpdated.addListener(function(tabId, changeInfo, tabInfo) {
  if (changeInfo.isArticle) {
    browser.tabs.sendMessage(tabId, {
      isArticle: changeInfo.isArticle
    })
  }
});

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
