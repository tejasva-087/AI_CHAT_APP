class View {
  constructor() {
    this.setCopyright();
  }

  setCopyright() {
    const copyright = document.getElementById("copyright-text");
    const year = new Date().getFullYear();
    copyright.innerText = `copyright © ${year} TrioChat. All rights reserved.`;
  }

  #adjustChatSelection(target) {
    // 0) getting the chat container
    const geminiChatEl = document.getElementById("gemini");
    const chatgptChatEl = document.getElementById("chatgpt");
    const claudeChatEl = document.getElementById("claude");
    const zoomBtnEl = document.querySelectorAll(".btn-zoom");

    // 1) removing all the classes
    claudeChatEl.classList.remove("hidden");
    chatgptChatEl.classList.remove("hidden");
    geminiChatEl.classList.remove("hidden");
    claudeChatEl.classList.remove("chat-occoupy-all");
    chatgptChatEl.classList.remove("chat-occoupy-all");
    geminiChatEl.classList.remove("chat-occoupy-all");

    // 2) removing the zoom btn from the chat
    zoomBtnEl.forEach((btn) => (btn.style.display = "none"));

    // 3) checking the options
    switch (target) {
      case "gemini":
        chatgptChatEl.classList.add("hidden");
        claudeChatEl.classList.add("hidden");
        geminiChatEl.classList.add("chat-occoupy-all");
        return;

      case "chatgpt":
        geminiChatEl.classList.add("hidden");
        claudeChatEl.classList.add("hidden");
        chatgptChatEl.classList.add("chat-occoupy-all");
        return;

      case "claude":
        chatgptChatEl.classList.add("hidden");
        geminiChatEl.classList.add("hidden");
        claudeChatEl.classList.add("chat-occoupy-all");
        return;
      case "all":
        zoomBtnEl.forEach((btn) => (btn.style.display = "block"));
        return;
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
}

export default new View();
