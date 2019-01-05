const Discord = require('discord.js')
const fs      = require('fs')
const Embeds  = require('./embed')
const superagent = require('./giveaway.js')
const Giveaway = require('.')
const config = JSON.parse(fs.readFileSync('config.json', 'utf8'))

var client = new Discord.Client()



client.on('warn', console.warn);
client.on('error', console.error);
client.on('ready', () => console.log(`${client.user.username} is ready!`));
client.on('disconnect', () => console.log('I just disconnected, making sure you know, I will reconnect now...'));
client.on('reconnecting', () => console.log('I am reconnecting now!'));
client.on("ready", () => {

    console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
   
    client.user.setActivity(`#help | [Beta 3.0.9] Auf ${client.guilds.size} Servern!`)
    // #help | Auf ${client.guilds.size} Servern(Beta 2.2.0)
    client.user.setStatus("online")
    let Embed = new Discord.RichEmbed()
    .setTitle("Online")
    .setThumbnail(client.user.avatarURL)
    .addField("Time", new Date())
    .addField("My Full Username", `${client.user.username}#${client.user.discriminator}`)
    .addField("Owner of the Bot", `${client.users.get("373857433380061184").username}#${client.users.get("373857433380061184").discriminator}`)
    .addField("Welcome", "I'm happy to help you out!")
    .setFooter("LuluBotLA", client.user.avatarURL)
    .setTimestamp()
    client.channels.get("449990525441933322").send(Embed)
  });

