class View {
  #geminiChatEl = document.getElementById("gemini");
  #chatgptChatEl = document.getElementById("chatgpt");
  #claudeChatEl = document.getElementById("claude");

  constructor() {
    this.setCopyright();
    this.handelNavClick();
    this.handelZoomBtnClick();
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

  handelNavClick() {
    // 0) getting the parent nav bar container
    const parentContainer = document.getElementById("nav");

    // 1) adding the event listener to the parent container
    parentContainer.addEventListener("click", (e) => {
      // 2) getting the target element
      const target = e.target.parentNode.closest(".nav-items");

      // 3) if the target element is not found, return
      if (!target) return;

      // 4) removing the current active class and adding it to the new active element
      parentContainer.querySelector(".active").classList.remove("active");

      // 5) adding the active class to the target element
      target.classList.add("active");

      // 6) adjusting the chat selection
      this.#adjustChatSelection(target.dataset.chat);
    });
  }

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
}

export default new View();
