const DISPLAY_NONE = "display-none"

// Bell icon
const userInfo = document.querySelector("#userinfo-dropdown");
const notificationBell = document.querySelector("#notification-bell");
const notificationDropdown = document.querySelector("#notification-dropdown");
function toggleNotification() {
  userInfo.classList.add(DISPLAY_NONE)
  notificationDropdown.classList.toggle(DISPLAY_NONE)
};
notificationBell.addEventListener("click", toggleNotification);
notificationBell.addEventListener("keyup", (event) => {
  if (event.key === 'Enter' || event.key === ' ') {
    toggleNotification()
  }
  else if (event.key === 'Escape') {
    notificationDropdown.classList.add(DISPLAY_NONE)
  }
});

// User Info Toggle
const userNameAndLogo = document.querySelector("#user-name-logo");
const dropdownMenuItems = document.querySelectorAll(".menu-item");

function toggleUserInfo() {
  notificationDropdown.classList.add(DISPLAY_NONE); // removes notification first
  userInfo.classList.toggle(DISPLAY_NONE);
  dropdownMenuItems.item(0).focus();
}

function escapeKeypress(event) {
  if (event.key === "Escape") {
    userNameAndLogo.focus();
    userInfo.classList.toggle(DISPLAY_NONE)
  }
}

function navigateListItems(event, itemIndex) {
  const isLastItem = itemIndex === dropdownMenuItems.length - 1;
  const isFirstItem = itemIndex === 0;
  const nextItem = dropdownMenuItems.item(itemIndex + 1);
  const previousItem = dropdownMenuItems.item(itemIndex - 1);
  if (event.key === "ArrowRight" || event.key === "ArrowDown"){
    if (isLastItem) {
      dropdownMenuItems.item(0).focus();
      return;
    }
    nextItem.focus();
  }

  if (event.key === "ArrowUp" || event.key === "ArrowLeft"){
    if (isFirstItem) {
      dropdownMenuItems.item(dropdownMenuItems.length - 1).focus();
      return;
    }
    previousItem.focus();
  }
}
dropdownMenuItems.forEach((item, itemIndex) => {
  item.addEventListener('keyup',
    (event)=> {
      navigateListItems(event, itemIndex)
    });
})

userNameAndLogo.addEventListener("click", toggleUserInfo);
userInfo.addEventListener('keyup', escapeKeypress)
// userNameAndLogo.addEventListener("keyup", (event) => {
//   if (event.key === 'Enter' || event.key === ' ') {
//     toggleUserInfo()
//   }
//   else if (event.key === 'Escape') {
//     userInfo.classList.add(DISPLAY_NONE)
//   }
// });

// close plan info pane
closeIcon = document.querySelector("#close");
planContainer = document.querySelector("#show-plan-option");
function closePane() {
  planContainer.style.display = "none";
}
closeIcon.addEventListener("click", closePane)

// toggle setup items
const expandCollapse = document.querySelector("#expand-collapse-items");
const toggleSetupItems = document.querySelector("#setup-items");
function expandAndCollapse() {
  expandCollapse.classList.toggle("closed")
  toggleSetupItems.classList.toggle(DISPLAY_NONE)
  if (expandCollapse.classList.contains("closed")) {
    expandCollapse.ariaLabel = "Expand setup menu"
  } else {
    expandCollapse.ariaLabel = "Collapse setup menu"
  }
}
expandCollapse.addEventListener("click", expandAndCollapse);

// expand setup items
const setupItemHeadingList = document.querySelectorAll(".setup-item-heading");
function expandItem(item) {
  item.addEventListener("click", () => {
    setupItemHeadingList.forEach((item) => {
      item.nextElementSibling.style.display = "none"
    })
    item.nextElementSibling.style.display = "grid";
  }
  )
}
setupItemHeadingList.forEach(expandItem)

// Check and uncheck setup 
const setupItemCheckmarks = document.querySelectorAll(".checkmark-container");
function addCount() {
  let clickedCount = 0;
  let clickedPercent = 0;
  const progressCount = document.querySelector("#progress-count")
  const progressBar = document.querySelector("#progress")
  setupItemCheckmarks.forEach((item) => {
    if (item.children[0].classList.contains(DISPLAY_NONE)) {
      clickedCount++;
      clickedPercent += 20
    }
  })
  progressCount.textContent = clickedCount;
  progressBar.value = clickedPercent;
}

function openNext(item) {
  item.parentNode.nextElementSibling.style.display = "none";
  item.parentNode.parentNode.nextElementSibling.querySelector(".setupitem-details").style.display = "grid";
}

function clickCheckmark(item) {
  item.addEventListener("click", () => {
    if (item.querySelector(".unloaded-circle").classList.contains(DISPLAY_NONE)) {
      item.querySelector(".loaded-circle").classList.add(DISPLAY_NONE);
      item.querySelector(".loading-circle").classList.remove(DISPLAY_NONE);
      setTimeout(() => {
        item.querySelector(".loading-circle").classList.add(DISPLAY_NONE);
        item.querySelector(".unloaded-circle").classList.remove(DISPLAY_NONE);
        addCount();
      }, 500)
    }
    else {
      item.querySelector(".unloaded-circle").classList.add(DISPLAY_NONE);
      item.querySelector(".loading-circle").classList.remove(DISPLAY_NONE);
      setTimeout(() => {
        item.querySelector(".loading-circle").classList.add(DISPLAY_NONE);
        item.querySelector(".loaded-circle").classList.remove(DISPLAY_NONE);
        addCount();
        openNext(item);
      }, 1300)
    }
  })
}
setupItemCheckmarks.forEach(clickCheckmark)