var cmdmap = {

    say:               cmd_say,
    botinfo:           cmd_botinfo,
    help:              cmd_help,
    justine:           cmd_justine,
    stop:              cmd_stop,
    CreepyPastaKiara1: cmd_kiara1,
    CreepyPastaKiara:  cmd_kiara,  
    botinvite:         cmd_botinvite,
    game:              cmd_game,
    zelda:             cmd_zelda,
    mario:             cmd_mario,
    fortnite:          cmd_fortnite,
    nv:                cmd_nv,
    alter:             cmd_alter,
    kick:              cmd_kick,
    emojiliste:        cmd_emojiliste,
    react:             cmd_react,
    binlulu:           cmd_binlulu,
    binsharox:         cmd_binsharox,
    serverlist:        cmd_serverliste,
    ask:               cmd_ask,
    meme:              cmd_meme,
    luluarmy:          cmd_luluarmy,
    binkiara:          cmd_binkiara,
    hund:              cmd_hund,
    status:            cmd_status,
    serverinfo:        cmd_serverinfo,
    onlinestatus:      cmd_onlinestatus,
    msg:               cmd_msg,
    id:                cmd_id,
    vote:              cmd_vote,
    userinfo:          cmd_userinfo,
    switchfcset:       cmd_switchfcset,
    profil:            cmd_profil,
    sayembed:          cdm_sayembed,
    roboter:           cmd_roboter,
    restart:           cmd_restart,
    uptime:            cmd_uptime
}
// Robotor Command~ Englisch
function cmd_roboter(msg, args){
    if(args[0] == undefined) return msg.channel.send("How do you name your Robot?")
    let embed = new Discord.RichEmbed()
    .setDescription(`Thats how a robot named: ${args.join(" ")} look like`)
    .setImage(`https://robohash.org/${args.join(" ")}`)
    msg.channel.send(embed)
}
// BinLuluCommand~ Englisch
function cmd_binlulu(msg, args){
    if(msg.author.id === config.owner){
        msg.channel.send("Thats right!")
    }
    else if(msg.author.id !== config.owner){
        msg.channel.send("Sure?")
    }
}
// ID Command~ Englisch
function cmd_id(msg, args){
    let idembed = new Discord.RichEmbed()
    .setTitle("ID'S")
    .setColor("#e03e16")
    .addField("User ID", msg.author.id)
    .addField("Server ID", msg.guild.id)
    .addField("Channel ID", msg.channel.id)
    msg.channel.send(idembed)
}
// SayEmbed Command~ Englich?
function cdm_sayembed(msg, args){
    if(args[0] != undefined){
        Embeds.grün(msg.channel, args.join(' '))
        
       msg.delete()}
}
// Switchfcset Command
function cmd_switchfcset(msg, args){
    let mentioned = msg.mentions.members.first()
    if(!mentioned){
    let switchfc = JSON.parse(fs.readFileSync("./switchfc.json", "utf8"));

    switchfc[msg.author.id] = {
        switchfc: args.join(" ")
    };

    fs.writeFile("./switchfc.json", JSON.stringify(switchfc), (err) => {
        if(err) console.log(err)
    });

    let sEmbed = new Discord.RichEmbed()
    .setColor("#FF9900")
    .setTitle("Switch FC gesetzt!")
    .setDescription(`Gesetzt auf ${args.join(" ")}`)

    msg.channel.send(sEmbed)
}else
if(mentioned){
    let lulu = config.owner == msg.author.id
    if(lulu){
        args[0] = "SW-"
    let switchfc = JSON.parse(fs.readFileSync("./switchfc.json", "utf8"));

    switchfc[mentioned.user.id] = {
        switchfc: args.join(" ")
    };

    fs.writeFile("./switchfc.json", JSON.stringify(switchfc), (err) => {
        if(err) console.log(err)
    });

    let sEmbed = new Discord.RichEmbed()
    .setColor("#FF9900")
    .setTitle("Switch FC gesetzt!")
    .setDescription(`Gesetzt auf ${args.join(" ")}`)

    msg.channel.send(sEmbed)
}else
if(!lulu) return msg.channel.send("Nein!!!!! nur LULU darf die Switch FC's von anderen festlegen!!!")
}
}
// Profil Command
function cmd_profil(msg, args){
        let switchfc = JSON.parse(fs.readFileSync("./switchfc.json", "utf8"))
        let profilvonanderen = msg.mentions.members.first()
        if(!profilvonanderen){
        if(!switchfc[msg.author.id]) {
          switchfc[msg.author.id] = {
            switchfc: "nicht gesetzt setze deinen Switch FC mit #switchfcset"
          }
        }
    
    
        let sfc = switchfc[message.author.id].switchfc
        let profilembed = new Discord.RichEmbed()
        .setTitle(`Profil von ${msg.author.username}!`)
        .setColor("#c910a4")
        .addField("Nintendo Switch Freundescode <:NintendoSwitch:450732846722842658>", sfc)
        msg.channel.send(profilembed)
   
        }else
        if(profilvonanderen){
        if(!switchfc[profilvonanderen.user.id]) {
            switchfc[profilvonanderen.user.id] = {
              switchfc: "nicht gesetzt setze deinen Switch FC mit #switchfcset"
            }
          }
      
      
          let sfc = switchfc[profilvonanderen.user.id].switchfc
        let profilembed = new Discord.RichEmbed()
        .setTitle(`Profil von ${profilvonanderen.user.username}!`)
        .setColor("#c910a4")
        .addField("Nintendo Switch Freundescode <:NintendoSwitch:450732846722842658>", sfc)
          msg.channel.send(profilembed)
    }
}
// Onlinestatus Command
function cmd_onlinestatus(msg, args){
    let lulu = msg.author.id = config.owner
    if(!lulu) return msg.channel.send(`Ne <@${msg.author.id}> auf dich hör ich nicht(also bei solchen sachen)!`)
    if(lulu){
    let status = args[0];
    if(status == undefined) msg.channel.send(`<@${msg.author.id}>, Okay da du vergessen hast wie du deinen Bot bedienst.. es gibt folgende staten online, dnd(= do not disturb), idle(=AFK) und invisible(=offline)`)
    if(status != undefined){
        client.user.setStatus(`${status}`)
        let ostatusembed = new Discord.RichEmbed()
        .setTitle("OnlineStatus")
        .setColor("#25db43")
        .setDescription("Der Botstatus wurde erfolgreich zu" + " " + "**" + status + "**" + " " + "geändert")
        msg.channel.send(ostatusembed)
    }}
}
function cmd_status(msg, args){
    let lulu = msg.author.id == config.owner
    let sharox = msg.author.id = config.sharox
    let kiara = msg.author.id = config.kiara
    if(lulu){
    
    let game = args.join(' ')
    
    if(kiara){
    
        let game = args.join(' ')
        client.user.setActivity(game)
        let statusembed = new Discord.RichEmbed()
        .setColor("#3ee8e5")
        .setDescription("Der Botstatus wurde erfolgreich zu" + " " + "**" + game + "**" + " " + "geändert")
        msg.channel.send(statusembed)}else
        if(sharox){
    
            let game = args.join(' ')
            client.user.setActivity(game)
            let statusembed = new Discord.RichEmbed()
            .setColor("#3ee8e5")
            .setDescription("Der Botstatus wurde erfolgreich zu" + " " + "**" + game + "**" + " " + "geändert")
            msg.channel.send(statusembed)}else
            if(lulu){
                let game = args.join(' ')
                client.user.setActivity(game)
                let statusembed = new Discord.RichEmbed()
                .setColor("#3ee8e5")
                .setDescription("Der Botstatus wurde erfolgreich zu" + " " + "**" + game + "**" + " " + "geändert")
                msg.channel.send(statusembed)}
            }else
            if(!lulu){
                if(!sharox){
                    if(!kiara){msg.channel.send(`Was denkste wer du bist <@${msg.author.id}> ich denke net das ich auf dich hören muss!`)}
                }
            }

}
function cmd_msg(msg, args){
 let channelid = args[0]
    args[0] = " "
    let text = args.join(" ")
    if(channelid == undefined) return msg.reply("Bitte schreibe es so: #msg (channelid) (text) falls du nicht in der lage bist die channel id herauszufinden benutze #id und du findest die (wichtig) **aktuelle** channel id! ")
    if(channelid != undefined){
    client.channels.get(`${channelid}`).send(`[Send by Server: ${msg.guild.name}] [Send by User: ${msg.author.username}]:${text}`)}
    let msgembed = new Discord.RichEmbed()
    .setTitle("Erfolgreich gesendet")
    .addField("Nachricht gesendet an", channelid)
    .addField("Mit dem Text:", text)
    msg.channel.send(msgembed)

}
function cmd_serverinfo(msg, args){
    let sicon = msg.guild.avatarURL;
    let serverembed = new Discord.RichEmbed()
    .setThumbnail(msg.guild.avatarURL)
    .setTitle(`Server Info zu ${msg.guild.name}` )
    .setColor("#78078c")
    .addField("Erstellt am", message.guild.createdAt)
    .addField(`Du(${msg.author.username}) bist beigetreten am`, message.guild.joinedAt)
    .addField("Mitglieder insgesammt", message.guild.memberCount)
    msg.channel.send(serverembed)
}
function cmd_userinfo(msg, args){
    let BotSettings = client.config;
   
    const target = msg.mentions.members.first() || msg.guild.members.get(args[0]) || msg.member

        let embed = new Discord.RichEmbed()


        .setColor(target.highestRole.color || msg.vars.embedRandom)
        .setTimestamp()
        .setTitle(`Userinfo about: ${target.user.username}`, true)
        .addField(`Username + Usertag:`, `**${target.user.username}**#${target.user.discriminator}`, true)
        .setFooter(msg.author.tag, msg.author.avatarURL || `https://cdn.discordapp.com/attachments/495571358604853258/521676498810175488/Err.png`)


    if(target.user.username != target.displayName) {
        embed.addField(`Nickname:`, `**${target.displayName}**`, true)
    } else {
        embed.addField(`Nickname:`, `-`, true)
    }

    embed.addField(`User ID:`, `${target.id}`, true)
    embed.addField(`Current server ID:`, `${msg.guild.id}`, true)
    embed.addField(`Current channel ID:`, `${msg.channel.id}`, true)

    if (target.presence.game) {
        embed.addField(`Game activity:`, `${config.Activitytypes[target.user.presence.game.type]} **${target.user.presence.game.name}**`, true)
    } else {
        embed.addField(`Activity`, `-`)
    }

    embed.addField(`Status:`, `${config.Usertypes[target.presence.status]}`, true)

    embed.addField(`Roles:`, `${target.roles.map(roles => roles).splice(1).join(", ").substr(0, 900) || `-`}`, true)

    embed.addField(`Server joined at:`, `**${moment(target.joinedAt).format("DD.MM.YYYY HH:mm")}**`,true )

    embed.addField(`Account created at:`, `**${moment(target.user.createdAt).format("DD.MM.YYYY HH:mm")}**`, true)
    
    .setThumbnail(`${target.user.displayAvatarURL}`)


    msg.channel.send(embed)
   }
