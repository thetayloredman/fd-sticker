/**
 * fd-sticker
 * Copyright (C) 2020  BadBoyHaloCat
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

const discord = require('discord.js');
const chalk = require('chalk');
const fs = require('fs');
const express = require('express');

const tokens = require('./tokens.json');
const app = new express();

const foxleyPrefix = 'fa!';
const foxxoPrefix = 'fx!';
const boaPrefix = 'b!';

// status runner
require('http').createServer(app).listen(8081, () => {
    console.log(chalk.red('StatusManager: ') + 'listening on port 8081');
});
app.use('/', (req, res) => {
    console.log(chalk.red('StatusManager: ') + 'got http request');
    res.end('ok');
});

const foxley = new discord.Client();
foxley.images = new discord.Collection();
const foxxo = new discord.Client();
foxxo.images = new discord.Collection();
const boa = new discord.Client();
boa.images = new discord.Collection();

foxley.log = function log(message) {
    console.log(chalk.red('Foxley: ') + message);
}
foxxo.log = function log(message) {
    console.log(chalk.red('Foxxo: ') + message);
}
boa.log = function log(message) {
    console.log(chalk.red('Boa: ') + message);
}

foxley.on('ready', () => {
    foxley.log('OwO I\'m ready!');
    foxley.log(`Prefix: "${foxleyPrefix}"`);
    foxley.user.setActivity(`you call me a cutie | ${foxleyPrefix}help`, { type: 'WATCHING' });
    const images = fs.readdirSync('./images/foxley/');
    for (const image of images) {
        foxley.images.set(image.replace(/\..+/g, ''), `./images/foxley/${image}`);
        foxley.log(`Loaded image ${image}!`);
    }
});
foxxo.on('ready', () => {
    foxxo.log('OwO I\'m ready!');
    foxxo.log(`Prefix: "${foxxoPrefix}"`);
    foxxo.user.setActivity(`you say OwO | ${foxxoPrefix}help`, { type: 'WATCHING' });
    const images = fs.readdirSync('./images/foxxo/');
    for (const image of images) {
        foxxo.images.set(image.replace(/\..+/g, ''), `./images/foxxo/${image}`);
        foxxo.log(`Loaded image ${image} as ${image.replace(/\..+/g, '')}!`);
    }
});
boa.on('ready', () => {
    boa.log('OwO I\'m ready!');
    boa.log(`Prefix: "${boaPrefix}"`);
    boa.user.setActivity(`dhweufh | ${boaPrefix}help`, { type: 'WATCHING' });
    const images = fs.readdirSync('./images/boa/');
    for (const image of images) {
        boa.images.set(image.replace(/\..+/g, ''), `./images/boa/${image}`);
        boa.log(`Loaded image ${image} as ${image.replace(/\..+/g, '')}!`);
    }
})

// handlers
foxley.on('message', (message) => {
    if (message.author.bot || message.channel.type === 'dm') return;

    if (message.content.toLowerCase().startsWith(foxleyPrefix)) {
        let cmd = message.content.slice(foxleyPrefix.length).split(/ +/g)[0].toLowerCase();
        if (cmd === 'help') {
            message.reply(`FDSticker module Foxley Affection (prefix \`${foxleyPrefix}\`)

Loaded stickers: ${foxley.images.reduce((cur, val, key) => cur + '\n' + key, '')}`,);
        }
        if (!foxley.images.get(cmd)) return;
        message.reply('', { files: [foxley.images.get(cmd)] });
    }
});
foxxo.on('message', (message) => {
    if (message.author.bot || message.channel.type === 'dm') return;
    
    if (message.content.toLowerCase().startsWith(foxxoPrefix)) {
        let cmd = message.content.slice(foxxoPrefix.length).split(/ +/g)[0].toLowerCase();
        if (cmd === 'help') {
            message.reply(`FDSticker module Foxxo (prefix \`${foxxoPrefix}\`)

Loaded stickers: ${foxxo.images.reduce((cur, val, key) => cur + '\n' + key, '')}`,);
        }
        if (!foxxo.images.get(cmd)) return;
        message.reply('', { files: [foxxo.images.get(cmd)] });
    }
});
boa.on('message', (message) => {
    if (message.author.bot || message.channel.type === 'dm') return;
    
    if (message.content.toLowerCase().startsWith(boaPrefix)) {
        let cmd = message.content.slice(boaPrefix.length).split(/ +/g)[0].toLowerCase();
        if (cmd === 'help') {
            message.reply(`FDSticker module Boa (prefix \`${boaPrefix}\`)

Loaded stickers: ${boa.images.reduce((cur, val, key) => cur + '\n' + key, '')}`,);
        }
        if (!boa.images.get(cmd)) return;
        message.reply('', { files: [boa.images.get(cmd)] });
    }
});

// login
foxley.login(tokens.foxley);
foxxo.login(tokens.foxxo);
boa.login(tokens.boa);

// exit on sigint
process.on('SIGINT', () => {
    foxley.log('Shutting down...');
    foxley.destroy();
    foxley.log('Offline.')
    foxxo.log('Shutting down...');
    foxxo.destroy();
    foxxo.log('Offline.');
    boa.log('Shutting down...');
    boa.destroy();
    boa.log('Offline.');
    process.exit();
});