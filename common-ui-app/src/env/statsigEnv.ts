

const ALL_STATSIG_TYPES = ["development", "staging", "production"] as const;
export const toStatsigEnv = (v: string) => v + ALL_STATSIG_TYPES;
export type StatsigEnv = ReturnType<typeof toStatsigEnv>;

export const mapEnvToStatsigEnv = (Env?: string): StatsigEnv => {
  switch (Env) {
    case "QA":
    case "DEV":
    default:
      return "development";
  }
};
