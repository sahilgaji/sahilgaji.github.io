import Lenis from "lenis";

let instance: Lenis | null = null;

export function getLenis(): Lenis | null {
  return instance;
}

export function setLenis(next: Lenis | null) {
  instance = next;
}

export function pauseSmoothScroll() {
  instance?.stop();
}

export function resumeSmoothScroll() {
  instance?.start();
}
