Set shell = CreateObject("WScript.Shell")
shell.CurrentDirectory = "C:\Users\User\dqueq-bot-engine"
shell.Run """C:\Program Files\nodejs\node.exe"" ""C:\Users\User\dqueq-bot-engine\remote-android\server.cjs""", 0, True
