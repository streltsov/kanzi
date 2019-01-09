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

browser.tabs.create(
  {url: 'kanzi_dictionary/dictionary.html'}
)

