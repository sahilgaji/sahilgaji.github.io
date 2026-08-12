import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
  type SpringOptions,
} from "framer-motion";
import {
  Children,
  cloneElement,
  createContext,
  isValidElement,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";

const DEFAULT_MAGNIFICATION = 56;
const DEFAULT_DISTANCE = 130;
const DEFAULT_PANEL_HEIGHT = 52;
const DEFAULT_SPRING: SpringOptions = { mass: 0.1, stiffness: 160, damping: 14 };

type DockContextValue = {
  mouseX: MotionValue<number>;
  spring: SpringOptions;
  magnification: number;
  distance: number;
};

const DockContext = createContext<DockContextValue | null>(null);

function useDock() {
  const context = useContext(DockContext);
  if (!context) throw new Error("Dock components must be used within <Dock>");
  return context;
}

type DockProps = {
  children: ReactNode;
  className?: string;
  distance?: number;
  panelHeight?: number;
  magnification?: number;
  spring?: SpringOptions;
};

export function Dock({
  children,
  className,
  spring = DEFAULT_SPRING,
  magnification = DEFAULT_MAGNIFICATION,
  distance = DEFAULT_DISTANCE,
  panelHeight = DEFAULT_PANEL_HEIGHT,
}: DockProps) {
  const mouseX = useMotionValue(Infinity);
  const isHovered = useMotionValue(0);

  const maxHeight = useMemo(() => Math.max(panelHeight, magnification + magnification / 2 + 4), [panelHeight, magnification]);
  const heightRow = useTransform(isHovered, [0, 1], [panelHeight, maxHeight]);
  const height = useSpring(heightRow, spring);

  return (
    <motion.div style={{ height }} className="dock-outer">
      <motion.div
        onMouseMove={(event) => {
          isHovered.set(1);
          mouseX.set(event.pageX);
        }}
        onMouseLeave={() => {
          isHovered.set(0);
          mouseX.set(Infinity);
        }}
        className={className ? `dock-panel ${className}` : "dock-panel"}
        style={{ height: panelHeight }}
      >
        <DockContext.Provider value={{ mouseX, spring, distance, magnification }}>{children}</DockContext.Provider>
      </motion.div>
    </motion.div>
  );
}

type DockItemProps = {
  className?: string;
  children: ReactNode;
  href?: string;
  "aria-label"?: string;
};

export function DockItem({ children, className, href, ...rest }: DockItemProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const { distance, magnification, mouseX, spring } = useDock();
  const isHovered = useMotionValue(0);

  const mouseDistance = useTransform(mouseX, (value) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return 0;
    return value - rect.x - rect.width / 2;
  });

  const widthTransform = useTransform(mouseDistance, [-distance, 0, distance], [40, magnification, 40]);
  const width = useSpring(widthTransform, spring);

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ width }}
      onHoverStart={() => isHovered.set(1)}
      onHoverEnd={() => isHovered.set(0)}
      onFocus={() => isHovered.set(1)}
      onBlur={() => isHovered.set(0)}
      className={className ? `dock-item ${className}` : "dock-item"}
      {...rest}
    >
      {Children.map(children, (child) => {
        if (!isValidElement(child)) return child;
        return cloneElement(child as ReactElement<{ width?: MotionValue<number>; isHovered?: MotionValue<number> }>, {
          width,
          isHovered,
        });
      })}
    </motion.a>
  );
}

type DockLabelProps = {
  className?: string;
  children: ReactNode;
  isHovered?: MotionValue<number>;
};

export function DockLabel({ children, className, isHovered }: DockLabelProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isHovered) return;
    const unsubscribe = isHovered.on("change", (latest) => setIsVisible(latest === 1));
    return () => unsubscribe();
  }, [isHovered]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 0, x: "-50%" }}
          animate={{ opacity: 1, y: -10, x: "-50%" }}
          exit={{ opacity: 0, y: 0, x: "-50%" }}
          transition={{ duration: 0.18 }}
          className={className ? `dock-label ${className}` : "dock-label"}
          role="tooltip"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

type DockIconProps = {
  className?: string;
  children: ReactNode;
  width?: MotionValue<number>;
};

export function DockIcon({ children, className, width }: DockIconProps) {
  const fallback = useMotionValue(40);
  const widthTransform = useTransform(width ?? fallback, (value) => value / 2);

  return (
    <motion.div style={{ width: widthTransform }} className={className ? `dock-icon ${className}` : "dock-icon"}>
      {children}
    </motion.div>
  );
}
