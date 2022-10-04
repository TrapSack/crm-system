import {
  createContext,
  useContext,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

type ModalContextType = {
  showScroll: () => void;
  hideScroll: () => void;
  addBlur: () => void;
  removeBlur: () => void;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

const ModalContext = createContext<ModalContextType>(null);

export function ModalProvider({ children }) {
  const showScroll = () => {
    document.body.classList.remove("overflow");
    document.body.style.paddingRight = "";
  };

  const hideScroll = () => {
    document.body.classList.add("overflow");
    document.body.style.paddingRight = `${scrollBarWidth}px`;
  };

  const addBlur = () => document.querySelector("#__next").classList.add("blur");
  const removeBlur = () =>
    document.querySelector("#__next").classList.remove("blur");

  const [scrollBarWidth, setScrollBarWidth] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    function getScrollBarWidth() {
      if (!document.body.classList.contains("overflow"))
        setScrollBarWidth(window.innerWidth - document.body.offsetWidth);
    }

    // function call on first render and on state change isLoading
    getScrollBarWidth();

    // 'resize' event to calculate scrollbar width
    window.addEventListener("resize", getScrollBarWidth);
    return () => window.removeEventListener("resize", getScrollBarWidth);
  }, [isLoading]);

  return (
    <ModalContext.Provider
      value={{ showScroll, hideScroll, addBlur, removeBlur, setIsLoading }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  return useContext(ModalContext);
}
