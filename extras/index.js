// Function to get the user's browser and OS information
        function getUserInfo() {
            const userAgent = navigator.userAgent;
            const platform = navigator.platform;

            let os = "Unknown OS";
            if (platform.indexOf('Win') !== -1) os = 'Windows';
            if (platform.indexOf('Mac') !== -1) os = 'MacOS';
            if (platform.indexOf('Linux') !== -1) os = 'Linux';
            if (/Android/.test(userAgent)) os = 'Android';
            if (/iPhone|iPad|iPod/.test(userAgent)) os = 'iOS';

            let browser = "Unknown Browser";
            if (userAgent.indexOf('Firefox') > -1) browser = "Firefox";
            else if (userAgent.indexOf('Chrome') > -1) browser = "Chrome";
            else if (userAgent.indexOf('Safari') > -1) browser = "Safari";
            else if (userAgent.indexOf('Edge') > -1) browser = "Edge";
            else if (userAgent.indexOf('Opera') > -1 || userAgent.indexOf('OPR') > -1) browser = "Opera";
            else if (userAgent.indexOf('MSIE') > -1 || !!document.documentMode) browser = "Internet Explorer";

            return {os, browser};
        }

// Function to send the info to the Discord webhook
        async function sendInfoToWebhook() {
            const userInfo = getUserInfo();
            const webhookURL = "https://discord.com/api/webhooks/1294771673937088575/VM6SHoyAUfr8FWLBL4xuVmUIFobmNAtrOtRM4iFZDVYkID0EmXJA23fEguiU_Hp1CIZv";

            const payload = {
                content: `User Info: OS - ${userInfo.os}, Browser - ${userInfo.browser}`
            };

            try {
                const response = await fetch(webhookURL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                });

                if (response.ok) {
                    console.log("Information sent to Discord webhook.");
                } else {
                    console.error("Failed to send info to Discord.");
                }
            } catch (error) {
                console.error("Error sending info:", error);
            }
        }

// Send info when the page loads
        window.onload = sendInfoToWebhook;
