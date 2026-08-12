import { AnimatePresence, motion, type Transition } from "framer-motion";
import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useId,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";

type AnimatedBackgroundProps = {
  children: ReactElement<{ "data-id"?: string; children?: ReactNode }>[] | ReactElement<{ "data-id"?: string; children?: ReactNode }>;
  defaultValue?: string;
  onValueChange?: (newActiveId: string | null) => void;
  className?: string;
  transition?: Transition;
  enableHover?: boolean;
};

export function AnimatedBackground({
  children,
  defaultValue,
  onValueChange,
  className,
  transition,
  enableHover = false,
}: AnimatedBackgroundProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const uniqueId = useId();

  const handleSetActiveId = (id: string | null) => {
    setActiveId(id);
    onValueChange?.(id);
  };

  useEffect(() => {
    if (defaultValue !== undefined) handleSetActiveId(defaultValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue]);

  return (
    <>
      {Children.map(children, (child, index) => {
        if (!isValidElement(child)) return child;
        const id = child.props["data-id"] ?? null;
        const interactionProps = enableHover
          ? {
              onMouseEnter: () => handleSetActiveId(id),
              onMouseLeave: () => handleSetActiveId(null),
            }
          : {
              onClick: () => handleSetActiveId(id),
            };

        return cloneElement(
          child,
          {
            key: id ?? index,
            ...interactionProps,
            children: (
              <>
                <AnimatePresence initial={false}>
                  {activeId === id && (
                    <motion.span
                      layoutId={`animated-background-${uniqueId}`}
                      className={className}
                      transition={transition}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  )}
                </AnimatePresence>
                <span className="animated-background-content">{child.props.children}</span>
              </>
            ),
          } as unknown as Partial<typeof child.props>,
        );
      })}
    </>
  );
}
