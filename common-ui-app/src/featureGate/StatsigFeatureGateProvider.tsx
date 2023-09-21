
import {
  StatsigOptions,
  StatsigProvider,
  StatsigUser,
  useGate,
} from "statsig-react";



import {currentStatsigEnv, statsigClientSecret} from "../env/env";
import {FeatureGateResult, FeatureFlag} from "./FeatureGateProvider";

//types
interface StatsigProps {
  companyId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any ;
}

//helper functions
const onInitComplete = (
  initDurationMs: number,
  success: boolean,
  message: string | null
) => {
  if (success) {
    console.info(`Statsig initalization complete in ${initDurationMs} ms.`);
  } else {
    console.error(`Statsig initialization failed. ${message}.`);
  }
};

export const useStatsigFeatureGate = (
  featureFlag: FeatureFlag
): FeatureGateResult => {
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {isLoading, value} = useGate(featureFlag);
    return {
      isFeatureGateLoading: isLoading,
      isFeatureEnabled: value,
    };
  } catch (_e) {
    return {
      isFeatureGateLoading: false,
      isFeatureEnabled: false,
    };
  }
};

//statsig config
const statsigOptions: StatsigOptions = {
  environment: {tier: currentStatsigEnv},
  fetchMode: "network-only",
  disableAutoMetricsLogging: true,
  disableCurrentPageLogging: true,
  disableDiagnosticsLogging: true,
  initCompletionCallback: onInitComplete,
};

const StatsigFeatureGateProvider = ({companyId, children}: StatsigProps) => {
  const user: StatsigUser = {custom: {company_id: companyId}};

  return (
    <StatsigProvider
      sdkKey={statsigClientSecret}
      options={statsigOptions}
      user={user}
      shutdownOnUnmount={true}
      waitForInitialization={true}
      initializingComponent={<InitializationComponent />}
    >
      {children}
    </StatsigProvider>
  );
};

export default StatsigFeatureGateProvider;


const InitializationComponent = () => (
 <div>
   Busy
 </div>
);
