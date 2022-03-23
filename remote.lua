shell.run("pastebin get 4nRg9CHU json")
os.loadAPI("json")
local ws,err = http.websocket("ws://be5d-2603-800c-3800-6807-8df3-d506-e3d7-4dbf.ngrok.io")
print("Attempting to connect")
local random = math.random
-- generate names for the turtle
local function uuid()
    local template ='xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    return string.gsub(template, '[xy]', function (c)
        local v = (c == 'x') and random(0, 0xf) or random(8, 0xb)
        return string.format('%x', v)
    end)
end
-- ALL FUNCITONS WITH GET OR SET ARE FOR SENDING INFORMATION BACK TO THE WEBSITE
function getName()
    local name = os.getComputerLabel()
    if not name then
        name = uuid()
        os.setComputerLabel(name)
    end
    return name
end
function setContains(set, key)
    return set[key] ~= nil
end
function getInventory()
    local inventory = {}
    for idx = 1, 16 do
        local item = turtle.getItemDetail(idx)
        if item then
            local slot = {slot = idx, name = item.name, count = item.count}
            table.insert(inventory, slot)
        else
            table.insert(inventory, {slot = idx, name = "nothing", count = 0})
        end
    end
    return inventory
end
function getCoord()
    local x,y,z = gps.locate()
    return {x = x, y = y, z = z}

end
-- Most commands for the turtle can be accomplished through its onboard OS, except for rebooting adjacent turtles, this command is only in its lua library.
function rebootBrother()
    peripheral.call("front", "reboot")
end
function getBlocks()
    local isBlockUp, up = turtle.inspectUp()
    local isBlockDown, down = turtle.inspectDown()
    local isBlock, front = turtle.inspect()
    return { up = up, front = front, down = down}
end
function getFuelPercent()
    return math.floor((turtle.getFuelLevel() / turtle.getFuelLimit()) * 100)
end
-- Main loop
if ws then
    print("Connected")
    ws.send(json.encode({tName = getName(), tID = getName(), tInv = getInventory(), tPos = getCoord(), tFuel = getFuelPercent()}))
    while true do
        local msg = ws.receive()
        local obj = json.decode(msg)
        -- If websocket message has prefix "wData", it has come from the website, return information about the turtle
        if setContains(obj, "wData") then
            ws.send(json.encode({tName = getName(), tID = getName(),tInv = getInventory(), tPos = getCoord(), tFuel = getFuelPercent()}))
        end
        -- If websocket message contains this turtles name, then it is a command sent from the website. The command is constructed from the website and executed here
        if setContains(obj, getName()) then
            local func = loadstring(obj[getName()])
            print(obj[getName()])
            func()
            ws.send(json.encode({tID = getName(), tInv = getInventory(), tPos = getCoord(), tBlocks = getBlocks(), tFuel = getFuelPercent()}))
        end
    end
else
    print("Failed to connect")
    print(ws)
    print(err)
end