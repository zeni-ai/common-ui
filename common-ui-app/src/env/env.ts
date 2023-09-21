import { mapEnvToStatsigEnv, toStatsigEnv } from "./statsigEnv";

export const currentStatsigEnv = toStatsigEnv(
    mapEnvToStatsigEnv("DEV")
  );
  export const statsigClientSecret =
   "ABCD" ?? "";