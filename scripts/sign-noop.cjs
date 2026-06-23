// No-op code signing script to bypass signtool.exe during local build
module.exports = async function (configuration) {
  // Just print a log and resolve without doing any actual signing
  console.log(`[sign-noop] Bypassing code signing for: ${configuration.path}`);
};
