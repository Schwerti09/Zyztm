/**
 * Fortnite Nexus Discord Bot
 *
 * Features:
 *   - /shop         — Aktueller Item Shop als Embed
 *   - /wishlist     — Skin-Wishlist mit Auto-Alerts
 *   - /challenge    — Weekly Challenge mit Leaderboard
 *   - Auto-Post     — Täglicher Shop-Alert in konfiguriertem Channel
 *   - Wishlist-Alerts — DM-Benachrichtigung wenn Wishlist-Item im Shop
 *
 * ENV:
 *   DISCORD_TOKEN          — Bot Token
 *   DISCORD_CLIENT_ID      — Application Client ID
 *   DISCORD_GUILD_ID       — Server ID (für Dev/Testing, optional)
 *   SHOP_ALERT_CHANNEL_ID  — Channel für tägliche Shop-Alerts
 */

import {
  Client,
  GatewayIntentBits,
  REST,
  Routes,
  Collection,
  EmbedBuilder,
} from 'discord.js';
import { fetchItemShop } from './lib/fortnite-api.mjs';
import { getUsersWantingItem } from './lib/wishlist-store.mjs';

import * as shopCommand from './commands/shop.mjs';
import * as wishlistCommand from './commands/wishlist.mjs';
import * as challengeCommand from './commands/challenge.mjs';

// ─── Config ──────────────────────────────────────────────────────────────────

const TOKEN = process.env.DISCORD_TOKEN;
const CLIENT_ID = process.env.DISCORD_CLIENT_ID;
const GUILD_ID = process.env.DISCORD_GUILD_ID || null;
const SHOP_CHANNEL_ID = process.env.SHOP_ALERT_CHANNEL_ID || null;

if (!TOKEN || !CLIENT_ID) {
  console.error('❌ DISCORD_TOKEN und DISCORD_CLIENT_ID müssen gesetzt sein.');
  process.exit(1);
}

// ─── Client Setup ────────────────────────────────────────────────────────────

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

const commands = new Collection();
commands.set(shopCommand.data.name, shopCommand);
commands.set(wishlistCommand.data.name, wishlistCommand);
commands.set(challengeCommand.data.name, challengeCommand);

// ─── Register Slash Commands ─────────────────────────────────────────────────

async function registerCommands() {
  const rest = new REST({ version: '10' }).setToken(TOKEN);
  const body = [shopCommand.data.toJSON(), wishlistCommand.data.toJSON(), challengeCommand.data.toJSON()];

  try {
    if (GUILD_ID) {
      // Guild-spezifisch (sofortige Registrierung, gut für Dev)
      await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body });
      console.log(`✅ ${body.length} Slash-Commands registriert (Guild: ${GUILD_ID})`);
    } else {
      // Global (kann bis zu 1h dauern)
      await rest.put(Routes.applicationCommands(CLIENT_ID), { body });
      console.log(`✅ ${body.length} Slash-Commands global registriert`);
    }
  } catch (err) {
    console.error('❌ Command-Registrierung fehlgeschlagen:', err);
  }
}

// ─── Event: Ready ────────────────────────────────────────────────────────────

client.once('ready', async () => {
  console.log(`🤖 Bot online: ${client.user.tag}`);
  console.log(`   Guilds: ${client.guilds.cache.size}`);
  console.log(`   Shop-Alert-Channel: ${SHOP_CHANNEL_ID || 'nicht konfiguriert'}`);

  await registerCommands();

  // Täglichen Shop-Alert planen
  if (SHOP_CHANNEL_ID) {
    scheduleShopAlert();
  }
});

// ─── Event: Interaction ──────────────────────────────────────────────────────

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (err) {
    console.error(`Command-Error [${interaction.commandName}]:`, err);
    const reply = { content: '❌ Ein Fehler ist aufgetreten.', ephemeral: true };
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp(reply);
    } else {
      await interaction.reply(reply);
    }
  }
});

// ─── Täglicher Shop-Alert ────────────────────────────────────────────────────

