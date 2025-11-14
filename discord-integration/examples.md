# Discord Integration - Examples

Complete working examples for all three integration methods.

## Method 1: MCP Tools (After Claude Code Restart)

### Example 1: Send Simple Message

**User Request:**
> Send a message to Discord channel 1420759585349697710 saying "Test from Claude Code"

**Assistant Response:**
```javascript
mcp__discord__send-message({
  channel: "1420759585349697710",
  message: "Test from Claude Code"
})
```

**Expected Result:**
```
Message sent successfully to #bot-testing-grounds in Nice Wolf Studio. Message ID: 1234567890123456789
```

---

### Example 2: Send Formatted Message

**User Request:**
> Post a formatted update to the bot-testing-grounds channel

**Assistant Response:**
```javascript
mcp__discord__send-message({
  channel: "1420759585349697710",
  message: `🤖 **Status Update**

✅ System: Online
✅ Database: Connected
✅ API: Healthy

Last checked: ${new Date().toISOString()}`
})
```

---

### Example 3: Read Recent Messages

**User Request:**
> What are the last 10 messages in #bot-testing-grounds?

**Assistant Response:**
```javascript
mcp__discord__read-messages({
  channel: "1420759585349697710",
  limit: 10
})
```

**Expected Result:**
```json
[
  {
    "channel": "#bot-testing-grounds",
    "server": "Nice Wolf Studio",
    "author": "Sombra#2394",
    "content": "Test message",
    "timestamp": "2025-11-04T14:43:09.073Z"
  },
  ...
]
```

---

### Example 4: Using Channel Name (Auto-Discovery)

**User Request:**
> Send "Hello" to the general channel

**Assistant Response:**
```javascript
mcp__discord__send-message({
  channel: "general",  // Channel name instead of ID
  message: "Hello"
})
```

**Note:** MCP server will auto-discover channel by name if bot is only in one server.

---

## Method 2: Gateway Script (Always Available)

### Example 5: Send Message via Script

**User Request:**
> Send a message to Discord right now

**Assistant Response (if MCP not available):**
```bash
cd ~/.claude/discordmcp
node send-test-message.js 1420759585349697710 "Message sent via Gateway script"
```

**Expected Output:**
```
🔌 Connecting to Discord...
✅ Connected to Discord
📡 Bot: Sombra#2394
🏠 Guilds: 1
✅ Found guild: Nice Wolf Studio
✅ Found channel: #bot-testing-grounds
📤 Sending message...
✅ Message sent! ID: 1435281072207171654
👋 Disconnected
```

---

### Example 6: Send Multi-Line Message

**User Request:**
> Post a detailed status report to Discord

**Assistant Response:**
```bash
cd ~/.claude/discordmcp
node send-test-message.js 1420759585349697710 "📊 **Daily Report**

✅ Tasks completed: 15
⏳ In progress: 3
🔴 Blocked: 1

Next update in 24 hours."
```

---

### Example 7: Create Custom Script for Specific Need

**User Request:**
> I need to send messages to multiple channels

**Assistant Response:**
I'll create a custom multi-channel script based on send-test-message.js:

```javascript
// save as: ~/.claude/discordmcp/multi-channel-send.js
import { Client, GatewayIntentBits } from 'discord.js';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
config({ path: join(__dirname, '.env') });

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

async function sendToMultiple() {
  await client.login(process.env.DISCORD_TOKEN);
  await new Promise((resolve) => client.once('ready', resolve));

  const channels = [
    "1420759585349697710",  // bot-testing-grounds
    "ANOTHER_CHANNEL_ID",
  ];

  const message = process.argv[2] || "Multi-channel broadcast";

  for (const channelId of channels) {
    const channel = await client.channels.fetch(channelId);
    if (channel && 'send' in channel) {
      await channel.send(message);
      console.log(`✅ Sent to ${channel.name}`);
    }
  }

  await client.destroy();
}

sendToMultiple().catch(console.error);
```

**Usage:**
```bash
cd ~/.claude/discordmcp
node multi-channel-send.js "Broadcast message"
```

---

## Method 3: REST API (Last Resort)

### Example 8: Simple REST API Test

**User Request:**
> Test if the bot token works

**Assistant Response:**
```bash
# Get bot info
curl -H "Authorization: Bot ${DISCORD_BOT_TOKEN}" \
  https://discord.com/api/v10/users/@me | python3 -m json.tool
```

**Expected Output:**
```json
{
  "id": "1435274653126889544",
  "username": "Sombra",
  "bot": true,
  "verified": true
}
```

---

### Example 9: Check Bot's Guilds

**User Request:**
> Which servers is the bot in?

**Assistant Response:**
```bash
curl -H "Authorization: Bot ${DISCORD_BOT_TOKEN}" \
  https://discord.com/api/v10/users/@me/guilds | python3 -m json.tool
```

---

### Example 10: Try Sending via REST (Expect Failure)

**User Request:**
> Try sending via REST API

**Assistant Response:**
```bash
curl -X POST "https://discord.com/api/v10/channels/1420759585349697710/messages" \
  -H "Authorization: Bot ${DISCORD_BOT_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{"content": "Test from REST API"}'
```

**Likely Error:**
```json
{"message": "Missing Access", "code": 50001}
```

**Explanation:** REST API often fails due to OAuth scope issues. Use Gateway method (Method 2) instead.

---

## Troubleshooting Examples

### Example 11: MCP Tools Not Available

**User Request:**
> Send a message to Discord

**Assistant Attempt:**
```javascript
mcp__discord__send-message({
  channel: "1420759585349697710",
  message: "Test"
})
```

**Error:**
```
Error: No such tool available: mcp__discord__send-message
```

**Assistant Recovery:**
The Discord MCP tools aren't loaded yet. Let me use the Gateway script instead:

