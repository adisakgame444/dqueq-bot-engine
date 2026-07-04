"use client";

import nextDynamic from "next/dynamic";

const DeviceControlClient = nextDynamic(
  () => import("./DeviceControlClient"),
  { ssr: false }
);

interface DeviceControlWrapperProps {
  cloneId: number;
}

export default function DeviceControlWrapper({ cloneId }: DeviceControlWrapperProps) {
  return <DeviceControlClient cloneId={cloneId} />;
}
