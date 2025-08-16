import type { ToastContentProps } from "react-toastify";

export default function CustomToast(props: ToastContentProps) {
  return <div style={{ marginInline: "auto" }}>{props.data as string}</div>;
}
