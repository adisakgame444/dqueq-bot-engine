function normalizeDeviceConfig(value) {
  const configuredDevice = String(value || "").trim();
  const hasPinnedDevice = Boolean(
    configuredDevice && configuredDevice.toLowerCase() !== "auto"
  );
  return {
    configuredDevice,
    hasPinnedDevice,
    initialDevice: hasPinnedDevice ? configuredDevice : "127.0.0.1:5555",
  };
}

function candidatePorts(configuredPorts, defaultPorts) {
  return [
    ...new Set([
      ...(configuredPorts || []),
      ...(defaultPorts || []),
    ].filter((port) => Number.isInteger(port) && port > 0 && port <= 65535)),
  ];
}

function isSupportedAndroidVersion(version) {
  return String(version || "").trim().split(".")[0] === "11";
}

function shouldRediscoverDevice({ hasPinnedDevice, isAndroidServiceError }) {
  return Boolean(isAndroidServiceError || !hasPinnedDevice);
}

module.exports = {
  normalizeDeviceConfig,
  candidatePorts,
  isSupportedAndroidVersion,
  shouldRediscoverDevice,
};
