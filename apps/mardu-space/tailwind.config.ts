import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

/** Recursive dictionary for nested presets with optional DEFAULTs. */
interface ClipPathDict {
  DEFAULT?: string;
  [key: string]: string | ClipPathDict | undefined;
}

/** Aliases for function shorthands (DEFAULT controls `.clip-path-[...]`). */
type ClipPathFuncMap = Partial<Record<string, string>> & {
  DEFAULT?: string;
};

const CLASS = "clip-path";
const CSS_PROP = "clipPath";

/** Built-in presets (can be overridden/extended via theme.clipPath). */
const BASE_VALUES: ClipPathDict = {
  // keywords
  none: "none",
  margin: "margin-box",
  padding: "padding-box",
  content: "content-box",
  fill: "fill-box",
  stroke: "stroke-box",
  view: "view-box",

  // sample shapes
  inset: "inset(100px 50px)",
  circle: "circle(50px at 0 100px)",
  ellipse: "ellipse(50px 60px at 10% 20%)",
  polygon: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
  path:
    "path('M0.5,1 C0.5,1,0,0.7,0,0.3 A0.25,0.25,1,1,1,0.5,0.3 A0.25,0.25,1,1,1,1,0.3 C1,0.7,0.5,1,0.5,1 Z')",

  // css-wide
  inherit: "inherit",
  initial: "initial",
  revert: "revert",
  "revert-layer": "revert-layer",
  unset: "unset",
};

/** Default function aliases (can be overridden via theme.clipPathFunc). */
const BASE_FUNCS: ClipPathFuncMap = {
  DEFAULT: "path", // `.clip-path-[...]` -> path(...)
  inset: "inset",
  circle: "circle",
  ellipse: "ellipse",
  polygon: "polygon",
  path: "path",
  url: "url",
};

/** Flattens nested dict to `kebab-kebab: value`, preserving top-level DEFAULT. */
function flattenTheme(
  values: ClipPathDict,
  prefix: string[] = [],
  out: Record<string, string> = {},
): Record<string, string> {
  for (const [k, v] of Object.entries(values ?? {})) {
    if (k === "DEFAULT" && typeof v === "string") {
      out.DEFAULT = v;
      continue;
    }
    if (v && typeof v === "object") {
      flattenTheme(v as ClipPathDict, [...prefix, k], out);
    } else if (typeof v === "string") {
      out[[...prefix, k].join("-")] = v;
    }
  }
  return out;
}

const clipPathPlugin = plugin(({ addUtilities, matchUtilities, theme }) => {
  // ----- 1) Static utilities (incl. DEFAULT) -----
  const themed = (theme("clipPath") as ClipPathDict) ?? {};
  const flat = flattenTheme({ ...BASE_VALUES, ...themed });

  const utilities: Record<string, Record<string, string>> = {};

  if (flat.DEFAULT) {
    utilities[`.${CLASS}`] = { [CSS_PROP]: flat.DEFAULT };
    delete flat.DEFAULT;
  }
  for (const [k, v] of Object.entries(flat)) {
    utilities[`.${CLASS}-${k}`] = { [CSS_PROP]: v };
  }
  addUtilities(utilities);

  // ----- 2) Function shorthands -----
  const themedFuncs = (theme("clipPathFunc") as ClipPathFuncMap) ?? {};
  const defaultFn = themedFuncs.DEFAULT ?? BASE_FUNCS.DEFAULT ?? "path";

  const funcs: (Record<string, string> & { DEFAULT: string }) = {
    ...BASE_FUNCS,
    ...themedFuncs,
    DEFAULT: defaultFn,
  };

  // a) DEFAULT wrapper: `.clip-path-[...]`
  matchUtilities(
    {
      [CLASS]: (value: string) => ({
        [CSS_PROP]: `${funcs.DEFAULT ?? "path"}(${value})`,
      }),
    },
    { type: "any" },
  );

  // b) Named function wrappers: `.clip-path-circle-[...]`, etc.
  const { DEFAULT, ...named } = funcs;
  for (const [alias, fn] of Object.entries(named)) {
    if (!fn) continue;
    matchUtilities(
      {
        [`${CLASS}-${alias}`]: (value: string) => ({
          [CSS_PROP]: `${fn}(${value})`,
        }),
      },
      { type: "any" },
    );
  }

  // ----- 3) Raw passthrough -----
  matchUtilities(
    {
      [`${CLASS}-any`]: (value: string) => ({ [CSS_PROP]: value }),
    },
    { type: "any" },
  );

  // ----- 4) CSS variable helper -----
  matchUtilities(
    {
      [`${CLASS}-var`]: (value: string) => ({
        [CSS_PROP]: `var(${value})`,
      }),
    },
    { type: "any" },
  );
});

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./features/**/*.{ts,tsx}"],
  theme: {
    extend: {
      animation: {
        "pulse-ring": "pulse-ring 2s ease-in-out infinite",
        "pulse-ring-delayed": "pulse-ring 2s ease-in-out infinite 0.5s",
      },
      keyframes: {
        "pulse-ring": {
          "0%": {
            transform: "scale(1)",
            opacity: "0.3",
          },
          "50%": {
            transform: "scale(1.1)",
            opacity: "0.1",
          },
          "100%": {
            transform: "scale(1.2)",
            opacity: "0",
          },
        },
      },
    },
  },
  plugins: [clipPathPlugin],
};

export default config;
