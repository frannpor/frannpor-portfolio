import type { ReactNode, SVGProps } from "react";

/*
 * Own icon set for the portfolio. Drawn on a 24px grid with square caps and
 * mitered joins (matching the hard-edged layout) and, where it fits, one solid
 * square "node" as the recurring signature detail.
 */
export type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & { size?: number | string };
export type Icon = (props: IconProps) => ReactNode;

const node = (x: number, y: number, s = 3) => <rect x={x} y={y} width={s} height={s} fill="currentColor" stroke="none" />;

function make(body: ReactNode): Icon {
  const Component: Icon = ({ size = 24, strokeWidth = 1.75, ...rest }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden={rest["aria-label"] ? undefined : true}
      focusable="false"
      {...rest}
    >
      {body}
    </svg>
  );
  return Component;
}

export const ArrowRight = make(<path d="M3 12h17M14 5l7 7-7 7" />);
export const ArrowLeft = make(<path d="M21 12H4M10 5l-7 7 7 7" />);
export const ArrowDown = make(<path d="M12 3v17M5 14l7 7 7-7" />);
export const ArrowUpRight = make(<path d="M6 18L18 6M8 5.5h10.5V16" />);
export const MoveUpRight = make(<path d="M4 20L18 6M9 4h11v11" />);
export const Check = make(<path d="M4 12.5l5 5L20 6.5" />);
export const X = make(<path d="M5 5l14 14M19 5L5 19" />);
export const Menu = make(<path d="M4 7h16M4 12h10M4 17h16" />);
export const Download = make(<path d="M12 3v12M6 10l6 6 6-6M4 20.5h16" />);
export const Send = make(<><path d="M3 11.5L21 3l-8 18-2.5-7.5z" /><path d="M10.5 13.5L21 3" /></>);
export const Mail = make(<><rect x="3" y="5" width="18" height="14" /><path d="M3 6l9 7 9-7" /></>);
export const Link2 = make(<><path d="M10 8H6a4 4 0 000 8h4M14 8h4a4 4 0 010 8h-4" /><path d="M8.5 12h7" /></>);
export const ZoomIn = make(<><circle cx="10.5" cy="10.5" r="6.5" /><path d="M15.5 15.5L21 21M10.5 7.5v6M7.5 10.5h6" /></>);
export const Languages = make(<><path d="M3 6h11M8.5 4v2M5 6c1 4 3 6.5 6 8M12 6c-1 4-3 6.5-7 8.5" /><path d="M13 20l4-9 4 9M14.5 17h5" /></>);
export const GitBranch = make(<><path d="M6 3v12M6 15c0-4 12-1 12-7" />{node(4.5, 3, 3)}{node(16.5, 5.5, 3)}{node(4.5, 16.5, 3)}</>);
export const Bot = make(<><rect x="4" y="8" width="16" height="12" /><path d="M12 8V4M9 13v2M15 13v2" />{node(10.5, 2, 3)}</>);
export const Blocks = make(<><rect x="3" y="13" width="8" height="8" /><rect x="13" y="13" width="8" height="8" /><rect x="3" y="3" width="8" height="8" /><path d="M13 7h8M17 3v8" /></>);
export const BriefcaseBusiness = make(<><rect x="3" y="7" width="18" height="13" /><path d="M9 7V4h6v3M3 13h18" />{node(10.5, 11.5, 3)}</>);
export const Code2 = make(<path d="M8 6l-6 6 6 6M16 6l6 6-6 6M14 4l-4 16" />);
export const Database = make(<><ellipse cx="12" cy="5.5" rx="8" ry="2.5" /><path d="M4 5.5v13c0 1.4 3.6 2.5 8 2.5s8-1.1 8-2.5v-13M4 12c0 1.4 3.6 2.5 8 2.5s8-1.1 8-2.5" /></>);
export const FileText = make(<><path d="M5 3h9l5 5v13H5zM14 3v5h5M8.5 13h7M8.5 17h7" /></>);
export const Home = make(<><path d="M3 11l9-8 9 8M5.5 9.5V21h13V9.5" />{node(10.5, 15, 3)}</>);
export const Leaf = make(<><path d="M20 4C9 4 4 9 4 15v1c0 2 1 4 4 4 6 0 12-4 12-16z" /><path d="M4 20c2-6 6-9 10-11" /></>);
export const MessagesSquare = make(<><path d="M3 4h13v10H9l-4 3.5V14H3z" /><path d="M19 8h2v12l-3.5-3H10v-2" /></>);
export const Network = make(<><path d="M12 8v4M6 16v-4h12v4" />{node(10.5, 3, 3)}{node(4.5, 16, 3)}{node(10.5, 16, 3)}{node(16.5, 16, 3)}</>);
export const PanelsTopLeft = make(<><rect x="3" y="3" width="18" height="18" /><path d="M3 9h18M9 9v12" />{node(5, 5, 1.5)}</>);
export const Radio = make(<><path d="M7.5 7.5a6.5 6.5 0 000 9M16.5 7.5a6.5 6.5 0 010 9M4 4.5a11 11 0 000 15M20 4.5a11 11 0 010 15" />{node(10.5, 10.5, 3)}</>);
export const Route = make(<><path d="M6 6h8a4 4 0 010 8H9a3.5 3.5 0 000 7h9" />{node(3, 4.5, 3)}{node(18, 19.5, 3)}</>);
export const RotateCcw = make(<path d="M4 12a8 8 0 108-8 8 8 0 00-6 2.7L3.5 9M3.5 4v5h5" />);
export const ServerCog = make(<><rect x="3" y="3" width="18" height="7" /><rect x="3" y="14" width="18" height="7" /><path d="M7 6.5h.01M7 17.5h.01M12 10v4" /></>);
export const ShieldCheck = make(<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6zM8.5 12l2.5 2.5 4.5-5" />);
export const ShoppingCart = make(<><path d="M2.5 3.5H6l2.5 12h10L20.5 7H7" />{node(8, 19, 3)}{node(16, 19, 3)}</>);
export const TerminalSquare = make(<><rect x="3" y="4" width="18" height="16" /><path d="M7 9l3.5 3L7 15M13 15h4" /></>);
export const Truck = make(<><path d="M2 5h12v11H2zM14 9h4.5L22 12.5V16h-8" />{node(5, 17.5, 3)}{node(16.5, 17.5, 3)}</>);
export const Workflow = make(<><rect x="3" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><path d="M10 6.5h4.5a2.5 2.5 0 012.5 2.5v5" /></>);