function scheduleShopAlert() {
  // Berechne Millisekunden bis 00:10 UTC (10 Min nach Shop-Rotation)
  const now = new Date();
  const next = new Date(now);
  next.setUTCHours(0, 10, 0, 0);
  if (next <= now) next.setDate(next.getDate() + 1);

  const msUntil = next.getTime() - now.getTime();
  console.log(`⏰ Nächster Shop-Alert in ${Math.round(msUntil / 60000)} Minuten`);

  setTimeout(async () => {
    await postShopAlert();
    // Dann alle 24h wiederholen
    setInterval(postShopAlert, 24 * 60 * 60 * 1000);
  }, msUntil);
}

async function postShopAlert() {
  if (!SHOP_CHANNEL_ID) return;

  try {
    const channel = await client.channels.fetch(SHOP_CHANNEL_ID);
    if (!channel || !channel.isTextBased()) {
      console.error('Shop-Alert: Channel nicht gefunden oder kein Text-Channel');
      return;
    }

    const { items } = await fetchItemShop('de');

    // Rare Items
    const rare = items.filter((i) => i.daysSinceLast >= 90).sort((a, b) => b.daysSinceLast - a.daysSinceLast);

    // Top Featured
    const top = items.slice(0, 8);

    const embed = new EmbedBuilder()
      .setTitle(`🛒 Neuer Item Shop — ${new Date().toLocaleDateString('de-DE')}`)
      .setColor(0xff0055)
      .setURL('https://fortnitenexus.space/item-shop')
      .setDescription(
        `**${items.length} Items** heute im Shop!\n\n` +
          top.map((i) => `• **${i.name}** — ${i.price} V-Bucks *(${i.rarity})*`).join('\n'),
      )
      .setFooter({ text: 'Fortnite Nexus · /shop für Details · /wishlist für Alerts' })
      .setTimestamp();

    if (rare.length > 0) {
      embed.addFields({
        name: '🔥 Seltene Returns',
        value: rare
          .slice(0, 3)
          .map((i) => `**${i.name}** — ${i.daysSinceLast}d nicht im Shop`)
          .join('\n'),
      });
    }

    embed.addFields({
      name: '🔗 Vollständiger Shop',
      value: '[→ fortnitenexus.space/item-shop](https://fortnitenexus.space/item-shop)',
    });

    await channel.send({ embeds: [embed] });
    console.log(`✅ Shop-Alert gepostet (${items.length} Items)`);

    // Wishlist-Alerts senden
    await sendWishlistAlerts(items);
  } catch (err) {
    console.error('Shop-Alert Fehler:', err);
  }
}

// ─── Wishlist DM-Alerts ──────────────────────────────────────────────────────

async function sendWishlistAlerts(shopItems) {
  let alertsSent = 0;

  for (const item of shopItems) {
    const userIds = await getUsersWantingItem(item.name);
    if (userIds.length === 0) continue;

    for (const userId of userIds) {
      try {
        const user = await client.users.fetch(userId);
        await user.send({
          embeds: [
            new EmbedBuilder()
              .setTitle('🔔 Wishlist-Alert!')
              .setColor(0x22c55e)
              .setDescription(
                `**${item.name}** ist jetzt im Fortnite Item Shop!\n\n` +
                  `💰 ${item.price} V-Bucks · ${item.rarity}\n\n` +
                  `[→ Im Shop ansehen](https://fortnitenexus.space/item-shop)`,
              )
              .setThumbnail(item.image || null)
              .setFooter({ text: 'Fortnite Nexus Wishlist · /wishlist remove zum Entfernen' }),
          ],
        });
        alertsSent++;
      } catch (err) {
        // User hat DMs deaktiviert — ignorieren
        console.warn(`Wishlist-DM an ${userId} fehlgeschlagen:`, err.message);
      }
    }
  }

  if (alertsSent > 0) {
    console.log(`📬 ${alertsSent} Wishlist-Alerts gesendet`);
  }
}

// ─── Start ───────────────────────────────────────────────────────────────────

client.login(TOKEN);