function cmd_meme(msg, args){
    
    let replies = ["https://media.giphy.com/media/l4Ki2obCyAQS5WhFe/giphy.gif", "https://i.imgflip.com/2aj949.jpg", "http://i0.kym-cdn.com/photos/images/facebook/001/217/729/f9a.jpg", "https://fthmb.tqn.com/M1ISdSdfLsU36nAuILe3YlFcY1w=/400x400/filters:fill(auto,1)/success-56a9fd1f3df78cf772abee09.jpg", "http://www.digitalwiki.de/wp-content/uploads/2017/02/That-would-be-great-meme.jpg"];
    
    
    let results = Math.floor((Math.random() * replies.length));
    
     msg.channel.send(replies[results]);
}
function cmd_luluarmy(msg, arsg){
    msg.channel.send(`LuluArmy
Link: https://discord.me/luluarmy
Emotes:<:Dedede:422093869325221889> <:Kirby:422093892653940736> <:RobobotHalberd:422093916922314754> <:Troepfli:422093982785470466> <:WaddleDeeSchirm:422094034451038219> <:WaddleDeeNormal:422094073437093898> <:WaddleDoo:422094093636599850> <:LegendeWhispyWoods:422094114478358559> <:Robobot:422094903141466113> <:Ally:422095619914596374> <:SchlafKirby:422097617044897806> <:KirbyStern:422104376375771146> <:MetaKnight:422397197342998528> <:AntoniaDumm:425018587607072768> <:AntoniaFacepalm:425030147532390411> <:KirbyHi:427762193896046603> <:AntoniaLacht:434387933525704724> <a:LuluTriggered:434724827127873536> <:AntoniaCreepy:434789587517308939>
Beschreibung: Hier wohnt der Owner des Bots kommt gerne rauf und schreibt mit den größten kirby/Nintendo fans!`)
}
function cmd_binsharox(msg, args){
    if(msg.author.id === config.sharox){
        msg.channel.send("Das stimmt!")
    }
    else if(msg.author.id !== config.sharox){
        msg.channel.send("Nein bist net der swaggy sponsor der luluarmy LOL!")
        if(msg.author.id === config.owner){
            msg.channel.send("aber du bist lulu XD also tu #binlulu du trottel XD")
        }
    }
   
}
function cmd_binkiara(msg, args){
    if(msg.author.id === config.kiara){
        msg.channel.send("Das stimmt!")
    }
    else if(msg.author.id !== config.kiara){
        msg.channel.send("Nein")
        if(msg.author.id === config.owner){
            msg.channel.send("aber du bist lulu XD also tu #binlulu du trottel XD")
        }
    }
   
}
async function cmd_vote(msg, args){
    let vote = args.join(" ")
    let votetext = await msg.channel.send(vote);
                   await votetext.react("✅");
                   await votetext.react("❎");
  
    

}
function cmd_restart(msg, args) {
    let restartchannel = msg.channel
    if(msg.author.id == config.owner) {
        client.destroy()  
        .then(client.login(config.token))
        msg.channel.send(`Restart...`)
        client.on("ready", async () => restartchannel.send("I'm back!"))
    } else {
        msg.reply(`Dev only!`)
    }
}

