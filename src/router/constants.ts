export type RootStackParams = {
    WelcomeScreen: undefined;
    Profile: undefined;
    LoginScreen:undefined;
    EmailInputScreen: undefined;
    PasswordInputScreen: undefined;
    MoreInfoInputScreen: undefined;
    EditUserProfileScreen: undefined;
    SettingScreen: undefined;
    HouseholdProfileScreen: undefined;
    ContactUsScreen: undefined;
    SubscriptionScreen: undefined;
    ReferLogAndEarnScreen: undefined;
    DisplayPreferencesScreen: undefined;
    FoodProfileScreen: undefined;
    LanguageScreen: undefined;
    WeeklyWrapUpTimeScreen: undefined;
    PushNotificationsScreen: undefined;
    ReferDetailsScreen: undefined;
    ShareFamilyScreen: undefined;
  };
  
  export type AuthenticationStackParams = {
    WelcomeScreen: undefined,
    LoginScreen: {
      name: string;
    };
    EmailInputScreen: undefined
    PasswordInputScreen: undefined
    MoreInfoInputScreen: undefined
  };
  