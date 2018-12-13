
function handleActivated(activeInfo) {
  chrome.tabs.query({}, function (tabs) {
    for (let tab of tabs) {
      if (tab.id == activeInfo.tabId) {
        // 如果頁面URL domain符合顯示按鈕
        if (tab.url.match('^http[s]{0,1}://localhost')) {
          chrome.browserAction.enable();
        } else {
          chrome.browserAction.disable();
        }
      }
    }
  });
}
chrome.tabs.onActivated.addListener(handleActivated)  ;

// onUpdated 在firefox與chrome之間執行時機不太相同
// 但是頁面更新時都是loading -> complete
function handleUpdated(tabId, changeInfo, tabInfo) {
  if (changeInfo.status == 'loading') {
    chrome.tabs.query({}, function (tabs) {
      for (let tab of tabs) {
        if (tab.id == tabId) {
          // 如果頁面URL domain符合顯示按鈕
          if (tab.url.match('^http[s]{0,1}://localhost')) {
            chrome.browserAction.enable();
          } else {
            chrome.browserAction.disable();
          }
        }
      }
    });
  }
}
chrome.tabs.onUpdated.addListener(handleUpdated);


