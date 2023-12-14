import { PostHogOptions, PostHogProvider } from 'posthog-react-native'
import { ComponentProps } from 'react';
import { Platform, View } from 'react-native';

const postHogOptions: PostHogOptions = {
  host: "https://eu.posthog.com",
  enable: process.env.NODE_ENV === "production"
};

export default function ReportingProvider({ children }: ComponentProps<typeof View>) {
  if (Platform.OS === "web") return children;

  return (
    <PostHogProvider
      apiKey="phc_RsmRdAMG6RSS4uM1F500S0BBvn1TC7gMxHbsqhg4wpj"
      options={postHogOptions}
    >
      {children}
    </PostHogProvider>
  )
}
