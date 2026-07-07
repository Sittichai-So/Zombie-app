export default {
  expo: {
    name: "Zombie Quiz RPG",
    slug: "zombie-quiz-rpg",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/images/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.zombiequiz.rpg"
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      package: "com.zombiequiz.rpg"
    },
    web: {
      favicon: "./assets/images/favicon.png"
    },
    plugins: ["expo-localization"]
  }
};