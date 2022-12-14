import { useState, useEffect, SyntheticEvent } from "react";
import useResize from "./useResize";

export default function useChangeClassName() {
  const [navToggled, setNavToggled] = useState<boolean>(false);
  const [searchToggled, setSearchToggled] = useState<boolean>(false);
  const [headerClassName, setHeaderClassName] = useState<string>("");

  const windowWidth = useResize();
  const desktopScreen = 1200;

  function closeNav(e: SyntheticEvent):void {
    e.stopPropagation();
    if (windowWidth > desktopScreen) return;
    setNavToggled(false);
  }
  function toggleNav(e: SyntheticEvent):void {
    e.stopPropagation();
    setNavToggled((prev) => !prev);
  }

  function toggleSearch(e: SyntheticEvent ):void {
    e.preventDefault();
    e.stopPropagation();
    setSearchToggled((prev) => !prev);
  }

  useEffect(() => {
    function changeHeaderClassName() {
      if (windowWidth < desktopScreen) {
        if (navToggled && searchToggled) {
          setHeaderClassName("nav-open search-open");
        } else if (searchToggled && !navToggled) {
          setHeaderClassName("search-open");
        } else if (!searchToggled && navToggled) {
          setHeaderClassName("nav-open ");
        } else if (!navToggled && !searchToggled) {
          setHeaderClassName("");
        }
      } else {
        setHeaderClassName("");
      }
    }
    changeHeaderClassName();
  }, [navToggled, searchToggled, windowWidth]);

  return {
    navToggled,
    searchToggled,
    headerClassName,
    toggleSearch,
    closeNav,
    toggleNav,
  };
}