```bash
cd ~/.claude/discordmcp
node send-test-message.js 1420759585349697710 "Test"
```

**Success:**
```
✅ Message sent! ID: 1435281072207171654
```

**Explanation to User:**
> The MCP tools require a full Claude Code restart to load. I've used the Gateway script method instead, which works immediately. If you want to use MCP tools in the future, quit and relaunch Claude Code.

---

### Example 12: Missing Channel Permissions

**User Request:**
> Send to channel 9999999999999999999

**Assistant Attempt:**
```bash
node send-test-message.js 9999999999999999999 "Test"
```

**Error:**
```
❌ Error: Missing Access
DiscordAPIError[50001]: Missing Access
```

**Assistant Response:**
The bot doesn't have permission to access that channel. Let me help you fix this:

1. **Verify the channel ID is correct:**
   ```
   Right-click the channel in Discord → Copy Channel ID
   ```

2. **Grant bot permissions:**
   - Right-click the channel → Edit Channel
   - Permissions → Add "Sombra" bot
   - Enable: View Channel, Send Messages

3. **Try again after granting permissions**

---

### Example 13: Bot Not in Server

**User Request:**
> Send to my private server

**Assistant Check:**
```bash
curl -H "Authorization: Bot ${DISCORD_BOT_TOKEN}" \
  https://discord.com/api/v10/users/@me/guilds
```

**Response:**
```json
[
  {
    "id": "745376918030909471",
    "name": "Nice Wolf Studio"
  }
]
```

**Assistant Response:**
The bot is only in "Nice Wolf Studio" server currently. To add it to your private server:

**For Sombra (Local MCP):**
```
https://discord.com/api/oauth2/authorize?client_id=1435274653126889544&permissions=69632&scope=bot
```

After inviting the bot, you can send messages to channels in that server.

---

## Complete Workflow Examples

### Example 14: First-Time Setup Verification

**User Request:**
> Make sure Discord integration is working

**Assistant Workflow:**

**Step 1: Test token**
```bash
curl -H "Authorization: Bot $(grep DISCORD_TOKEN ~/.claude/discordmcp/.env | cut -d= -f2)" \
  https://discord.com/api/v10/users/@me
```

**Step 2: Check guilds**
```bash
curl -H "Authorization: Bot $(grep DISCORD_TOKEN ~/.claude/discordmcp/.env | cut -d= -f2)" \
  https://discord.com/api/v10/users/@me/guilds
```

**Step 3: Test MCP server**
```bash
cd ~/.claude/discordmcp && node build/index.js &
sleep 3
pkill -f "node build/index.js"
```

**Step 4: Send test message**
```bash
cd ~/.claude/discordmcp
node send-test-message.js 1420759585349697710 "✅ Discord integration test successful"
```

**Report:**
> ✅ All checks passed! Discord integration is working correctly.
> - Bot: Sombra#2394
> - Server: Nice Wolf Studio
> - Test message sent successfully
>
> MCP tools will be available after a full Claude Code restart.

---

### Example 15: Switching Between Bots

**User Request:**
> Use the tjr-suite bot instead of Sombra

**Assistant Response:**

Currently, Sombra (Local MCP) is configured for Claude Code. GladOSv3 (tjr-suite bot) is running separately in the tjr-suite application.

**To use GladOSv3 from Claude Code:**

1. **Update MCP config to use tjr-suite token:**
   ```bash
   # Edit ~/.claude/discordmcp/.env
   DISCORD_TOKEN=MTQyNTg1MDgzNjI3NzM5NTUwNg...  # GladOSv3 token
   DISCORD_CLIENT_ID=1425850836277395506
   ```

2. **Rebuild and restart:**
   ```bash
   cd ~/.claude/discordmcp
   npm run build
   ```

3. **Restart Claude Code**

**Or, keep them separate:**
- Use Sombra for Claude Code (current setup)
- Use GladOSv3 for tjr-suite app (via slash commands in Discord)

---

## Best Practices from Experience

### Always Use Gateway Methods When Possible

**❌ Don't:**
```bash
# REST API (often fails)
curl -X POST "..." -H "Authorization: Bot $TOKEN" ...
```

**✅ Do:**
```bash
# Gateway script (reliable)
cd ~/.claude/discordmcp && node send-test-message.js CHANNEL_ID "Message"
```

**Or even better:**
```javascript
// MCP tools (after restart)
mcp__discord__send-message({ channel: "...", message: "..." })
```

---

### Check Method Availability First

**✅ Good Pattern:**
```
1. Try MCP tool
2. If not available, use Gateway script
3. Explain REST limitations if asked
```

**❌ Bad Pattern:**
```
1. Jump straight to REST API
2. Get "Missing Access" error
3. Struggle with permissions
```

---

### Provide Context in Error Messages

**❌ Don't:**
```
Error: Missing Access
[end response]
```

**✅ Do:**
```
Error: Missing Access

This means the bot doesn't have permission to access that channel.

To fix:
1. Right-click the channel → Edit Channel
2. Permissions → Add "Sombra"
3. Enable: View Channel, Send Messages

Alternatively, I can use a different method...
```

---

## Summary: When to Use Each Method

| Scenario | Use Method |
|----------|------------|
| MCP tools available | Method 1 (MCP) |
| MCP tools not loaded | Method 2 (Gateway script) |
| Need immediate result | Method 2 (Gateway script) |
| Testing token validity | Method 3 (REST API) |
| Checking bot guilds | Method 3 (REST API) |
| Actually sending messages | Method 1 or 2 (NOT REST) |
| Custom workflows | Method 2 (customize script) |
| Multiple channels | Method 2 (custom script) |

**Golden Rule:** Gateway > REST for actual message operations.
