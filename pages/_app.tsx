import "../styles/globals.css";
import { Provider } from "react-redux";
import { store, persistor } from "../redux/store";
import { PersistGate } from "redux-persist/lib/integration/react";
import MyContextProvider from "../Context/MyContextProvider";
import { useEffect } from "react";
import { Inter, Manrope, Raleway } from "next/font/google";

export const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
});
export const manrope = Manrope({
	subsets: ["latin"],
	variable: "--font-manrope",
});

export const raleway = Raleway({
	subsets: ["latin"],
	variable: "--font-raleway",
});

export default function App({ Component, pageProps }: any) {
	useEffect(() => {
		window.history.scrollRestoration = "manual";
	}, []);

	useEffect(() => {
		window.addEventListener('scroll', () => {
			document.documentElement.style.setProperty('--scroll-y', `${window.pageYOffset}px`);
		});
	})
	return (
		<>
			<Provider store={store}>
				<PersistGate
					loading={null}
					persistor={persistor}
				>
					<MyContextProvider>
						<style
							jsx
							global
						>{`
							:root {
								----font-raleway: ${raleway.style.fontFamily};
								--font-inter: ${inter.style.fontFamily};
								--font-manrope: ${manrope.style.fontFamily};
							}
						`}</style>
						<Component {...pageProps} />
					</MyContextProvider>
				</PersistGate>
			</Provider>
		</>
	);
}
