// Real Internet Access class
class InternetAccess {
  connectTo(site) {
    console.log(`Connecting to ${site}`);
  }
}

// Proxy for Internet Access
class ProxyInternetAccess {
  constructor() {
    this.internet = new InternetAccess();
    this.blockedSites = ["restrictedSite.com", "blockedSite.com"];
  }

  connectTo(site) {
    if (this.blockedSites.includes(site)) {
      console.log(`Access to ${site} is blocked`);
    } else {
      this.internet.connectTo(site); // Forward request to real internet access
    }
  }
}

// Client Code
const proxyInternet = new ProxyInternetAccess();
proxyInternet.connectTo("allowedSite.com"); // Allowed, connects to the internet
proxyInternet.connectTo("restrictedSite.com"); // Blocked, access denied
