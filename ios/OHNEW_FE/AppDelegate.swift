import UIKit
import React
import React_RCTAppDelegate
import ReactAppDependencyProvider
import KakaoSDKAuth

@main
class AppDelegate: UIResponder, UIApplicationDelegate {
  var window: UIWindow?

  var reactNativeDelegate: ReactNativeDelegate?
  var reactNativeFactory: RCTReactNativeFactory?

  func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]? = nil
  ) -> Bool {
    // ✅ KakaoSDK.initSDK(appKey: ...) 제거 (Info.plist에서 자동으로 읽음)

    // React Native 초기화
    let delegate = ReactNativeDelegate()
    let factory = RCTReactNativeFactory(delegate: delegate)
    delegate.dependencyProvider = RCTAppDependencyProvider()

    reactNativeDelegate = delegate
    reactNativeFactory = factory

    window = UIWindow(frame: UIScreen.main.bounds)
    if let win = window {
      factory.startReactNative(
        withModuleName: "OHNEW_FE",
        in: win,
        launchOptions: launchOptions
      )
    }

    return true
  }

  // ✅ 카카오 인증 콜백 (iOS 9+)
  func application(
    _ app: UIApplication,
    open url: URL,
    options: [UIApplication.OpenURLOptionsKey : Any] = [:]
  ) -> Bool {
    if (AuthApi.isKakaoTalkLoginUrl(url)) {
      return AuthController.handleOpenUrl(url: url)
    }
    return false
  }
}

class ReactNativeDelegate: RCTDefaultReactNativeFactoryDelegate {
  override func sourceURL(for bridge: RCTBridge) -> URL? {
    self.bundleURL()
  }

  override func bundleURL() -> URL? {
#if DEBUG
    return RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
#else
    return Bundle.main.url(forResource: "main", withExtension: "jsbundle")
#endif
  }
}
