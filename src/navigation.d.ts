export type RootStackParamList = {
  Home: undefined
  Details: { medication: Medication } | undefined
};

declare global {
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface RootParamList extends RootStackParamList {}
  }
}