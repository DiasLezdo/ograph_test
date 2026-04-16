import type { ComponentPropsWithoutRef, ReactNode } from "react";

type CalloutType = "info" | "success" | "warning";

function cx(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function Callout({
  type = "info",
  children,
}: {
  type?: CalloutType;
  children: ReactNode;
}) {
  const styleByType: Record<CalloutType, string> = {
    info: "border-blue-400 bg-blue-50 text-blue-900",
    success: "border-emerald-400 bg-emerald-50 text-emerald-900",
    warning: "border-amber-400 bg-amber-50 text-amber-900",
  };

  return (
    <aside className={cx("my-6 rounded-lg border-l-4 px-4 py-3", styleByType[type])}>
      {children}
    </aside>
  );
}

const components = {
  // Example usage in .mdx:
  // <Callout type="warning">This is a warning box.</Callout>
  h1: ({ className, ...props }: ComponentPropsWithoutRef<"h1">) => (
    <h1
      className={cx("mt-8 text-4xl font-bold tracking-tight text-zinc-900", className)}
      {...props}
    />
  ),
  h2: ({ className, ...props }: ComponentPropsWithoutRef<"h2">) => (
    <h2
      className={cx("mt-8 text-2xl font-semibold tracking-tight text-zinc-900", className)}
      {...props}
    />
  ),
  p: ({ className, ...props }: ComponentPropsWithoutRef<"p">) => (
    <p className={cx("my-4 leading-7 text-zinc-700", className)} {...props} />
  ),
  ul: ({ className, ...props }: ComponentPropsWithoutRef<"ul">) => (
    <ul className={cx("my-4 list-disc space-y-2 pl-6 text-zinc-700", className)} {...props} />
  ),
  a: ({ className, ...props }: ComponentPropsWithoutRef<"a">) => (
    <a
      className={cx(
        "font-medium text-blue-700 underline decoration-blue-300 underline-offset-4 hover:text-blue-900",
        className
      )}
      {...props}
    />
  ),
  pre: ({ className, ...props }: ComponentPropsWithoutRef<"pre">) => (
    <pre
      className={cx(
        "my-6 overflow-x-auto rounded-lg bg-zinc-950 p-4 text-sm text-zinc-100",
        className
      )}
      {...props}
    />
  ),
  code: ({ className, ...props }: ComponentPropsWithoutRef<"code">) => (
    <code className={cx("rounded bg-zinc-100 px-1 py-0.5 font-mono text-sm", className)} {...props} />
  ),
  blockquote: ({ className, ...props }: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className={cx("my-6 border-l-4 border-zinc-300 pl-4 italic text-zinc-700", className)}
      {...props}
    />
  ),
  Callout,
};

export function useMDXComponents() {
  return components;
}
