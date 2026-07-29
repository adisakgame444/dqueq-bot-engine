# Preparing DQueue clone assets

The `scratch/` directory is intentionally excluded from Git because it contains generated APK assets and third-party build tools. It can be recreated without restoring an old project backup.

1. Download the DQueue XAPK whose package name is `me.deltaqueue.dqueue`.
2. Install project dependencies once:

   ```powershell
   npm.cmd ci
   ```

3. Prepare the clone assets from the XAPK:

   ```powershell
   npm.cmd run clone:prepare -- "C:\path\to\DQueue.xapk"
   ```

   This writes the original split APKs, decoded templates, and `clone-config.json` to `scratch/dqueue-clone/`. It does not modify the source XAPK.

4. Start the application normally. The Manager's add-account action then creates the next DQueue clone and installs it through the configured Android ADB target.

The preparation script reads the XAPK split manifest, so it supports the current `base + config.en + config.mdpi` layout rather than assuming the old `th` and `hdpi` files.

After creating a clone, use its Google connection flow in the Manager. The clone retrieves the issued token from the local Android agent on first launch.
