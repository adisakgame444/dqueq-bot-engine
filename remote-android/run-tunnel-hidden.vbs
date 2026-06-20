Set shell = CreateObject("WScript.Shell")
shell.CurrentDirectory = "C:\Users\User\dqueq-bot-engine"
shell.Run """C:\Program Files (x86)\cloudflared\cloudflared.exe"" --config ""C:\Users\User\dqueq-bot-engine\remote-android\cloudflared-config.yml"" tunnel run dqueue-remote", 0, True
