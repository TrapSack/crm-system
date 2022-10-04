import { NextComponentType } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { useAppDispatch, useSelector } from "@/features/hooks";
import { setIsAuth } from "@/features/Redux/slices/userSlice";

import Loading from "../components/Loading";

function withAuth<T>(Component: NextComponentType<T>) {
  const Auth = (props: T) => {
    const { isAuth, loading } = useSelector((state) => state.user);
    const dispatch = useAppDispatch();

    useEffect(() => {
      const timeout = setTimeout(() => {
        dispatch(setIsAuth());
      }, 1000);
      return () => {
        clearTimeout(timeout);
      };
    }, []);

    const router = useRouter();
    if (loading) return <Loading />;

    if (!isAuth) {
      router.push("/");
      return null;
    }
    return <Component {...props} />;
  };

  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
}

export default withAuth;
