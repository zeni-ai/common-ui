import { useContext, createContext} from "react";



import StatsigFeatureGateProvider, {
  useStatsigFeatureGate,
} from "./StatsigFeatureGateProvider";



//types
export interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
}
export interface FeatureGateResult {
  isFeatureGateLoading: boolean;
  isFeatureEnabled: boolean;
}

const ALL_FEATURE_FLAGS = [
'test_flag'
] as const;
export const toFeatureFlag = (v: string) =>
 v+ALL_FEATURE_FLAGS
export type FeatureFlag = ReturnType<typeof toFeatureFlag>;

const useDefaultFeatureGate = (
  featureFlag: FeatureFlag
): FeatureGateResult => {
  console.log(featureFlag);
  return {isFeatureGateLoading: false, isFeatureEnabled: false};
};

const FeatureGateContext = createContext({
  useFeatureGate: useDefaultFeatureGate,
});

const FeatureGateProvider = (props: Props) => {
  const isSignedIn = true;

  const companyId = 'test_id';

  if (isSignedIn && companyId != null) {
    return (
      <StatsigFeatureGateProvider companyId={companyId}>
        <FeatureGateContext.Provider
          value={{useFeatureGate: useStatsigFeatureGate}}
        >
          {props.children}
        </FeatureGateContext.Provider>
      </StatsigFeatureGateProvider>
    );
  } else {
    return (
      <FeatureGateContext.Provider
        value={{useFeatureGate: useDefaultFeatureGate}}
      >
        {props.children}
      </FeatureGateContext.Provider>
    );
  }
};

export const useFeatureGateContext = () => useContext(FeatureGateContext);

export default FeatureGateProvider;
