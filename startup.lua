-- Always get most updated version of the remote (after a delete)
shell.run("delete", "startup")
shell.run("pastebin", "get", "DcyQDBWF" , "startup")
os.reboot()