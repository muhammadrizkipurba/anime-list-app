import "@/styles/global.css";
import { FC } from "react";
import { AppProps } from "next/app";
import { Provider } from "react-redux";
import { wrapper } from "../redux/store";
import { useStore } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import LoadingScreen from "@/components/ui/loadingScreen";

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  const store = useStore();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <LoadingScreen />
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
};

export default wrapper.withRedux(MyApp);
