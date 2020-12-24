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

const tokens = require('./tokens.json');
const fs = require('fs');

const foxleyPrefix = 'fa!';
const foxxoPrefix = 'fx!';

const foxley = new discord.Client();
foxley.images = new discord.Collection();
const foxxo = new discord.Client();
foxxo.images = new discord.Collection();

foxley.log = function log(message) {
    console.log(chalk.red('Foxley: ') + message);
}
foxxo.log = function log(message) {
    console.log(chalk.red('Foxxo: ') + message);
}

foxley.on('ready', () => {
    foxley.log('OwO I\'m ready!');
    foxley.log(`Prefix: "${foxleyPrefix}"`);
    const images = fs.readdirSync('./images/foxley/');
    for (const image of images) {
        foxley.images.set(image.replace(/\..+/g, ''), `./images/foxley/${image}`);
        foxley.log(`Loaded image ${image}!`);
    }
});
foxxo.on('ready', () => {
    foxxo.log('OwO I\'m ready!');
    foxxo.log(`Prefix: "${foxxoPrefix}"`);
    const images = fs.readdirSync('./images/foxxo/');
    for (const image of images) {
        foxxo.images.set(image.replace(/\..+/g, ''), `./images/foxxo/${image}`);
        foxxo.log(`Loaded image ${image} as ${image.replace(/\..+/g, '')}!`);
    }
});

// handlers
foxley.on('message', (message) => {
    if (message.author.bot || message.channel.type === 'dm') return;

    if (message.content.startsWith(foxleyPrefix)) {
        let cmd = message.content.slice(foxleyPrefix.length).split(/ +/g)[0];
        if (!foxley.images.get(cmd)) return;
        message.reply('', { files: [foxley.images.get(cmd)] });
    }
});
foxxo.on('message', (message) => {
    if (message.author.bot || message.channel.type === 'dm') return;
    
    if (message.content.startsWith(foxxoPrefix)) {
        let cmd = message.content.slice(foxxoPrefix.length).split(/ +/g)[0];
        if (!foxxo.images.get(cmd)) return;
        message.reply('', { files: [foxxo.images.get(cmd)] });
    }
})

// login
foxley.login(tokens.foxley);
foxxo.login(tokens.foxxo);