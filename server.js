require("express")().listen(1343);

const db = require("quick.db");
const discord = require("discord.js");
const client = new discord.Client({ disableEveryone: true });
client.login("NzM3MzM5NzYzNjk0MTA4NzUz.Xx77Kg.yyJ6_zRPoEsWVHPRLGJNsfAwANo");
const fetch = require("node-fetch");
const fs = require('fs')

// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// https://expressjs.com/en/starter/basic-routing.html

const Discord = require("discord.js");
const client = new Discord.Client();
const request = require("request");
const db = require("quick.db");
const fs = require("fs");
const url = require("url");
const path = require("path");

client.on('ready', () => {
  console.log(`Site hazır ve acılan hesap : ${client.user.tag}!`);
});
  app.use(
    "/css",
    express.static(path.resolve(__dirname + `/css`))
  );

  const templateDir = path.resolve(__dirname + `/`); // SITE DOSYA KONTROL

  app.locals.domain = process.env.PROJECT_DOMAIN;
const router = express.Router();
  // SITE DOSYASI AKTIF
 var Ddos = require('ddos')
    var ddos = new Ddos({burst:3,limit:4,maxcount:15,maxexpiry:120,checkinterval:1,testmode:false,responseStatus:429,errormessage:'atmalan ddos'});
    app.use(ddos.express);
  app.engine("html", require("ejs").renderFile);
  app.set("view engine", "html");

  var bodyParser = require("body-parser");
  app.use(bodyParser.json());

  const renderTemplate = (res, req, template, data = {}) => {
    const baseData = {
      bot:client,
      path: req.path
    };
    res.render(
      path.resolve(`${templateDir}${path.sep}${template}`),
      Object.assign(baseData, data)
    );
  };
app.use('/', router);
app.use('/status', router);
  app.get("/", (req, res) => {
    renderTemplate(res, req, "index.ejs");
  });
  app.get("/status", (req, res) => {
    renderTemplate(res, req, "status.ejs");
  });
  app.get("/", (req, res) => {
 var Ddos = require('ddos')
    var ddos = new Ddos({burst:3,limit:4,maxcount:15,maxexpiry:120,checkinterval:1,testmode:false,responseStatus:429,errormessage:'atmalan ddos'});
    app.use(ddos.express);
  });


  app.get("/status", (req, res) => {
 var Ddos = require('ddos')
    var ddos = new Ddos({burst:3,limit:4,maxcount:15,maxexpiry:120,checkinterval:1,testmode:false,responseStatus:429,errormessage:'atmalan ddos'});
    app.use(ddos.express);

  });

client.login("NzM0NDk3OTg5OTA0ODI2NDQw.XxSkqw.RnNv1r5FOb8kqyW8wwKemKNbFes");
const listener = app.listen(process.env.PORT, () => {
  console.log("Panel şu portla başlatıldı:" + listener.address().port);
});

setInterval(() => {
  var links = db.get("linkler");
  if(!links) return;
  var linkA = links.map(c => c.url)
  linkA.forEach(link => {
    try {
      fetch(link)
    } catch(e) { console.log("" + e) };
  })
  console.log("Pong! Requests sent")
}, 60000)

client.on("ready", () => {
if(!Array.isArray(db.get("linkler"))) {
db.set("linkler", [])
}
})

client.on("ready", () => {
  client.user.setActivity(`Site kodlanıyor by cenap / uptime system by mertbhey`)
  console.log(`Logined`)
})

/*client.on("message", message => {
  if(message.author.bot) return;
  var spl = message.content.split(" ");
  if(spl[0] == "u.add") {
  var link = spl[1]
  fetch(link).then(() => {
    if(db.get("linkler").map(z => z.url).includes(link)) return message.channel.send("<:asuna_no:732219380795965471> Already Available!")
    message.channel.send("<:asuna_yes:732219381085503529> Successful!");
    db.push("linkler", { url: link, owner: message.author.id})
  }).catch(e => {
    return message.channel.send("<:asuna_no:732219380795965471> " + e)
  })
  }
})


client.on("message", message => {
  if(message.author.bot) return;
  var spl = message.content.split(" ");
  if(spl[0] == "u.say") {
  var link = spl[1]
 message.channel.send(`${db.get("linkler").length} / ${client.guilds.size}`)
}})


*/
const Discord = require('discord.js');

/*client.on("message", message => {
  if(message.author.bot) return;
    var spl = message.content.split(" ");
  if(spl[0] == "u.help") {
let embed = new Discord.RichEmbed()
.setColor('#4ca74c')
.addField(`Uptime Bot v1.0 Help`, `Includes a system that keeps uptime bot glitch sites open 24/7. The links in the system operate 24/7 without any maintenance.`)
.addField(`General Commands`,`

\`u.help\` - Displays the help menu.
\`u.add\` - Adds the link you specified to the system.
\`u.say\` - It shows the number of links in the system.
`)
.addField(`Links`, `[OnlyCode](https://discord.gg/qVzp2cm)
[Add to Server](https://discord.com/oauth2/authorize?client_id=727978641702649966&scope=bot&permissions=8)
[Support Server](https://discord.gg/axczJaR)`)
.setThumbnail(client.user.avatarURL)
.setAuthor(`Uptime`, client.user.avatarURL)
.setFooter(`2020 © Uptime | Coded by MertBhey, Edited by Alfonzo.`, client.user.avatarURL)
return message.channel.send(embed);
    }
 *
})*/


/*client.on("message", message => {
  if(message.author.bot) return;
    var spl = message.content.split(" ");
  if(spl[0] == "u.help") {
message.channel.send(`**Uptime Bot Commands v1.0**

\`u.help\` - Displays the help menu.
\`u.add\` - Adds the link you specified to the system.
\`u.say\` - It shows the number of links in the system.

2020 © Uptime | Coded by MertBhey, Edited by Alfonzo.
`)
  }
 
})*/

/*client.on("message", async message => {

  if(!message.content.startsWith("u.eval")) return;
  if(!["689169122604744833","689169122604744833"].includes(message.author.id)) return;
  var args = message.content.split("u.eval")[1]
  if(!args) return message.channel.send("<:asuna_no:732219380795965471> ..")
  
      const code = args
    
    
      function clean(text) {
          if (typeof text !== 'string')
              text = require('util').inspect(text, { depth: 3 })
          text = text
              .replace(/`/g, '`' + String.fromCharCode(8203))
              .replace(/@/g, '@' + String.fromCharCode(8203))
          return text;
      };
  
      var evalEmbed = ""
      try {
          var evaled = await clean(await eval(await code));
          if (evaled.constructor.name === 'Promise') evalEmbed = `\`\`\`\n${evaled}\n\`\`\``
          else evalEmbed = `\`\`\`js\n${evaled}\n\`\`\``
          
  if(evaled.length < 1900) { 
     message.channel.send(`\`\`\`js\n${evaled}\`\`\``);
  } else {
    var hast = await require("hastebin-gen")(evaled, { url: "https://hasteb.in" } )
  message.channel.send(hast)
  }
      } catch (err) {
          message.channel.send(`\`\`\`js\n${err}\n\`\`\``);
      }
  })
  */
  const log = message => {
  console.log(`${message}`);
}
  
  