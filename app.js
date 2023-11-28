function app() {
  const DISPLAY_NONE = "display-none";
  const SCALE_IN_OUT = "scale-in-out";
  const TRANSITION_DELAY = 50; // unit is ms (milliseconds)

  // Bell icon
  const userInfo = document.querySelector("#userinfo-dropdown");
  const notificationBell = document.querySelector("#notification-bell");
  const notificationDropdown = document.querySelector("#notification-dropdown");

  // this function will open dropdown (notification, user profile, setup items)
  function openDropDown(element) {
    element.classList.remove(DISPLAY_NONE);
    setTimeout(() => {
      element.classList.remove(SCALE_IN_OUT);
    }, TRANSITION_DELAY)
  }

  // this function will close dropdown (notification, user profile, setup items)
  function closeDropDown(element) {
    element.classList.add(SCALE_IN_OUT)
    setTimeout(() => {
      element.classList.add(DISPLAY_NONE);
    }, TRANSITION_DELAY)
  }

  function toggleNotification() {
    closeDropDown(userInfo); // removes userdropdown first
    if (notificationDropdown.classList.contains(SCALE_IN_OUT)) {
      openDropDown(notificationDropdown)
    } else {
      closeDropDown(notificationDropdown)
    }
  };
  notificationBell.addEventListener("click", toggleNotification);
  notificationBell.addEventListener("keyup", (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      toggleNotification()
    }
    else if (event.key === 'Escape') {
      toggleNotification()
    }
  });

  // User Info Toggle
  const userNameAndLogo = document.querySelector("#user-name-logo");
  const dropdownMenuItems = document.querySelectorAll(".menu-item");

  function toggleUserInfo() {
    closeDropDown(notificationDropdown); // removes notification first
    if (userInfo.classList.contains(SCALE_IN_OUT)) {
      openDropDown(userInfo)
    } else {
      closeDropDown(userInfo)
    }
    dropdownMenuItems.item(0).focus();
  }

  // this function is used by user profile when escape is pressed and returns focus
  function escapeKeypress(event) {
    if (event.key === "Escape") {
      toggleUserInfo();
      userNameAndLogo.focus();
    }
  }

  // This function is used by setup item and menu item for navigation
  function navigateListItems(event, itemIndex, navigationElementType) {
    const isLastItem = itemIndex === navigationElementType.length - 1;
    const isFirstItem = itemIndex === 0;
    const nextItem = navigationElementType.item(itemIndex + 1);
    const previousItem = navigationElementType.item(itemIndex - 1);
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      if (isLastItem) {
        navigationElementType.item(0).focus();
        return;
      }
      nextItem.focus();
    }

    if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      if (isFirstItem) {
        navigationElementType.item(navigationElementType.length - 1).focus();
        return;
      }
      previousItem.focus();
    }
  }

  // Navigate profile items
  dropdownMenuItems.forEach((item, itemIndex) => {
    item.addEventListener('keyup',
      (event) => {
        navigateListItems(event, itemIndex, dropdownMenuItems)
      });
  })
  userNameAndLogo.addEventListener("click", toggleUserInfo);
  userInfo.addEventListener('keyup', escapeKeypress)


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

    if (toggleSetupItems.classList.contains(SCALE_IN_OUT)) {
      openDropDown(toggleSetupItems)
    } else {
      closeDropDown(toggleSetupItems)
    }
    if (expandCollapse.classList.contains("closed")) {
      expandCollapse.ariaLabel = "Expand setup menu"
    } else {
      expandCollapse.ariaLabel = "Collapse setup menu"
    }
  }
  expandCollapse.addEventListener("click", expandAndCollapse);


  // expand setup items
  const setupItemHeadingList = document.querySelectorAll("#setup-items li");
  function expandItem(item) {
    item.addEventListener("click", () => {
      setupItemHeadingList.forEach((item) => {
        item.classList.remove('opened-setup-item');
        item.querySelector('.setupitem-details').style.display = "none"
      })
      item.querySelector('.setupitem-details').style.display = "grid";
      item.classList.add('opened-setup-item');
    }
    )
    item.addEventListener("keyup", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        setupItemHeadingList.forEach((item) => {
          item.classList.remove('opened-setup-item');
          item.querySelector('.setupitem-details').style.display = "none"
        })
        item.querySelector('.setupitem-details').style.display = "grid";
        item.classList.add('opened-setup-item');
      }
    }
    )
  }
  setupItemHeadingList.forEach(expandItem)

  // Navigate setup item
  setupItemHeadingList.forEach((item, itemIndex) => {
    item.addEventListener('keyup',
      (event) => {
        navigateListItems(event, itemIndex, setupItemHeadingList)
      });
  })


  // Check and uncheck setup 
  const setupItemCheckmarks = document.querySelectorAll(".checkmark-container");
  function addCount() {
    let clickedCount = 0;
    let clickedPercent = 0;
    const progressCount = document.querySelector("#progress-count")
    const progressBar = document.querySelector("#progress")
    const progressBarContainer = document.querySelector("[role=status]");
    console.log(progressBarContainer)
    setupItemCheckmarks.forEach((item) => {
      if (item.children[0].classList.contains(DISPLAY_NONE)) {
        clickedCount++;
        clickedPercent += 20
      }
    })
    progressCount.textContent = clickedCount;
    progressBar.value = clickedPercent;
    progressBar.setAttribute('aria-valuenow', clickedPercent);
    progressBarContainer.setAttribute('aria-label', `${clickedPercent} percentage completed`);
  }

  function openNext(item) {
    item.parentNode.nextElementSibling.style.display = "none";
    item.parentNode.parentNode.classList.remove('opened-setup-item');
    item.parentNode.parentNode.nextElementSibling.classList.add('opened-setup-item');
    item.parentNode.parentNode.nextElementSibling.querySelector(".setupitem-details").style.display = "grid";
    item.parentNode.parentNode.nextElementSibling.querySelector(".checkmark-container").focus();
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
}
app();