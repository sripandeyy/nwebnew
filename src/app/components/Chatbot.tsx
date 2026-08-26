"use client";

import Script from "next/script";

const ChatBot = () => {
  return (
    <Script id="tawk-to-script" strategy="afterInteractive">
      {`
        var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
        var tawkPageTitle = document.title;
        var tawkTitleNode = document.querySelector("title");

        function tawkIsNotificationTitle(title) {
          return /\\d+\\s+new messages?/i.test(title) || /^new message/i.test(title);
        }

        function tawkRestoreTitle() {
          if (tawkTitleNode && tawkIsNotificationTitle(document.title)) {
            tawkTitleNode.textContent = tawkPageTitle;
          }
        }

        if (tawkTitleNode) {
          new MutationObserver(function() {
            if (tawkIsNotificationTitle(document.title)) {
              tawkTitleNode.textContent = tawkPageTitle;
            } else {
              tawkPageTitle = document.title;
            }
          }).observe(tawkTitleNode, { childList: true, characterData: true, subtree: true });
        }

        Tawk_API.onUnreadCountChanged = function() {
          tawkRestoreTitle();
        };

        Tawk_API.onChatMessageAgent = function() {
          setTimeout(tawkRestoreTitle, 0);
        };

        Tawk_API.onLoad = function() {
          if (!tawkIsNotificationTitle(document.title)) {
            tawkPageTitle = document.title;
          }
          tawkRestoreTitle();
        };

        (function() {
          var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
          s1.async = true;
          s1.src = "https://embed.tawk.to/69e77be7735c041c325377d6/1jmo3o0ti";
          s1.charset = "UTF-8";
          s1.setAttribute("crossorigin", "*");
          s0.parentNode.insertBefore(s1, s0);
        })();
      `}
    </Script>
  );
};

export default ChatBot;
