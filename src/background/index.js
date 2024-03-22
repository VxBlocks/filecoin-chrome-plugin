/* global chrome */
chrome.action.onClicked.addListener((tab) => {

  chrome.storage.local.get(['pwd'], function (res) {
    if(res){
      chrome.action.setPopup({
        popup: 'relogin.html'
      });
    }else{
      chrome.action.setPopup({
        popup: 'index.html'
      });
    }
  });
});