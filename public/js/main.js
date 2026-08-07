// Toggle hamburger menu di mobile
document.addEventListener("DOMContentLoaded", function () {
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const navLinks = document.getElementById("navLinks");

  if (hamburgerBtn && navLinks) {
    hamburgerBtn.addEventListener("click", function () {
      navLinks.classList.toggle("open");

      const isOpen = navLinks.classList.contains("open");
      hamburgerBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  // Form Tanya AI - belum ada logic balasan asli, ini placeholder submit
  const chatForm = document.getElementById("chatForm");
  const chatBox = document.getElementById("chatBox");
  const chatInput = document.getElementById("chatInput");

  if (chatForm) {
    chatForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const question = chatInput.value.trim();
      if (question === "") return;

      const userMsg = document.createElement("p");
      userMsg.classList.add("chat-message", "chat-user");
      userMsg.textContent = question;
      chatBox.appendChild(userMsg);

      chatInput.value = "";
      chatBox.scrollTop = chatBox.scrollHeight;

      // NOTE: logic balasan AI dummy akan diimplementasikan
      // lewat endpoint POST /api/chat di Sprint 2
    });
  }
});