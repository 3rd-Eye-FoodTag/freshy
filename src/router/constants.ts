export type RootStackParams = {
    WelcomeScreen: undefined;
    Profile: undefined;
    LoginScreen:undefined;
    EmailInputScreen: undefined;
    PasswordInputScreen: undefined;
    MoreInfoInputScreen: undefined;
    EditUserProfileScreen: undefined;
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
  