function cmd_uptime(msg, args) {
    if(msg.author.id == config.owner) {
    let t = new Date(client.uptime)

    let days = t.getUTCDate()-1;

    let minutes = t.getUTCMinutes();
    let hours = t.getUTCHours();


    let seconds = t.getUTCSeconds();


    let uptime = `Last Restart since: ${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;
    msg.channel.send(uptime)
    } else {
        msg.reply(`Dev only!`)
    }
}
function cmd_serverliste(msg, args){
    String.prototype.replaceAll = function (search, replacement) {
        var target = this;
        return target.replace(new RegExp(search, 'g'), replacement);
    };
    var embed = new Discord.RichEmbed()
    .addField("Info", "Bot guilds")
    .addField("Server anzahl", `${client.guilds.size}`)
    .addField("Server namen", client.guilds.array().toString().replaceAll(",", "\n"))
    .setFooter("#help für Hilfe")
    .setColor("#56F21B")
    msg.channel.sendEmbed(embed);
}
function cmd_say(msg, args) {
    if(args[0] != undefined){
    msg.channel.send(args.join(' '))
    
   msg.delete()
    }
    else if(args[0] == undefined) return msg.reply("was soll ich denn sagen?")
}
async function cmd_hund(msg, args){
    let { body } = await superagent
    .get(`https://random.dog/woof.json`);

    let dogembed = new Discord.RichEmbed()
    .setColor("#14d4e5")
    .setTitle("HUNDI!")
    .setImage(body.url)
    .setFooter("Powered by random.dog")
    msg.channel.send(dogembed)
}

function cmd_alter(msg, args) {
    let age = args[0];
    if(age == undefined) return msg.reply(`du solltest schon ein alter angeben^^`)
    else if(age != undefined){
    msg.channel.send(`${msg.author.username} wurde erfolgreich als ${age} jahre alt registriert`)
    }
}

function cmd_ask(msg, args){
    if(!args[0]) return msg.reply("Bitte Stelle eine ganze frage!");
    let replies = ["Ja", "Nein", "Denke schon", "Denke nicht", "Auf  jeden fall", "Auf keinen fall"];
    
    let question = args.slice(0).join(" ");
    let results = Math.floor((Math.random() * replies.length));
    let askEmbed = new Discord.RichEmbed()
     .setAuthor(msg.author.tag)
     .setColor("#FF9900")
     .addField("Frage", question)
     .addField("Antwort", replies[results]);
     msg.channel.send(askEmbed);
}
function cmd_kick(msg, args) {
   
    if(msg.member.hasPermission("KICK_MEMBERS")){
   let kmember = msg.mentions.members.first();
   let reason = args.slice(1).join(" ");
kmember.kick(reason)
msg.channel.send(`${kmember} wurde erfolgreich gekickt Grund: ${reason}`)


} 
if(!msg.member.hasPermission("KICK_MEMBERS")) return msg.reply("Sorry, du hast nicht die Rechte dafür.");
    

}

function cmd_nv(msg, args) {
    Embeds.grün(msg.channel, `Version: ${Version}`)
}
function cmd_kiara(msg, args) {
   Embeds.rot(msg.channel, '#CreepyPastaKiara1', 'Creepy Pastas von Kiara bis jetzt(1):')
}
// qQQEggA
function cmd_kiara1(msg, args) {
   Embeds.rot(msg.channel, 'Es war ein normaler Tag und ich war mit einer Tasche, wo Handy, 3ds und Kopfhörer drin war, ein wenig draußen unterwegs und bin einfach ohne Orientierung rum gelaufen also ohne wirklichen Plan, wohin ich eigentlich wollte und hab nach ein paar Stunden eine interessante Gasse gefunden, die ich gar nicht kannte, obwohl ich schon immer hier wohne und bin da dann lang gelaufen, über waren verlassene Häuser, die aussehen als hätten die eine Renovierung nötig aber bei einem war Licht aber das war genau so herrunter gekommen als die anderen, da mich die Neugier gepackt hat, bin ich an ein Fenster gelaufen, in der Hoffnung was sehen zu können, zu meiner Überraschung waren die Fenster abgeriegelt und man konnte nicht hinnein schauen, was ziemlich seltsam ist, zumindest hier in der Gegend aber ich wollte unbedingt wissen, was da drin ist, da es das einzige Haus in der Gase mit Licht ist und hab eine offene Tür gefunden, wenn ich einfach so rein gehen sollte, wäre es Einbruch aber hab nicht weiter nachgedacht und bin einfach rein, der Flur war dunkel, wie die anderen Räume, hab mich gefragt, wo dann das Licht her kommt und fande eine Tür, die Abgeriegelt war und hab nach etwas gesucht, um die öffnen zu können aber fande nichts und bin dagegen gelaufen, die Tür ging auf und ich sah einen Raum mit Blut auf dem Boden und lauter Leichen an der Wand, die nicht von Menschen sind, sondern von Ponys(?), Wo ihre Schönheitsflecken reiß geschnitten wurden, mit einem Messer oder so und mit blieb der Atem stocken aber dann fande ich eine Regenbogen Artige, Mähne auf dem Boden, was ein Rest sein müsste und ich fing an zu heulen, da es bestimmt Rainbow Dash gehören müsste, so lange ich Weine, hab ich nicht gemerkt, das die Tür hinter mir zu gefallen ist und somit gefangen war .....', 'Creepy Pastas mit Kiara teil 1')
}
   
function cmd_emojiliste(msg, args){
    const emojiList = msg.guild.emojis.map(e=>e.toString()).join(" ");
    msg.channel.send(emojiList);
}

function cmd_botinfo(msg, args){
    msg.channel.send({embed: {
        color: 3447003,
        author: {
          name: `Infos über den: ${client.user.username}`,
          icon_url: client.user.avatarURL
          
        },
        fields: [{
            name: `Du willst infos zum bot wissen? ${msg.author.username} Hier hast du`,
            value: "Dieser Bot wurde Programmiert von Lulu0508 LA ihr könnt auch gernen seinem [Server](https://discord.gg/qQQEggA) joinen :-)"
          }
        ],
        timestamp: new Date(),
        footer: {
          icon_url: `${msg.author.avatarURL}`,
          text: `An: ${msg.author.username}`
        }
      }
    });
}
    
function cmd_help(msg, args){

    Embeds.grün(msg.channel, `#help
#botinfo
#say[Und die nachricht die der bot sagen soll]
#botinvite
#alter[und dann das alter also wie alt man ist]
#CreepyPastaKiara
#emojiliste
#serverliste
#help
#binlulu[teste ob du der echte lulu bist!]
#binsharox[teste ob du der echte sharox bist!]
#binkiara[teste ob du die echte kiara bist!]
#ask
#luluarmy
#serverinfo
#userinfo
#hund`, 'Commands Allgemein')
Embeds.lila(msg.channel, `#justine
#sharox`, `Commands für Freunde`)
Embeds.rot(msg.channel, `#game`, `Commands nur für den [Lulu Server](https://discord.gg/qQQEggA)`)
Embeds.grün(msg.channel, `#kick`, `Commands für admins`)
let infoembed = new Discord.RichEmbed()
.setTitle("Info")
.addField(`Dieser Bot wurde Programmiert von ${client.users.get("")}`)
}
function cmd_justine(msg, args){

    Embeds.lila(msg.channel, 'Justine wurde am 21.4.2018 Moderator und das war auch der Tag an die LuluArmy ein Richtig nettes neues Teammitglied hatte. Randinfo:Justine spielt fortnite splatoon und mehr von Nintendo', 'Justine')
}

function cmd_game(msg, args){
         Embeds.rot(msg.channel, `#zelda
#mario
#fortnite`, "Du willst rollen zu deinen Lieblingsgames dann benutze folgende commands:")
}
function cmd_fortnite(msg, args){
    msg.member.addRole('442043949994082304')
    msg.channel.send("Rolle `Fortnite` erhalten")
    
}
function cmd_zelda(msg, args){
    msg.member.addRole('441976815570124810')
    msg.channel.send("Rolle `Zelda BotW` erhalten")
    
}
function cmd_mario(msg, args){
     
    msg.member.addRole('441976616399405067'),
    msg.channel.send("Rolle `MarioOdyssey` erhalten")
 
}
function cmd_react(msg,args){
    let args0 = args[0];
    const emoji = client.emojis.get("😃");
    if(args0 == "luluarmy"){
        msg.react(config.kirby)
    }else
    if(args0 == "damm"){
        msg.react("🇫")
        .then(()=> msg.react("🇮"))
        .then(()=> msg.react("🇨"))
        .then(()=> msg.react("🇰"))
        .then(()=> msg.react("🇧"))
        .then(()=> msg.react("🇦"))
        .then(()=> msg.react("🇷"))
    }
    else if(args0 == undefined)
    Promise.all([
        msg.channel.send(`Es gibt bis jetzt
#react luluarmy
#react damm`)
        ])
            .catch(() => console.error('One of the emojis failed to react.'));
    }
function cmd_botinvite(msg, args){

            Embeds.grün(msg.channel, 'https://discordapp.com/api/oauth2/authorize?client_id=424629228642893824&permissions=8&scope=bot', '**Falls ihr den Bot auch haben wollt nutzt diesen link ;-)**')
        }


client.on('message', (msg) =>{

    var cont    = msg.content,
        author  = msg.member,
        chan    = msg.channel,
        guild   = msg.guild
        message = msg

        if(cont.startsWith(config.prefix) && author.id != client.user.id) {
        //#author.id != client.user.id && 
        var invoke = cont.split(' ')[0].substr(config.prefix.length)
            args   = cont.split(' ').slice(1)

            if(invoke in cmdmap){
                cmdmap[invoke](msg, args)
            }
        }
})

client.on("message", async (message) => {
    if(message.content.startsWith("<@424629228642893824>") || message.content.startsWith("<@!424629228642893824>")) {
        let includeembed = new Discord.RichEmbed()
        .setTitle("LuluBot")
        .addField("Voller Name", `${client.user.username}#${client.user.discriminator}`)
        .addField("BotOwner", `${client.users.get("373857433380061184").username}#${client.users.get("373857433380061184").discriminator}`)
        .setColor("#76dd4d")
        .setThumbnail(client.user.avatarURL)
        .addField("Ich wurde erstellt am", client.user.createdAt)
        .addField("Für hilfe", "#help")
        .addField("Viel Spaß", "Mit dem LuluBot")
        .setTimestamp()
        .setFooter("LuluBot", client.user.avatarURL)
    let TheRealMessage = await message.channel.send(includeembed)
    TheRealMessage.react("🇱")
    .then(()=> TheRealMessage.react("🇺"))
    .then(()=> TheRealMessage.react("462962743717265408"))
    .then(()=> TheRealMessage.react("462963918558724097"))
    .then(()=> TheRealMessage.react("🇧"))
    .then(()=> TheRealMessage.react("🇴"))
    .then(()=> TheRealMessage.react("🇹"))

    }
   
});
  const PRES = {
    "435496705962672154": "[Owner]",
    "437535272524316672": "[Co-Owner]",
    "423853967773007872": "[Bot]",
    "": "",
}
client.on("channelCreate", async channel => {

    let createEmbed = new Discord.RichEmbed()
    .setDescription("Channel erstellt")
    .setColor("#40ef37")
    .addField("Channel", `${channel}`)
    .addField("Erstellt am", channel.createdAt)
    .setTimestamp(new Date())
  
    let sChannel = channel.guild.channels.get(`name`, "bot-log")
    sChannel.send(`${channel} wurde erstellt.`, createEmbed)
  })
client.on("channelDelete", async channel => {

    let deleteEmbed = new Discord.RichEmbed()
    .setDescription("Channel gelöscht")
    .setColor("#f2250e")
    .addField("Channel", `${channel.name}`)
    .setTimestamp(new Date())
  
    let sChannel = channel.guild.channels.get("449990525441933322")
    sChannel.send(`${channel.name} wurde gelöscht`, createEmbed)
  })
client.on("roleCreate", async role =>{
    let roleCreateEmbed = new Discord.RichEmbed()
    .setDescription("Rolle erstellt!")
    .setColor("#e8d90b")
    .addField("Rollen Name", role.name)
    .addField("Rolle Erstellt am", role.createdAt)
    .setTimestamp(new Date())
    let sChannel = role.guild.channels.get(`name`, `bot-log`)
    sChannel.send(`${role} wurde erstellt`, roleCreateEmbed)
  })
client.on("roleDelete", async role =>{
    let roleCreateEmbed = new Discord.RichEmbed()
    .setDescription("Rolle gelöscht!!")
    .setColor("#f2250e")
    .addField("Rollen Name", role.name)
    .setTimestamp(new Date())
    let sChannel = role.guild.channels.find(`name`, `bot-log`)
    sChannel.send(`${role.name} wurde gelöscht`, roleCreateEmbed)
  })
client.on('guildMemberUpdate', (mold, mnew) => {
    var guild = mnew.guild
    if (mold.roles.array().length < mnew.roles.array().length) {
        var role = mnew.roles.find(r => mold.roles.find(rold => rold.id == r.id) == null)
        if (role.id in PRES) {
            mnew.setNickname(`${PRES[role.id]} ${mnew.displayName}`)
        }
    }
    else if (mold.roles.array().length > mnew.roles.array().length) {
        var role = mold.roles.find(r => mnew.roles.find(rold => rold.id == r.id) == null)
        if (role.id in PRES) {
            mnew.setNickname(mnew.displayName.substr(PRES[role.id].length + 1))
        }
    }
})
client.on('guildMemberAdd', (member)=>{
    let lchannel = member.guild.channels.get("435485995723390976")
    if(!lchannel) return
    let welcomeEmbed = new Discord.RichEmbed()
    .setTitle("Willkommen Neuer Member")
    .addField("Name + Tag", `${member.user.username}#${member.user.discriminator}`)
    .addField("Gejoint um", new Date())
    .addField("Nachricht", `Viel Spaß auf meinem Server ;) <@${member.user.id}>`)
    .setThumbnail(member.user.avatarURL)
    .setColor("#59f442")
    lchannel.send(welcomeEmbed)
})
client.on('guildMemberRemove', (member)=>{
    let lchannel = member.guild.channels.get("437586646452666378")
    if(!lchannel) return
    let deleteEmbed = new Discord.RichEmbed()
    .setTitle("Ein Member hat uns Verlassen")
    .addField("Name + Tag", `${member.user.username}#${member.user.discriminator}`)
    .addField("Geleavet um", new Date())
    .addField("Nachricht", `${member.user.username} hat uns verlassen... Kannst da bleiben wo der Pfeffer Wächst...`)
    .setThumbnail(member.user.avatarURL)
    .setColor("#f40602")
    lchannel.send(deleteEmbed)
})



const pres = {
    "435496705962672154": "[Owner]",
    "437535272524316672": "[Co-Owner]",
    "423853967773007872": "[Bot]",
    "": "",
}

//459077271756472321
client.on('guildMemberUpdate', (mold, mnew) => {
    var guild = mnew.guild
    if (mold.roles.array().length < mnew.roles.array().length) {
        var role = mnew.roles.find(r => mold.roles.find(r2 => r2.id == r.id) == null)
        if (role.id in pres)
            mnew.setNickname(`${pres[role.id]} ${mnew.displayName}`)
    }
    else if (mold.roles.array().length > mnew.roles.array().length) {
        var role = mold.roles.find(r => mnew.roles.find(r2 => r2.id == r.id) == null)
        if (role.id in pres)
            mnew.setNickname(mnew.displayName.substr(pres[role.id].length + 1))
    }
})

//coins

client.on('voiceStateUpdate', (mold, mnew) => {
    let guild = mnew.guild
          
      let vold = mold.voiceChannel
      let vnew = mnew.voiceChannel
      let logchan = guild.channels.get("449990525441933322")
      let logchan2 = guild.channels.get("456883368710242304")
      
      if (!vold && vnew) {
          let joinEmbed = new Discord.RichEmbed()
              .setDescription(`:white_check_mark: **${mnew.displayName}** ist **\`${vnew.name}\`** Beigetreten`)
              .setTimestamp()
              .setColor('#5aed21')
              .setThumbnail(mnew.user.avatarURL)
              .setFooter(`Beauftragt von ${client.users.get("373857433380061184").username}`, client.users.get('410786268616720395').avatarURL)
                if(mnew.guild.id === "415889442222505985"){ 
                logchan.send(joinEmbed)   
                }else
                if(mnew.guild.id === "403539604118175744")
                {                 
                logchan2.send(joinEmbed) 
                }      
      }
      else if (vold && !vnew) {
          let leftEmbed = new Discord.RichEmbed()
              .setTitle('')                  
              .setDescription(`:small_red_triangle_down: **${mnew.displayName}** Hat **\`${vold.name}\`** verlassen`)
              .setTimestamp()
              .setThumbnail(mnew.user.avatarURL)
              .setColor("#e50b16")
              .setFooter(`Beauftragt von ${client.users.get("373857433380061184").username}`, client.users.get('373857433380061184').avatarURL)
              
              if(mnew.guild.id === "415889442222505985"){ 
                logchan.send(leftEmbed)   
                }else
                if(mnew.guild.id === "403539604118175744")
                {                 
                logchan2.send(leftEmbed) 
                } 
           
      }
      else if (vold && vnew && vold.id != vnew.id) {
          let wentEmbed = new Discord.RichEmbed()
              .setTitle('')
              .setDescription(`:arrow_right: **${mnew.displayName}** ist von **\`${vold.name}\`** zu **\`${vnew.name}\`** gesprungen`)
              .setTimestamp()
              .setThumbnail(mnew.user.avatarURL)
              .setColor("#0be5d2")
              .setFooter(`Beauftragt von ${client.users.get("373857433380061184").username}`, client.users.get('373857433380061184').avatarURL)
              if(mnew.guild.id === "415889442222505985"){ 
                logchan.send(wentEmbed)   
                }else
                if(mnew.guild.id === "403539604118175744")
                {                 
                logchan2.send(wentEmbed) 
                } 
                
         
      }
    }) 

client.login(config.token)