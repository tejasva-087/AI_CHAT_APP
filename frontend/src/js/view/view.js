class View {
  #geminiChatEl = document.getElementById("gemini");
  #chatgptChatEl = document.getElementById("chatgpt");
  #claudeChatEl = document.getElementById("claude");
  #changeThemeBtnEl = document.getElementById("change-theme");
  #swap = false;

  constructor() {
    this.setCopyright();
    this.handelNavClick();
    this.handelZoomBtnClick();
    this.handleThemeClick();
    this.handleWindowResize();
    this.#setViewWhenLoad();
    this.handleMobileThemeClick();
    this.hamdelMobileNavClick();
  }

  #removeActiveBtn() {
    const geminiBtn = document.getElementById("gemini-btn");
    const chatgptBtn = document.getElementById("chatgpt-btn");
    const claudeBtn = document.getElementById("claude-btn");
    const btnSelectAll = document.getElementById("btn-select-all");

    btnSelectAll.classList.remove("active");
    geminiBtn.classList.remove("active");
    chatgptBtn.classList.remove("active");
    claudeBtn.classList.remove("active");
  }

  #setViewWhenLoad() {
    const selectAllBtn = document.getElementById("btn-select-all");
    const geminiBtn = document.getElementById("gemini-btn");
    const sidebar = document.querySelector(".side-nav-bar");
    const mobileNavBar = document.querySelector(".mobile-nav-bar");

    if (window.screen.width <= 1000) {
      this.#removeActiveBtn();
      selectAllBtn.style.display = "none";
      geminiBtn.classList.add("active");
      this.#adjustChatSelection("gemini");
    } else {
      this.#removeActiveBtn();
      selectAllBtn.style.display = "block";
      selectAllBtn.classList.add("active");
      this.#adjustChatSelection("all");
    }

    if (window.screen.width <= 900) {
      sidebar.classList.add("hidden");
      mobileNavBar.classList.remove("hidden");
    } else {
      sidebar.classList.remove("hidden");
      mobileNavBar.classList.add("hidden");
    }
  }

  handleWindowResize() {
    window.addEventListener("resize", () => {
      this.#setViewWhenLoad();
    });
  }

  setCopyright() {
    const copyright = document.getElementById("copyright-text");
    const year = new Date().getFullYear();
    copyright.innerText = `copyright © ${year} TrioChat. All rights reserved.`;
  }

  #adjustChatSelection(target) {
    // 0) getting the chat container
    this.#geminiChatEl = document.getElementById("gemini");
    this.#chatgptChatEl = document.getElementById("chatgpt");
    this.#claudeChatEl = document.getElementById("claude");
    const zoomBtnEl = document.querySelectorAll(".btn-zoom");

    // 1) removing all the classes
    this.#claudeChatEl.classList.remove("hidden");
    this.#chatgptChatEl.classList.remove("hidden");
    this.#geminiChatEl.classList.remove("hidden");
    this.#claudeChatEl.classList.remove("chat-occoupy-all");
    this.#chatgptChatEl.classList.remove("chat-occoupy-all");
    this.#geminiChatEl.classList.remove("chat-occoupy-all");

    // 2) removing the zoom btn from the chat
    zoomBtnEl.forEach((btn) => (btn.style.display = "none"));

    // 3) checking the options
    switch (target) {
      case "gemini":
        this.#chatgptChatEl.classList.add("hidden");
        this.#claudeChatEl.classList.add("hidden");
        this.#geminiChatEl.classList.add("chat-occoupy-all");
        return;

      case "chatgpt":
        this.#geminiChatEl.classList.add("hidden");
        this.#claudeChatEl.classList.add("hidden");
        this.#chatgptChatEl.classList.add("chat-occoupy-all");
        return;

      case "claude":
        this.#chatgptChatEl.classList.add("hidden");
        this.#geminiChatEl.classList.add("hidden");
        this.#claudeChatEl.classList.add("chat-occoupy-all");
        return;
      case "all":
        zoomBtnEl.forEach((btn) => (btn.style.display = "block"));
        return;

      default:
        console.error("Something gone wrong");
    }
  }

  #handelNav(parentContainer, target) {
    // 1) removing the current active class and adding it to the new active element
    parentContainer.querySelector(".active").classList.remove("active");

    // 2) adding the active class to the target element
    target.classList.add("active");

    // 3) adjusting the chat selection
    this.#adjustChatSelection(target.dataset.chat);
  }

  handelNavClick() {
    // 0) getting the parent nav bar container
    const parentContainer = document.getElementById("nav");

    // 1) adding the event listener to the parent container
    parentContainer.addEventListener("click", (e) => {
      e.preventDefault();
      // 2) getting the target element
      const target = e.target.parentNode.closest(".nav-items");

      // 3) if the target element is not found, return
      if (!target) return;
      this.#handelNav(parentContainer, target);
    });
  }

  hamdelMobileNavClick() {
    const parentContainer = document.querySelector(".mobile-nav-bar");
    parentContainer.addEventListener("click", (e) => {
      e.preventDefault();
      const target = e.target.closest(".nav-items");
      if (!target) return;
      this.#handelNav(parentContainer, target);
    });
  }

  handelMobileNavClick() {}

  handelZoomBtnClick() {
    const zoomBtnEl = document.querySelectorAll(".btn-zoom");
    zoomBtnEl.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const target = e.target.closest(".btn-zoom");
        if (!target) return;

        // this.#geminiChatEl.classList.remove("chat-box-mid");
        this.#geminiChatEl.classList.remove("chat-box-big");
        this.#geminiChatEl.classList.remove("chat-box-mid-1");
        this.#geminiChatEl.classList.remove("chat-box-mid-2");

        // this.#chatgptChatEl.classList.remove("chat-box-mid");
        this.#chatgptChatEl.classList.remove("chat-box-big");
        this.#chatgptChatEl.classList.remove("chat-box-mid-1");
        this.#chatgptChatEl.classList.remove("chat-box-mid-2");

        // this.#claudeChatEl.classList.remove("chat-box-mid");
        this.#claudeChatEl.classList.remove("chat-box-big");
        this.#claudeChatEl.classList.remove("chat-box-mid-1");
        this.#claudeChatEl.classList.remove("chat-box-mid-2");

        switch (target.dataset.chat) {
          case "gemini":
            this.#geminiChatEl.classList.add("chat-box-big");
            this.#chatgptChatEl.classList.add("chat-box-mid-1");
            this.#claudeChatEl.classList.add("chat-box-mid-2");
            break;
          case "chatgpt":
            this.#chatgptChatEl.classList.add("chat-box-big");
            this.#geminiChatEl.classList.add("chat-box-mid-1");
            this.#claudeChatEl.classList.add("chat-box-mid-2");
            break;
          case "claude":
            this.#claudeChatEl.classList.add("chat-box-big");
            this.#chatgptChatEl.classList.add("chat-box-mid-1");
            this.#geminiChatEl.classList.add("chat-box-mid-2");
            break;
          default:
            console.error("Something gone wrong");
        }
      });
    });
  }

  #changeTheme(target, mobile = false) {
    console.log("Helo");
    target.querySelectorAll(".change-theme-logo").forEach((logo) => {
      logo.classList.toggle("hidden");
    });

    if (!mobile) {
      target.querySelector("span").innerText =
        target.querySelector("span").innerText === "Dark" ? "Light" : "Dark";
    }

    if (!this.#swap) {
      // --color-white-1: #404040;
      // --color-white-2: #171717;
      // --color-white-3: #0a0a0a;
      document.documentElement.style.setProperty("--color-white-1", "#404040");
      document.documentElement.style.setProperty("--color-white-2", "#171717");
      document.documentElement.style.setProperty("--color-white-3", "#0a0a0a");
      document.documentElement.style.setProperty("--color-black", "#fff");
      this.#swap = true;
    } else {
      // --color-white-1: #d1d3d4;
      // --color-white-2: #f4f7f8;
      // --color-white-3: #fff;
      document.documentElement.style.setProperty("--color-white-1", "#d1d3d4");
      document.documentElement.style.setProperty("--color-white-2", "#f4f7f8");
      document.documentElement.style.setProperty("--color-white-3", "#fff");
      document.documentElement.style.setProperty("--color-black", "#333");
      this.#swap = false;
    }
  }

  handleThemeClick() {
    this.#changeThemeBtnEl.addEventListener("click", (e) => {
      const target = e.target.closest("#change-theme");
      if (!target) return;
      this.#changeTheme(target);
    });
  }
  handleMobileThemeClick() {
    const changeMobileThemeBtnEl = document.querySelector(
      ".mobile-nav-bar-theme-btn"
    );
    changeMobileThemeBtnEl.addEventListener("click", (e) => {
      const target = e.target.closest(".mobile-nav-bar-theme-btn");
      this.#changeTheme(target, true);
    });
  }
}

export default new View();
