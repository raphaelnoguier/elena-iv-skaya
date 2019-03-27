import bowser from 'bowser'

let config = {}
if (typeof window !== 'undefined') {
  const {browser, os, platform} = bowser.getParser(window.navigator.userAgent).parsedResult

  // Browser
  config.chrome = browser.name === 'Chrome' || browser.name === 'Chromium'
  config.firefox = browser.name === 'Firefox'
  config.safari = browser.name === 'Safari'
  config.edge = browser.name === 'Microsoft Edge'
  config.ie = browser.name === 'Internet Explorer'

  // Platform
  config.desktop = platform.type === 'desktop'
  config.tablet = platform.type === 'tablet'
  config.mobile = platform.type === 'mobile'
  config.device = config.tablet || config.mobile

  // Mobile
  config.ios = os.name === "iOS"
  config.android = os.name === "Android"

}

export default config;
