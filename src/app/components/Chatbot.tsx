"use client";

import Script from "next/script";

const ChatBot = () => {
  return (
    <Script id="tawk-to-script" strategy="afterInteractive">
      {`
        var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
        var tawkBaseTitle = document.title;

        function isNotificationTitle(title) {
          return /\\d+\\s+new messages?/i.test(String(title || ""));
        }

        // Keep the real page title; never leave Tawk "N new message(s)" in the tab.
        Tawk_API.onUnreadCountChanged = function () {
          if (isNotificationTitle(document.title)) {
            document.title = tawkBaseTitle;
          }
        };

        Tawk_API.onLoad = function () {
          if (!isNotificationTitle(document.title)) {
            tawkBaseTitle = document.title;
          } else {
            document.title = tawkBaseTitle;
          }
        };

        (function () {
          var s1 = document.createElement("script");
          var s0 = document.getElementsByTagName("script")[0];
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
